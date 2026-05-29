const test = require("node:test");
const assert = require("node:assert");

const {
  isFeatureEnabled,
  getAllFlags,
} = require("../src/featureFlags");

const {
  assignVariant,
  getAssignments,
  trackEvent,
} = require("../src/experiments");

test("environment variable can enable feature flag", () => {
  const env = {
    FEATURE_DORA_DASHBOARD: "true",
  };

  assert.strictEqual(
    isFeatureEnabled("doraDashboard", "guest", env),
    true
  );
});

test("target user can enable feature flag even when global env is false", () => {
  const env = {
    FEATURE_DORA_DASHBOARD: "false",
    FEATURE_DORA_USERS: "chaeyoung,tester",
  };

  assert.strictEqual(
    isFeatureEnabled("doraDashboard", "chaeyoung", env),
    true
  );

  assert.strictEqual(
    isFeatureEnabled("doraDashboard", "guest", env),
    false
  );
});

test("at least three feature flags are returned", () => {
  const flags = getAllFlags("guest", {});

  assert.ok(Object.keys(flags).length >= 3);
  assert.ok(flags.doraDashboard);
  assert.ok(flags.betaStatusApi);
  assert.ok(flags.canaryBanner);
});

test("same user gets consistent A/B variant", () => {
  const first = assignVariant("homeHeroCopy", "chaeyoung");
  const second = assignVariant("homeHeroCopy", "chaeyoung");

  assert.strictEqual(first, second);
});

test("A/B assignment returns one of two variants", () => {
  const assignments = getAssignments("chaeyoung");
  const variant = assignments.homeHeroCopy.variant;

  assert.ok(["A", "B"].includes(variant));
});

test("tracking event includes user, experiment, variant and event name", () => {
  const event = trackEvent({
    userId: "chaeyoung",
    eventName: "experiment_exposure",
    experimentName: "homeHeroCopy",
    variant: "A",
  });

  assert.strictEqual(event.userId, "chaeyoung");
  assert.strictEqual(event.eventName, "experiment_exposure");
  assert.strictEqual(event.experimentName, "homeHeroCopy");
  assert.strictEqual(event.variant, "A");
  assert.ok(event.timestamp);
});