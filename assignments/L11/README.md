# Week 11 과제 정리

11주차 과제에서는 Feature Flag, A/B 테스트, Canary 롤아웃 검증을 한 흐름으로 정리했다. 핵심 목표는 환경 변수와 대상 사용자 기준으로 기능을 제어하고, 실험 배정은 사용자별로 일관되게 유지하며, 선택과제로 Canary 단계 롤아웃과 자동 롤백 시나리오까지 확인하는 것이다.

## 구현 요약

### 1) Feature Flag 3개 이상 도입

다음 3개의 Feature Flag를 도입했다.

- `doraDashboard`: DORA 대시보드 링크 노출
- `betaStatusApi`: Beta Status API 카드 노출
- `canaryBanner`: Canary 롤아웃 안내 배너 노출

각 플래그는 환경 변수와 대상 사용자 목록으로 제어한다.

- 전역 활성화: `FEATURE_DORA_DASHBOARD`, `FEATURE_BETA_STATUS_API`, `FEATURE_CANARY_BANNER`
- 대상 사용자 제어: `FEATURE_DORA_USERS`, `FEATURE_BETA_USERS`, `FEATURE_CANARY_USERS`

동일한 사용자에 대해 대상 사용자 목록이 우선 적용되고, 그 다음에 전역 환경 변수 값을 반영한다.

### 2) A/B 테스트 2개 variant 구성

`homeHeroCopy` 실험을 추가해 `A` / `B` 두 variant를 구성했다. 사용자 할당은 `experimentName:userId` 문자열을 해시하는 방식으로 계산해서, 같은 사용자는 항상 같은 variant를 받도록 했다.

이벤트 추적도 함께 추가했다.

- `experiment_exposure`: 실험 노출 기록
- `cta_click`: CTA 클릭 기록

추적 payload는 `userId`, `experimentName`, `variant`, `eventName`, `metadata`를 포함한다.

### 3) 선택과제 Canary 롤아웃 검증

`1% -> 10% -> 50% -> 100%` 단계로 Canary 롤아웃이 진행되는 시나리오를 검증했다. `health check`가 실패하면 자동으로 직전 단계로 롤백되는 흐름도 로그로 남겼다.

## 검증 결과

- 최소 3개 이상의 Feature Flag가 반환된다.
- 동일한 `userId`는 항상 동일한 A/B variant를 받는다.
- 이벤트 추적 시 `experiment_exposure`와 `cta_click`이 기록된다.
- Canary 단계에서 `health=unhealthy`이면 `rollback`이 발생한다.

## 관련 파일

- Feature Flag 코드: [src/featureFlags.js](../../src/featureFlags.js)
- A/B 테스트 및 이벤트 추적 코드: [src/experiments.js](../../src/experiments.js)
- Canary 롤아웃 코드: [src/canary.js](../../src/canary.js)
- 플래그 API: [api/flags.js](../../api/flags.js)
- 실험 트래킹 API: [api/track.js](../../api/track.js)
- Canary 상태 API: [api/rollout.js](../../api/rollout.js)
- 실험 로그: [experiment-log.md](experiment-log.md)
- Canary 로그: [canary-rollout-log.md](canary-rollout-log.md)

## GitHub 링크

- Feature Flag 코드: https://github.com/chaeyeong3199/AIOSS/blob/main/src/featureFlags.js
- A/B 테스트 코드: https://github.com/chaeyeong3199/AIOSS/blob/main/src/experiments.js
- Canary 롤아웃 코드: https://github.com/chaeyeong3199/AIOSS/blob/main/src/canary.js
- 실험 로그: https://github.com/chaeyeong3199/AIOSS/blob/main/assignments/L11/experiment-log.md
- Canary 로그: https://github.com/chaeyeong3199/AIOSS/blob/main/assignments/L11/canary-rollout-log.md
- API 플래그 엔드포인트: https://github.com/chaeyeong3199/AIOSS/blob/main/api/flags.js
- 트래킹 엔드포인트: https://github.com/chaeyeong3199/AIOSS/blob/main/api/track.js
- 롤아웃 엔드포인트: https://github.com/chaeyeong3199/AIOSS/blob/main/api/rollout.js

## 실행 메모

환경 변수를 바꿔서 플래그를 확인할 수 있다.

```bash
FEATURE_DORA_DASHBOARD=true
FEATURE_DORA_USERS=chaeyoung,tester
FEATURE_BETA_STATUS_API=true
FEATURE_BETA_USERS=guest
FEATURE_CANARY_BANNER=false
FEATURE_CANARY_USERS=chaeyoung
CANARY_PERCENT=10
```

위 설정에서 `/api/flags`, `/api/track`, `/api/rollout`을 확인하면 과제 요구사항을 한 번에 검증할 수 있다.

---

※ 본 README 및 과제 산출물의 일부 코드/문서는 생성형 AI 도구의 도움을 받아 작성되었습니다.