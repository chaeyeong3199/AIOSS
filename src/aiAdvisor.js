const REQUIRED_ITEMS = [
  { key: "readme", label: "README", keywords: ["readme"] },
  { key: "contributing", label: "CONTRIBUTING", keywords: ["contributing"] },
  { key: "codeOfConduct", label: "CODE_OF_CONDUCT", keywords: ["code_of_conduct", "code of conduct"] },
  { key: "license", label: "LICENSE", keywords: ["license", "mit"] },
  { key: "health", label: "Health Check", keywords: ["health", "/api/health"] },
  { key: "test", label: "Test", keywords: ["test", "coverage", "playwright", "pytest"] },
  { key: "security", label: "Security", keywords: ["dependabot", "audit", "snyk", "security", "sbom"] },
  { key: "deploy", label: "Main Deployment", keywords: ["deploy", "vercel", "main", "ghcr"] },
  { key: "rollback", label: "Rollback Plan", keywords: ["rollback", "revert"] },
  { key: "observability", label: "Observability", keywords: ["log", "metric", "dashboard", "dora"] },
  { key: "release", label: "Release Tag", keywords: ["v1.", "release", "tag"] },
  { key: "retrospective", label: "Retrospective", keywords: ["retrospective", "회고"] },
  { key: "demo", label: "Demo Video", keywords: ["demo", "video", "영상"] },
];

function includesAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function analyzeDelivery(text = "") {
  const normalized = String(text).toLowerCase();

  const completed = REQUIRED_ITEMS.filter((item) =>
    includesAny(normalized, item.keywords)
  );

  const missing = REQUIRED_ITEMS.filter((item) =>
    !includesAny(normalized, item.keywords)
  );

  const score = Math.round((completed.length / REQUIRED_ITEMS.length) * 100);

  let riskLevel = "low";
  if (score < 50) riskLevel = "high";
  else if (score < 80) riskLevel = "medium";

  const recommendations = missing.slice(0, 5).map((item) =>
    `${item.label} 항목을 README 또는 제출 문서에 명확히 추가하세요.`
  );

  return {
    score,
    riskLevel,
    completed: completed.map((item) => item.label),
    missing: missing.map((item) => item.label),
    recommendations,
  };
}

module.exports = {
  REQUIRED_ITEMS,
  analyzeDelivery,
};