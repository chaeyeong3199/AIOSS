# L12 과제 정리

12주차 과제에서는 Express 서버를 분리된 구조로 정리하고, 핵심 동작을 단위 테스트로 보강했습니다. 테스트 커버리지는 `c8` 기준 80% 이상을 목표로 CI에서 자동 검증하도록 구성했습니다.

## 구현 내용

- `src/app.js` 기준으로 HTTP 앱을 분리해 테스트 가능한 구조로 정리했습니다.
- `GET /api/health`, `GET /api/status`, `GET /api/flags`, `POST /api/track`를 중심으로 서버 동작을 검증했습니다.
- 기능 플래그, A/B 실험 배정, 트래킹 이벤트, 카나리 롤아웃 로직을 테스트로 보호했습니다.
- 레거시 코드의 핵심 경로를 보강해 리팩토링 후에도 동작이 유지되도록 했습니다.

## 테스트 전략

- 단위 테스트: `node:test` 기반으로 핵심 함수와 HTTP 라우트를 검증했습니다.
- 커버리지: `npm run test:coverage`로 라인, 브랜치, 함수, 문장 기준 80% 이상을 강제합니다.
- E2E: Playwright 시나리오로 대시보드의 초기 렌더링과 상태 표시를 확인합니다.
- 실패 시 Playwright가 스크린샷과 trace를 저장하도록 설정했습니다.

## CI 자동 실행

GitHub Actions에서는 두 개의 흐름으로 자동 실행됩니다.

- [Node Package Publish 워크플로우](../../.github/workflows/node-package.yml)는 `push`, `pull_request`, `workflow_dispatch`에서 실행되며, 테스트와 커버리지 검증 후 태그 배포 시 패키지 퍼블리시까지 연결됩니다.
- [Python CI 워크플로우](../../.github/workflows/python-ci.yml)는 빌드, 품질 검증, Node 단위 테스트, Playwright E2E를 순서대로 수행하고, E2E 리포트를 아티팩트로 업로드합니다.

## 실행 방법

```bash
npm install
npm run test
npm run test:coverage
npm run test:e2e
```

## 주요 파일

- [단위 테스트](../../tests/server.test.js)
- [기능 플래그 / 실험 테스트](../../tests/l11-feature-flags.test.js)
- [핵심 로직 테스트](../../tests/aioss.test.js)
- [E2E 시나리오](../../tests/e2e/dashboard.spec.js)
- [CI 워크플로우](../../.github/workflows/node-package.yml)
- [추가 CI 워크플로우](../../.github/workflows/python-ci.yml)

## 제출 링크

- 테스트 코드: https://github.com/chaeyeong3199/AIOSS/tree/main/tests
- CI 워크플로우: https://github.com/chaeyeong3199/AIOSS/blob/main/.github/workflows/node-package.yml
- CI 결과: https://github.com/chaeyeong3199/AIOSS/actions/workflows/node-package.yml
- Playwright E2E 테스트:
https://github.com/chaeyeong3199/AIOSS/blob/main/tests/e2e/dashboard.spec.js
- Playwright 설정:
https://github.com/chaeyeong3199/AIOSS/blob/main/playwright.config.js