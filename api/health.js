module.exports = (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "aioss-week10",
    platform: "vercel-serverless"
  });
};