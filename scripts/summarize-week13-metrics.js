const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "..", "assignments", "L13");
const dataPath = path.join(baseDir, "data", "metrics-summary.json");
const reportDir = path.join(baseDir, "reports");
const reportPath = path.join(reportDir, "week13-summary.md");

fs.mkdirSync(reportDir, { recursive: true });

const summary = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const { A, B } = summary.metrics;

const markdown = `# Week 13 Lean Startup Experiment Summary

## 실험 개요

- Experiment Name: \`${summary.experimentName}\`
- 운영 기간: ${summary.period.start} ~ ${summary.period.end}
- 운영 일수: ${summary.period.days}일
- 실험 방식: Feature Flag 기반 A/B 테스트
- Variant A: 기존 메인 문구
- Variant B: 실험 목적이 더 명확한 개선 문구

## 핵심 지표

| Variant | Exposures | CTA Clicks | Click Rate | Task Completes | Completion Rate | Avg Feedback Score |
|---|---:|---:|---:|---:|---:|---:|
| A | ${A.exposures} | ${A.ctaClicks} | ${(A.clickRate * 100).toFixed(2)}% | ${A.taskCompletes} | ${(A.completionRate * 100).toFixed(2)}% | ${A.averageScore} |
| B | ${B.exposures} | ${B.ctaClicks} | ${(B.clickRate * 100).toFixed(2)}% | ${B.taskCompletes} | ${(B.completionRate * 100).toFixed(2)}% | ${B.averageScore} |

## 결정

최종 결정: **${summary.decision.toUpperCase()}**

${
  summary.decision === "persevere"
    ? "Variant B가 CTA 클릭률, 과업 완료율, 평균 피드백 점수에서 Variant A보다 우수하므로 현재 방향을 유지한다."
    : "Variant B의 개선 효과가 충분하지 않으므로 문구, CTA 위치, 실험 조건을 수정해 재실험한다."
}

---

※ 본 리포트는 Week 13 Lean Startup 실험 운영 과제의 지표 요약 자료입니다.
`;

fs.writeFileSync(reportPath, markdown);
console.log(`Report generated: ${reportPath}`);