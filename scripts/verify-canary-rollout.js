const fs = require("node:fs");
const path = require("node:path");

const { CANARY_STAGES, decideRollout } = require("../src/canary");

const failAt = Number(process.env.SIMULATE_HEALTH_FAIL_AT || 0);
const logLines = [];

let currentPercent = 0;

for (const stage of CANARY_STAGES) {
  const healthStatus = failAt && stage >= failAt ? "unhealthy" : "healthy";

  logLines.push(
    `[canary] stage=${stage}% health=${healthStatus}`
  );

  const decision = decideRollout({
    currentPercent: stage,
    healthStatus,
  });

  if (decision.action === "rollback") {
    logLines.push(
      `[rollback] failed_stage=${stage}% rollback_to=${currentPercent}% reason="${decision.reason}"`
    );
    break;
  }

  currentPercent = stage;

  logLines.push(
    `[promote] current=${stage}% next=${decision.nextPercent}% reason="${decision.reason}"`
  );
}

const outputDir = path.join(process.cwd(), "assignments", "L11");
fs.mkdirSync(outputDir, { recursive: true });

const outputPath = path.join(outputDir, "canary-rollout-log.md");

fs.writeFileSync(
  outputPath,
  ["# Canary Rollout Log", "", "```txt", ...logLines, "```", ""].join("\n"),
  "utf8"
);

console.log(logLines.join("\n"));
console.log(`Saved rollout log to ${outputPath}`);