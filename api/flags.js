const { getUserId, getAllFlags } = require("../src/featureFlags");
const { getAssignments } = require("../src/experiments");

module.exports = (req, res) => {
  const userId = getUserId(req);

  res.status(200).json({
    userId,
    flags: getAllFlags(userId),
    experiments: getAssignments(userId),
  });
};