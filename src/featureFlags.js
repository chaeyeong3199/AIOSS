const FEATURE_DEFINITIONS = {
  doraDashboard: {
    description: "DORA Dashboard 링크 노출 여부",
    envKey: "FEATURE_DORA_DASHBOARD",
    targetUsersEnvKey: "FEATURE_DORA_USERS",
    defaultValue: false,
  },
  betaStatusApi: {
    description: "Beta Status API 카드 노출 여부",
    envKey: "FEATURE_BETA_STATUS_API",
    targetUsersEnvKey: "FEATURE_BETA_USERS",
    defaultValue: false,
  },
  canaryBanner: {
    description: "Canary Rollout 안내 배너 노출 여부",
    envKey: "FEATURE_CANARY_BANNER",
    targetUsersEnvKey: "FEATURE_CANARY_USERS",
    defaultValue: false,
  },
};

function parseBoolean(value, defaultValue = false) {
  if (value == null || value === "") return defaultValue;

  const normalized = String(value).trim().toLowerCase();

  if (["true", "1", "yes", "on", "enabled"].includes(normalized)) {
    return true;
  }

  if (["false", "0", "no", "off", "disabled"].includes(normalized)) {
    return false;
  }

  return defaultValue;
}

function parseTargetUsers(value) {
  if (!value) return [];

  return String(value)
    .split(",")
    .map((user) => user.trim())
    .filter(Boolean);
}

function getUserId(req) {
  const headerUser =
    req?.headers?.["x-user-id"] ||
    req?.headers?.["X-User-Id"] ||
    req?.headers?.["x-user"];

  if (headerUser) return String(headerUser);

  if (req?.query?.userId) {
    return String(req.query.userId);
  }

  if (req?.url) {
    const url = new URL(req.url, "http://localhost");
    const userId = url.searchParams.get("userId");
    if (userId) return userId;
  }

  return "anonymous";
}

function isFeatureEnabled(flagName, userId = "anonymous", env = process.env) {
  const flag = FEATURE_DEFINITIONS[flagName];

  if (!flag) {
    return false;
  }

  const targetUsers = parseTargetUsers(env[flag.targetUsersEnvKey]);

  if (targetUsers.includes(userId)) {
    return true;
  }

  return parseBoolean(env[flag.envKey], flag.defaultValue);
}

function getAllFlags(userId = "anonymous", env = process.env) {
  return Object.keys(FEATURE_DEFINITIONS).reduce((result, flagName) => {
    result[flagName] = {
      enabled: isFeatureEnabled(flagName, userId, env),
      description: FEATURE_DEFINITIONS[flagName].description,
    };

    return result;
  }, {});
}

module.exports = {
  FEATURE_DEFINITIONS,
  parseBoolean,
  parseTargetUsers,
  getUserId,
  isFeatureEnabled,
  getAllFlags,
};