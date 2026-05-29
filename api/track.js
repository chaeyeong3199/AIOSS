const { getUserId } = require("../src/featureFlags");
const { trackEvent } = require("../src/experiments");

function readBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === "object") {
      resolve(req.body);
      return;
    }

    if (req.body && typeof req.body === "string") {
      try {
        resolve(JSON.parse(req.body));
      } catch {
        resolve({});
      }
      return;
    }

    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      error: "Method Not Allowed",
      allowed: "POST",
    });
    return;
  }

  const body = await readBody(req);
  const userId = body.userId || getUserId(req);

  const event = trackEvent({
    userId,
    eventName: body.eventName || "unknown_event",
    experimentName: body.experimentName || "unknown_experiment",
    variant: body.variant || "unknown_variant",
    metadata: body.metadata || {},
  });

  res.status(200).json({
    tracked: true,
    event,
  });
};