const EXPERIMENTS = {
  homeHeroCopy: {
    description: "메인 페이지 제목 문구 A/B 테스트",
    variants: ["A", "B"],
  },
};

function hashString(input) {
  let hash = 2166136261;

  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function assignVariant(experimentName, userId = "anonymous") {
  const experiment = EXPERIMENTS[experimentName];

  if (!experiment) {
    return null;
  }

  const bucket = hashString(`${experimentName}:${userId}`);
  const index = bucket % experiment.variants.length;

  return experiment.variants[index];
}

function getAssignments(userId = "anonymous") {
  return Object.keys(EXPERIMENTS).reduce((result, experimentName) => {
    result[experimentName] = {
      variant: assignVariant(experimentName, userId),
      description: EXPERIMENTS[experimentName].description,
    };

    return result;
  }, {});
}

function createTrackingEvent({
  userId = "anonymous",
  eventName,
  experimentName,
  variant,
  metadata = {},
}) {
  return {
    timestamp: new Date().toISOString(),
    userId,
    eventName,
    experimentName,
    variant,
    metadata,
  };
}

function trackEvent(event) {
  const trackingEvent = createTrackingEvent(event);

  console.log("[experiment-event]", JSON.stringify(trackingEvent));

  return trackingEvent;
}

module.exports = {
  EXPERIMENTS,
  hashString,
  assignVariant,
  getAssignments,
  createTrackingEvent,
  trackEvent,
};