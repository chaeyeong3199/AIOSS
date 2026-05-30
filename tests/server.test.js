const test = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("../src/app");

function startTestServer() {
  const app = createApp();

  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const { port } = server.address();

      resolve({
        server,
        baseUrl: `http://127.0.0.1:${port}`,
      });
    });
  });
}

test("GET /api/health returns healthy status", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(`${baseUrl}/api/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "healthy");
  } finally {
    server.close();
  }
});

test("GET /api/status returns Week 12 message", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(`${baseUrl}/api/status`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.message, "Hello, AIOSS Week 12!");
    assert.equal(body.status, "ok");
  } finally {
    server.close();
  }
});

test("GET /api/flags returns user flags and experiment assignment", async () => {
  const previous = process.env.FEATURE_DORA_USERS;
  process.env.FEATURE_DORA_USERS = "chaeyoung";

  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(`${baseUrl}/api/flags?userId=chaeyoung`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.userId, "chaeyoung");
    assert.equal(body.flags.doraDashboard.enabled, true);
    assert.ok(["A", "B"].includes(body.experiments.homeHeroCopy.variant));
  } finally {
    process.env.FEATURE_DORA_USERS = previous;
    server.close();
  }
});

test("POST /api/track returns tracking event", async () => {
  const { server, baseUrl } = await startTestServer();

  try {
    const response = await fetch(`${baseUrl}/api/track`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: "chaeyoung",
        eventName: "cta_click",
        experimentName: "homeHeroCopy",
        variant: "B",
        metadata: { button: "trackClickButton" },
      }),
    });

    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.tracked, true);
    assert.equal(body.event.eventName, "cta_click");
    assert.equal(body.event.variant, "B");
  } finally {
    server.close();
  }
});