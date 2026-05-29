module.exports = (req, res) => {
  if (process.env.SIMULATE_HEALTH_FAIL === "true") {
    res.status(500).json({
      status: "unhealthy",
      service: "aioss-week11",
      platform: "vercel-serverless",
      reason: "SIMULATE_HEALTH_FAIL is true",
    });
    return;
  }

  res.status(200).json({
    status: "healthy",
    service: "aioss-week11",
    platform: "vercel-serverless",
  });
};