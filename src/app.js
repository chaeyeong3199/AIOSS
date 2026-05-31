const express = require("express");
const path = require("path");
const { hello } = require("./index");
const { getAllFlags, getUserId } = require("./featureFlags");
const { getAssignments, trackEvent } = require("./experiments");
const { isUserInCanary } = require("./canary");
const { analyzeDelivery } = require("./aiAdvisor");

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.static(path.join(__dirname, "..", "public")));

  app.get("/health", (req, res) => {
    res.json({ status: "healthy" });
  });

  app.get("/api/health", (req, res) => {
    if (process.env.SIMULATE_HEALTH_FAIL === "true") {
      res.status(500).json({
        status: "unhealthy",
        service: "aioss-week12",
        platform: "express-local",
        reason: "SIMULATE_HEALTH_FAIL is true",
      });
      return;
    }

    res.json({
      status: "healthy",
      service: "aioss-week12",
      platform: "express-local",
    });
  });

  app.get("/api/status", (req, res) => {
    res.json({
      message: hello("AIOSS Week 12"),
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

  app.get("/api/rollout", (req, res) => {
    const userId = getUserId(req);
    const canaryPercent = Number(process.env.CANARY_PERCENT || 0);

    res.json({
      userId,
      canaryPercent,
      inCanary: isUserInCanary(userId, canaryPercent),
    });
  });

  app.post("/api/track", (req, res) => {
    const userId = req.body.userId || getUserId(req);

    const event = trackEvent({
      userId,
      eventName: req.body.eventName || "unknown_event",
      experimentName: req.body.experimentName || "unknown_experiment",
      variant: req.body.variant || "unknown_variant",
      metadata: req.body.metadata || {},
    });

    res.json({
      tracked: true,
      event,
    });
  });

  app.post("/api/ai/advisor", (req, res) => {
    const result = analyzeDelivery(req.body.text || "");

    console.log("[ai-advisor]", JSON.stringify({
      timestamp: new Date().toISOString(),
      score: result.score,
      riskLevel: result.riskLevel,
    }));

    res.json({
      ok: true,
      feature: "AI OSS Delivery Advisor",
      result,
    });
  });

  return app;
}

module.exports = { createApp };