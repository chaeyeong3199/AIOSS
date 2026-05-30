# Week 13 Lean Startup 실험 운영 과제

## 과제 목표

Week 13에서는 사용자 시나리오 기반으로 코드를 평가하고, LLM을 활용해 서로 다른 페르소나를 가진 10명의 사용자 피드백을 수집했다. 또한 Feature Flag 기반 A/B 테스트를 2주 운영하는 흐름으로 핵심 지표를 측정하고, 결과를 바탕으로 Pivot 또는 Persevere 결정을 문서화했다.

## 구현 및 운영 요약

### 1. 사용자 시나리오 기반 피드백 수집

- LLM을 활용해 10명의 사용자 페르소나를 생성했다.
- 각 페르소나는 서로 다른 사용 패턴을 가진다.
- 각 사용자는 AIOSS 대시보드에서 A/B variant를 확인하고 CTA 버튼을 클릭하는 시나리오를 수행했다.
- 만족도 점수, 과업 성공 여부, 정성 피드백을 수집했다.

관련 파일:

- [LLM Prompt](prompts/persona-feedback-prompt.md)
- [Persona Feedback](persona-feedback.md)
- [Feedback Data](data/feedback.json)

### 2. Feature Flag 기반 A/B 테스트

기존 Week 11에서 구현한 Feature Flag와 A/B 테스트 구조를 활용했다.

- Feature Flag: `doraDashboard`, `betaStatusApi`, `canaryBanner`
- A/B Experiment: `homeHeroCopy`
- Event Tracking: `experiment_exposure`, `cta_click`, `task_complete`

관련 파일:

- [Feature Flag Code](../../src/featureFlags.js)
- [Experiment Code](../../src/experiments.js)
- [Track API](../../api/track.js)

### 3. 2주 실험 지표 측정

2주 동안의 실험 이벤트를 `ab-test-events.json`으로 기록하고, 핵심 지표를 `metrics-summary.json`으로 요약했다.

측정 지표:

- 노출 수
- CTA 클릭률
- 과업 완료율
- 평균 피드백 점수

관련 파일:

- [A/B Test Events](data/ab-test-events.json)
- [Metrics Summary](data/metrics-summary.json)
- [Weekly Report](reports/week13-summary.md)

### 4. Pivot 또는 Persevere 결정

실험 결과 Variant B가 더 나은 클릭률, 과업 완료율, 피드백 점수를 보여 최종적으로 `Persevere`로 결정했다.

관련 파일:

- [Decision Record](decision-record.md)

## 실행 방법

```bash
npm install
npm run experiment:l13
npm run report:l13
npm test
```

## Github 제출 링크

- 실험 계획 문서: https://github.com/chaeyeong3199/AIOSS/blob/main/assignments/L13/experiment-plan.md
- 사용자 피드백 문서: https://github.com/chaeyeong3199/AIOSS/blob/main/assignments/L13/persona-feedback.md
- 실험 데이터: https://github.com/chaeyeong3199/AIOSS/tree/main/assignments/L13/data
- 주간 리포트: https://github.com/chaeyeong3199/AIOSS/blob/main/assignments/L13/reports/week13-summary.md
- 결정 기록: https://github.com/chaeyeong3199/AIOSS/blob/main/assignments/L13/decision-record.md

### GitHub Issues / Projects / Actions

- 프로젝트 보드: https://github.com/users/chaeyeong3199/projects/2
- 이슈 #54: 실험 가설 정의
- 이슈 #55: 10명 페르소나 생성
- 이슈 #56: 피드백 수집
- 이슈 #57: 2주 A/B 테스트 운영
- 이슈 #58: 주간 리포트 작성
- 이슈 #59: Pivot/Persevere 결정
- 이슈 #60: Actions 자동화
- 이슈 #61: 최종 제출 README
- 워크플로우: https://github.com/chaeyeong3199/AIOSS/blob/main/.github/workflows/week13-experiment-report.yml

---

※ 본 README 및 과제 산출물의 일부 코드/문서는 생성형 AI 도구의 도움을 받아 작성되었습니다.