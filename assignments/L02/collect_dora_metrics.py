#!/usr/bin/env python3
"""Collect DORA metrics from the GitHub API and write dashboard-ready JSON files."""

from __future__ import annotations

import datetime as dt
import json
import os
import statistics
import sys
import urllib.parse
import urllib.request
from dataclasses import dataclass
from typing import Dict, Iterable, List, Optional, Tuple


UTC = dt.timezone.utc


def to_iso(ts: dt.datetime) -> str:
    return ts.astimezone(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def from_iso(text: str) -> dt.datetime:
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"
    return dt.datetime.fromisoformat(text).astimezone(UTC)


@dataclass
class Config:
    owner: str
    repo: str
    token: str
    lookback_days: int = 30
    deployment_env_keywords: Tuple[str, ...] = ("prod", "production", "live")
    incident_labels: Tuple[str, ...] = ("incident", "outage", "sev", "bug")


class GitHubClient:
    def __init__(self, owner: str, repo: str, token: str) -> None:
        self.owner = owner
        self.repo = repo
        self.token = token
        self.base = f"https://api.github.com/repos/{owner}/{repo}"

    def _request(self, url: str) -> Tuple[object, Dict[str, str]]:
        req = urllib.request.Request(url)
        req.add_header("Accept", "application/vnd.github+json")
        req.add_header("Authorization", f"Bearer {self.token}")
        req.add_header("X-GitHub-Api-Version", "2022-11-28")
        with urllib.request.urlopen(req) as res:
            body = res.read().decode("utf-8")
            links = dict(res.headers.items())
            return json.loads(body), links

    def _iter_pages(self, path: str, params: Dict[str, str]) -> Iterable[object]:
        q = urllib.parse.urlencode(params)
        url = f"{self.base}{path}?{q}"

        while url:
            payload, headers = self._request(url)
            if isinstance(payload, list):
                for item in payload:
                    yield item
            else:
                yield payload
            link = headers.get("Link", "")
            next_url = ""
            for part in link.split(","):
                part = part.strip()
                if 'rel="next"' in part:
                    next_url = part[part.find("<") + 1 : part.find(">")]
                    break
            url = next_url

    def list_merged_prs(self, since: dt.datetime) -> List[dict]:
        prs: List[dict] = []
        for item in self._iter_pages(
            "/pulls", {"state": "closed", "sort": "updated", "direction": "desc", "per_page": "100"}
        ):
            if not isinstance(item, dict):
                continue
            merged_at = item.get("merged_at")
            if not merged_at:
                continue
            merged_dt = from_iso(merged_at)
            if merged_dt < since:
                break
            prs.append(item)
        return prs

    def list_pr_commits(self, pr_number: int) -> List[dict]:
        commits: List[dict] = []
        for item in self._iter_pages(f"/pulls/{pr_number}/commits", {"per_page": "100"}):
            if isinstance(item, dict):
                commits.append(item)
        return commits

    def list_deployments(self, since: dt.datetime) -> List[dict]:
        out: List[dict] = []
        for item in self._iter_pages("/deployments", {"per_page": "100"}):
            if not isinstance(item, dict):
                continue
            created = item.get("created_at")
            if not created:
                continue
            created_dt = from_iso(created)
            if created_dt < since:
                break
            out.append(item)
        return out

    def list_deployment_statuses(self, dep_id: int) -> List[dict]:
        out: List[dict] = []
        for item in self._iter_pages(f"/deployments/{dep_id}/statuses", {"per_page": "100"}):
            if isinstance(item, dict):
                out.append(item)
        return out

    def list_incident_issues(self, since: dt.datetime, label_keywords: Tuple[str, ...]) -> List[dict]:
        issues: List[dict] = []
        for item in self._iter_pages("/issues", {"state": "all", "since": to_iso(since), "per_page": "100"}):
            if not isinstance(item, dict):
                continue
            if item.get("pull_request"):
                continue
            labels = [lbl.get("name", "").lower() for lbl in item.get("labels", []) if isinstance(lbl, dict)]
            if not any(any(k in name for k in label_keywords) for name in labels):
                continue
            issues.append(item)
        return issues


def select_first_commit_time(commits: List[dict]) -> Optional[dt.datetime]:
    candidates: List[dt.datetime] = []
    for commit in commits:
        commit_data = commit.get("commit", {})
        author = commit_data.get("author", {})
        date_text = author.get("date")
        if date_text:
            candidates.append(from_iso(date_text))
    if not candidates:
        return None
    return min(candidates)


def classify_deployments(client: GitHubClient, deployments: List[dict], env_keywords: Tuple[str, ...]) -> List[dict]:
    result: List[dict] = []
    for dep in deployments:
        env_name = (dep.get("environment") or "").lower()
        if env_name and not any(k in env_name for k in env_keywords):
            continue

        dep_id = dep.get("id")
        statuses = client.list_deployment_statuses(dep_id)
        if not statuses:
            continue

        latest = max(statuses, key=lambda s: s.get("created_at", ""))
        state = latest.get("state", "").lower()
        state_time = latest.get("created_at")
        if not state_time:
            continue

        result.append(
            {
                "id": dep_id,
                "sha": dep.get("sha"),
                "environment": dep.get("environment"),
                "created_at": dep.get("created_at"),
                "status_state": state,
                "status_at": state_time,
                "is_success": state in {"success", "inactive"},
                "is_failure": state in {"error", "failure"},
            }
        )
    return result


def calc_metrics(client: GitHubClient, cfg: Config) -> dict:
    now = dt.datetime.now(tz=UTC)
    since = now - dt.timedelta(days=cfg.lookback_days)

    merged_prs = client.list_merged_prs(since)
    lead_times_hours: List[float] = []
    pr_events: List[dict] = []

    for pr in merged_prs:
        number = pr["number"]
        commits = client.list_pr_commits(number)
        first_commit_at = select_first_commit_time(commits)
        merged_at = from_iso(pr["merged_at"])

        if first_commit_at:
            lead_hours = (merged_at - first_commit_at).total_seconds() / 3600
            if lead_hours >= 0:
                lead_times_hours.append(lead_hours)

        pr_events.append(
            {
                "number": number,
                "title": pr.get("title", ""),
                "merged_at": to_iso(merged_at),
                "first_commit_at": to_iso(first_commit_at) if first_commit_at else None,
            }
        )

    deployments_raw = client.list_deployments(since)
    deployments = classify_deployments(client, deployments_raw, cfg.deployment_env_keywords)

    successful_deploys = [d for d in deployments if d["is_success"]]
    failed_deploys = [d for d in deployments if d["is_failure"]]

    # Deployment frequency per day based on successful production deployments.
    deployment_frequency = len(successful_deploys) / cfg.lookback_days if cfg.lookback_days else 0.0

    # Change failure rate based on failed deployment statuses.
    total_ended = len(successful_deploys) + len(failed_deploys)
    change_failure_rate = (len(failed_deploys) / total_ended * 100.0) if total_ended else 0.0

    incidents = client.list_incident_issues(since, cfg.incident_labels)
    mttr_hours_candidates: List[float] = []
    incident_events: List[dict] = []

    for issue in incidents:
        created = issue.get("created_at")
        closed = issue.get("closed_at")
        if not created:
            continue
        created_at = from_iso(created)
        if closed:
            closed_at = from_iso(closed)
            delta_h = (closed_at - created_at).total_seconds() / 3600
            if delta_h >= 0:
                mttr_hours_candidates.append(delta_h)
        incident_events.append(
            {
                "number": issue.get("number"),
                "title": issue.get("title", ""),
                "state": issue.get("state", "open"),
                "created_at": to_iso(created_at),
                "closed_at": closed,
            }
        )

    mttr_hours = statistics.mean(mttr_hours_candidates) if mttr_hours_candidates else None
    lead_time_hours = statistics.mean(lead_times_hours) if lead_times_hours else None

    metrics = {
        "window": {"since": to_iso(since), "until": to_iso(now), "days": cfg.lookback_days},
        "summary": {
            "lead_time_hours": round(lead_time_hours, 2) if lead_time_hours is not None else None,
            "deployment_frequency_per_day": round(deployment_frequency, 4),
            "mttr_hours": round(mttr_hours, 2) if mttr_hours is not None else None,
            "change_failure_rate_percent": round(change_failure_rate, 2),
        },
        "counts": {
            "merged_prs": len(merged_prs),
            "deployments_success": len(successful_deploys),
            "deployments_failure": len(failed_deploys),
            "incidents": len(incidents),
        },
        "events": {
            "merged_prs": pr_events[:50],
            "deployments": deployments[:50],
            "incidents": incident_events[:50],
        },
        "meta": {
            "repo": f"{cfg.owner}/{cfg.repo}",
            "generated_at": to_iso(now),
            "notes": [
                "Lead Time is approximated as first commit in merged PR to merge time.",
                "Deployment Frequency and Change Failure Rate are computed from deployment statuses in production-like environments.",
                "MTTR is based on incident-labeled issues from creation to closure.",
            ],
        },
    }
    return metrics


def upsert_history(history_path: str, latest: dict, max_points: int = 180) -> List[dict]:
    entry = {
        "date": latest["meta"]["generated_at"][:10],
        **latest["summary"],
    }

    if os.path.exists(history_path):
        with open(history_path, "r", encoding="utf-8") as f:
            history = json.load(f)
            if not isinstance(history, list):
                history = []
    else:
        history = []

    history = [h for h in history if h.get("date") != entry["date"]]
    history.append(entry)
    history.sort(key=lambda x: x.get("date", ""))
    if len(history) > max_points:
        history = history[-max_points:]
    return history


def ensure_repo_from_env() -> Tuple[str, str]:
    repo = os.environ.get("REPO") or os.environ.get("GITHUB_REPOSITORY", "")
    if not repo or "/" not in repo:
        raise ValueError("REPO or GITHUB_REPOSITORY must be set as owner/repo")
    owner, name = repo.split("/", 1)
    return owner, name


def main() -> int:
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("GITHUB_TOKEN is required", file=sys.stderr)
        return 2

    owner, repo = ensure_repo_from_env()
    lookback_days = int(os.environ.get("LOOKBACK_DAYS", "30"))

    cfg = Config(owner=owner, repo=repo, token=token, lookback_days=lookback_days)
    client = GitHubClient(owner, repo, token)
    latest = calc_metrics(client, cfg)

    metrics_dir = os.path.join("docs", "metrics")
    os.makedirs(metrics_dir, exist_ok=True)

    latest_path = os.path.join(metrics_dir, "latest.json")
    history_path = os.path.join(metrics_dir, "history.json")

    with open(latest_path, "w", encoding="utf-8") as f:
        json.dump(latest, f, ensure_ascii=False, indent=2)

    history = upsert_history(history_path, latest)
    with open(history_path, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)

    print(f"Wrote {latest_path} and {history_path}")
    print(json.dumps(latest["summary"], ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
