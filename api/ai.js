const { analyzeDelivery } = require("../src/aiAdvisor");

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
    });
    return;
  }

  const body = await readBody(req);
  const result = analyzeDelivery(body.text || "");

  console.log("[ai-advisor]", JSON.stringify({
    timestamp: new Date().toISOString(),
    score: result.score,
    riskLevel: result.riskLevel,
  }));

  res.status(200).json({
    ok: true,
    feature: "AI OSS Delivery Advisor",
    result,
  });
};