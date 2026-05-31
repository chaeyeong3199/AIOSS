const test = require("node:test");
const assert = require("node:assert/strict");
const { hello } = require("../src/index");
const { analyzeDelivery } = require("../src/aiAdvisor");

const {
  parseBoolean,
  parseTargetUsers,
  getUserId,
  isFeatureEnabled,
  getAllFlags,
} = require("../src/featureFlags");

const {
  assignVariant,
  getAssignments,
  createTrackingEvent,
} = require("../src/experiments");

const {
  getCanaryBucket,
  isUserInCanary,
  getNextCanaryStage,
  decideRollout,
} = require("../src/canary");

test("hello returns greeting message", () => {
  assert.equal(hello("Week12"), "Hello, Week12!");
});

test("parseBoolean converts common truthy and falsy strings", () => {
  assert.equal(parseBoolean("true"), true);
  assert.equal(parseBoolean("1"), true);
  assert.equal(parseBoolean("enabled"), true);
  assert.equal(parseBoolean("false", true), false);
  assert.equal(parseBoolean("0", true), false);
  assert.equal(parseBoolean("disabled", true), false);
  assert.equal(parseBoolean("unknown", true), true);
});

test("parseTargetUsers trims comma separated user ids", () => {
  assert.deepEqual(parseTargetUsers("chaeyoung, tester, ,admin"), [
    "chaeyoung",
    "tester",
    "admin",
  ]);

  assert.deepEqual(parseTargetUsers(""), []);
});

test("getUserId reads header, query object, url query, then anonymous", () => {
  assert.equal(getUserId({ headers: { "x-user-id": "header-user" } }), "header-user");
  assert.equal(getUserId({ query: { userId: "query-user" } }), "query-user");
  assert.equal(getUserId({ url: "/api/flags?userId=url-user" }), "url-user");
  assert.equal(getUserId({}), "anonymous");
});

test("feature flag can be enabled globally or for target users", () => {
  assert.equal(
    isFeatureEnabled("doraDashboard", "guest", {
      FEATURE_DORA_DASHBOARD: "true",
    }),
    true
  );

  assert.equal(
    isFeatureEnabled("doraDashboard", "chaeyoung", {
      FEATURE_DORA_DASHBOARD: "false",
      FEATURE_DORA_USERS: "chaeyoung,tester",
    }),
    true
  );

  assert.equal(isFeatureEnabled("unknownFlag", "guest", {}), false);
});

test("getAllFlags returns at least three feature flags", () => {
  const flags = getAllFlags("guest", {});

  assert.ok(Object.keys(flags).length >= 3);
  assert.ok(flags.doraDashboard);
  assert.ok(flags.betaStatusApi);
  assert.ok(flags.canaryBanner);
});

test("same user gets consistent A/B variant", () => {
  const first = assignVariant("homeHeroCopy", "chaeyoung");
  const second = assignVariant("homeHeroCopy", "chaeyoung");

  assert.equal(first, second);
  assert.ok(["A", "B"].includes(first));
  assert.equal(assignVariant("unknownExperiment", "chaeyoung"), null);
});

test("getAssignments returns experiment metadata", () => {
  const assignments = getAssignments("chaeyoung");

  assert.ok(["A", "B"].includes(assignments.homeHeroCopy.variant));
  assert.match(assignments.homeHeroCopy.description, /A\/B/);
});

test("createTrackingEvent creates event payload", () => {
  const event = createTrackingEvent({
    userId: "chaeyoung",
    eventName: "experiment_exposure",
    experimentName: "homeHeroCopy",
    variant: "A",
    metadata: { page: "home" },
  });

  assert.equal(event.userId, "chaeyoung");
  assert.equal(event.eventName, "experiment_exposure");
  assert.equal(event.experimentName, "homeHeroCopy");
  assert.equal(event.variant, "A");
  assert.deepEqual(event.metadata, { page: "home" });
  assert.ok(event.timestamp);
});

test("canary rollout bucket and decision logic are deterministic", () => {
  assert.equal(getCanaryBucket("chaeyoung"), getCanaryBucket("chaeyoung"));
  assert.equal(isUserInCanary("chaeyoung", 100), true);
  assert.equal(isUserInCanary("chaeyoung", 0), false);
  assert.equal(getNextCanaryStage(1), 10);

  assert.deepEqual(decideRollout({ currentPercent: 10, healthStatus: "unhealthy" }), {
    action: "rollback",
    nextPercent: 0,
    reason: "health check failed",
  });

  assert.deepEqual(decideRollout({ currentPercent: 10, healthStatus: "healthy" }), {
    action: "promote",
    nextPercent: 50,
    reason: "health check passed",
  });
});

test("AI advisor analyzes delivery readiness", () => {
  const result = analyzeDelivery(
    "README LICENSE test coverage health rollback dependabot dashboard v1.0.2 retrospective demo video"
  );

  assert.ok(result.score >= 70);
  assert.ok(["low", "medium", "high"].includes(result.riskLevel));
  assert.ok(Array.isArray(result.completed));
  assert.ok(Array.isArray(result.missing));
  assert.ok(Array.isArray(result.recommendations));
});