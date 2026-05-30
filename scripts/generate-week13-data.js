const fs = require("fs");
const path = require("path");
const { assignVariant } = require("../src/experiments");

const outDir = path.join(__dirname, "..", "assignments", "L13", "data");
fs.mkdirSync(outDir, { recursive: true });

const personas = [
  {
    userId: "persona-01",
    role: "AIOSS 초급 수강생",
    pattern: "설명을 천천히 읽고 버튼을 클릭함",
    scenario: "메인 대시보드에서 현재 A/B variant를 확인하고 CTA 버튼을 클릭한다.",
  },
  {
    userId: "persona-02",
    role: "모바일 중심 사용자",
    pattern: "짧은 문구와 눈에 띄는 버튼을 선호함",
    scenario: "모바일 화면에서 실험 설명을 확인하고 CTA 버튼을 찾는다.",
  },
  {
    userId: "persona-03",
    role: "오픈소스 메인테이너",
    pattern: "README, 링크, 실험 근거를 먼저 확인함",
    scenario: "실험 문서와 GitHub 링크를 확인한 뒤 기능을 평가한다.",
  },
  {
    userId: "persona-04",
    role: "QA 테스터",
    pattern: "버튼, API 응답, 예외 상황을 꼼꼼히 확인함",
    scenario: "Health, Flags, Track API가 정상적으로 작동하는지 확인한다.",
  },
  {
    userId: "persona-05",
    role: "DevOps 담당자",
    pattern: "배포, 롤아웃, 롤백 가능성을 중요하게 봄",
    scenario: "Feature Flag와 Canary 설정이 실험 운영에 적합한지 확인한다.",
  },
  {
    userId: "persona-06",
    role: "프로덕트 매니저",
    pattern: "전환율, 성공률, 사용자 피드백 점수를 우선 확인함",
    scenario: "Variant별 핵심 지표를 비교하고 의사결정 근거를 검토한다.",
  },
  {
    userId: "persona-07",
    role: "보안 리뷰어",
    pattern: "API 입력값과 로그에 민감함",
    scenario: "Track API의 payload와 기록 방식이 과도하지 않은지 확인한다.",
  },
  {
    userId: "persona-08",
    role: "성급한 사용자",
    pattern: "문구를 자세히 읽지 않고 바로 클릭함",
    scenario: "첫 화면에서 CTA 버튼이 충분히 명확한지 확인한다.",
  },
  {
    userId: "persona-09",
    role: "접근성 관심 사용자",
    pattern: "텍스트 명확성, 버튼 위치, 이해 가능성을 평가함",
    scenario: "실험 variant 문구가 이해하기 쉬운지 평가한다.",
  },
  {
    userId: "persona-11",
    role: "기존 재방문 사용자",
    pattern: "이전 주차 결과와 비교해 변화 여부를 확인함",
    scenario: "Week 11/12 대비 Week 13 실험 운영이 개선되었는지 확인한다.",
  },
];

function hash(input) {
  let value = 2166136261;

  for (let i = 0; i < input.length; i += 1) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }

  return value >>> 0;
}

function getDate(dayOffset) {
  const date = new Date("2026-05-30T00:00:00+09:00");
  date.setDate(date.getDate() + dayOffset);
  return date.toISOString().slice(0, 10);
}

function shouldClick(userId, day, variant) {
  const threshold = variant === "B" ? 72 : 48;
  return hash(`${userId}:${day}:cta`) % 100 < threshold;
}

function shouldComplete(userId, day, variant) {
  const threshold = variant === "B" ? 82 : 65;
  return hash(`${userId}:${day}:complete`) % 100 < threshold;
}

const feedback = personas.map((persona, index) => {
  const variant = assignVariant("homeHeroCopy", persona.userId);
  const score = variant === "B" ? 4 + (index % 2) : 3 + (index % 2);

  return {
    ...persona,
    experimentName: "homeHeroCopy",
    assignedVariant: variant,
    satisfactionScore: Math.min(score, 5),
    taskSuccess: variant === "B" || index % 3 !== 0,
    feedback:
      variant === "B"
        ? "실험 목적과 CTA가 더 명확하게 보여서 다음 행동을 결정하기 쉬웠다."
        : "기본 문구는 이해 가능하지만 실험 목적과 CTA의 의미가 조금 덜 명확했다.",
  };
});

const events = [];

for (let day = 0; day < 14; day += 1) {
  personas.forEach((persona) => {
    const variant = assignVariant("homeHeroCopy", persona.userId);
    const date = getDate(day);

    events.push({
      date,
      userId: persona.userId,
      experimentName: "homeHeroCopy",
      variant,
      eventName: "experiment_exposure",
    });

    if (shouldClick(persona.userId, day, variant)) {
      events.push({
        date,
        userId: persona.userId,
        experimentName: "homeHeroCopy",
        variant,
        eventName: "cta_click",
      });
    }

    if (shouldComplete(persona.userId, day, variant)) {
      events.push({
        date,
        userId: persona.userId,
        experimentName: "homeHeroCopy",
        variant,
        eventName: "task_complete",
      });
    }
  });
}

function summarize(events, feedback) {
  const result = {
    A: {
      exposures: 0,
      ctaClicks: 0,
      taskCompletes: 0,
      feedbackCount: 0,
      averageScore: 0,
    },
    B: {
      exposures: 0,
      ctaClicks: 0,
      taskCompletes: 0,
      feedbackCount: 0,
      averageScore: 0,
    },
  };

  events.forEach((event) => {
    if (!result[event.variant]) return;

    if (event.eventName === "experiment_exposure") {
      result[event.variant].exposures += 1;
    }

    if (event.eventName === "cta_click") {
      result[event.variant].ctaClicks += 1;
    }

    if (event.eventName === "task_complete") {
      result[event.variant].taskCompletes += 1;
    }
  });

  ["A", "B"].forEach((variant) => {
    const scores = feedback
      .filter((item) => item.assignedVariant === variant)
      .map((item) => item.satisfactionScore);

    result[variant].feedbackCount = scores.length;
    result[variant].averageScore =
      scores.length > 0
        ? Number((scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2))
        : 0;

    result[variant].clickRate = Number(
      (result[variant].ctaClicks / result[variant].exposures).toFixed(4)
    );

    result[variant].completionRate = Number(
      (result[variant].taskCompletes / result[variant].exposures).toFixed(4)
    );
  });

  const decision =
    result.B.clickRate > result.A.clickRate &&
    result.B.completionRate >= result.A.completionRate &&
    result.B.averageScore >= result.A.averageScore
      ? "persevere"
      : "pivot";

  return {
    experimentName: "homeHeroCopy",
    period: {
      start: "2026-05-30",
      end: "2026-06-12",
      days: 14,
    },
    metrics: result,
    decision,
  };
}

const summary = summarize(events, feedback);

fs.writeFileSync(
  path.join(outDir, "personas.json"),
  JSON.stringify(personas, null, 2)
);

fs.writeFileSync(
  path.join(outDir, "feedback.json"),
  JSON.stringify(feedback, null, 2)
);

fs.writeFileSync(
  path.join(outDir, "ab-test-events.json"),
  JSON.stringify(events, null, 2)
);

fs.writeFileSync(
  path.join(outDir, "metrics-summary.json"),
  JSON.stringify(summary, null, 2)
);

console.log("Week 13 experiment data generated.");
console.log(summary);