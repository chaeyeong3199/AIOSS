const { getUserId } = require("../src/featureFlags");
const { isUserInCanary } = require("../src/canary");

module.exports = (req, res) => {
  const userId = getUserId(req);
  const canaryPercent = Number(process.env.CANARY_PERCENT || 0);

  res.status(200).json({
    userId,
    canaryPercent,
    inCanary: isUserInCanary(userId, canaryPercent),
  });
};