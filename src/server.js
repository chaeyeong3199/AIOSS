const express = require("express");
const path = require("path");
const { hello } = require("./index");
const { getAllFlags, getUserId } = require("./featureFlags");
const { getAssignments, trackEvent } = require("./experiments");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// public 폴더를 정적 파일로 제공
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "aioss-week11",
    platform: "express-local",
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    message: hello("AIOSS Week 11"),
    status: "ok",
    deployment: "express-local",
  });
});

app.get("/api/flags", (req, res) => {
  const userId = getUserId(req);

  res.json({
    userId,
    flags: getAllFlags(userId),
    experiments: getAssignments(userId),
  });
});

app.post("/api/track", (req, res) => {
  const userId = req.body.userId || getUserId(req);

  const event = trackEvent({
    userId,
    eventName: req.body.eventName,
    experimentName: req.body.experimentName,
    variant: req.body.variant,
    metadata: req.body.metadata,
  });

  res.json({
    tracked: true,
    event,
  });
});

app.listen(port, () => {
  console.log(`AIOSS app listening on port ${port}`);
});