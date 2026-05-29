module.exports = (req, res) => {
  res.status(200).json({
    message: "Hello, AIOSS Week 10!",
    status: "ok",
    deployment: "vercel-serverless"
  });
};