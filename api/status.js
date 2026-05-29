const { hello } = require("../src/index");

module.exports = (req, res) => {
  res.status(200).json({
    message: hello("AIOSS Week 10"),
    status: "ok",
    deployment: "vercel-serverless"
  });
};