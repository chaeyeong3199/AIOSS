const CANARY_STAGES = [1, 10, 50, 100];

function hashString(input) {
  let hash = 2166136261;

  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function getCanaryBucket(userId = "anonymous") {
  return hashString(`canary:${userId}`) % 100;
}

function isUserInCanary(userId, percent) {
  const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));

  return getCanaryBucket(userId) < safePercent;
}

function getNextCanaryStage(currentPercent) {
  const currentIndex = CANARY_STAGES.indexOf(Number(currentPercent));

  if (currentIndex === -1) {
    return CANARY_STAGES[0];
  }

  return CANARY_STAGES[Math.min(currentIndex + 1, CANARY_STAGES.length - 1)];
}

function decideRollout({ currentPercent, healthStatus }) {
  if (healthStatus !== "healthy") {
    return {
      action: "rollback",
      nextPercent: 0,
      reason: "health check failed",
    };
  }

  return {
    action: "promote",
    nextPercent: getNextCanaryStage(currentPercent),
    reason: "health check passed",
  };
}

module.exports = {
  CANARY_STAGES,
  getCanaryBucket,
  isUserInCanary,
  getNextCanaryStage,
  decideRollout,
};