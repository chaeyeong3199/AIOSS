# Week 14 Final Delivery

Week 14에서는 AI OSS 최종 프로젝트를 제출 기준에 맞게 정리했다. 공개 GitHub 저장소의 문서화, 동작 가능한 AI 기능, CI/CD 게이트, 배포, 헬스체크, 롤백 계획, 관측성, 테스트, 보안, 릴리스 태그, 회고, 데모 영상을 한 번에 확인할 수 있도록 묶었다.

## 최종 프로젝트 GitHub 링크

- Repository: https://github.com/chaeyeong3199/AIOSS

## 제출 체크리스트

- 공개 저장소 문서: [README](../../README.md), [CONTRIBUTING](../../CONTRIBUTING.md), [CODE_OF_CONDUCT](../../CODE_OF_CONDUCT.md), [LICENSE](../../LICENSE)
- 동작 가능한 AI 기능: [API](../../api/ai.js) + [UI](../../public/index.html)
- PR 게이트 CI/CD: [Node Package Publish workflow](../../.github/workflows/node-package.yml)
- main 배포: [Docker build/publish workflow](../../.github/workflows/docker-publish.yml)와 Vercel 배포 구성
- 헬스체크: [`/api/health`](../../api/health.js)와 대시보드의 `/health`
- 롤백 계획: Canary 실패 시 직전 단계로 되돌리는 흐름과 이전 태그 재배포 전략
- 관측성: [DORA metrics workflow](../../.github/workflows/dora-metrics.yml), [metrics snapshot](../../docs/metrics/latest.json), [dashboard](../../public/dora-dashboard.html)
- 테스트: 단위 테스트, 통합성 HTTP 검증, Playwright E2E, AI Advisor mini eval 성격의 검증
- 보안: [Dependabot](../../.github/dependabot.yml), [security scan workflow](../../.github/workflows/security-scan.yml)
- 문서: [CHANGELOG](../../CHANGELOG.md)와 [RETROSPECTIVE](../../RETROSPECTIVE.md)
- 릴리스 태그: `v1.0.0`, `v1.0.1`
- 3분 이내 영상 데모: 최종 제출용 영상 링크를 함께 첨부

## AI 기능

최종 AI 기능은 AI OSS Delivery Advisor다. 사용자가 제출 상태를 자연어로 입력하면 누락 항목과 위험도를 분석한다.

- 입력: 제출 준비 상태를 요약한 텍스트
- API: `POST /api/ai/advisor`
- 결과: 점수, 위험도, 완료 항목, 누락 항목, 개선 권고

### UI 동작

`public/index.html`의 AI Advisor 카드에서 텍스트를 입력하고 분석 버튼을 누르면 API 결과가 화면에 표시된다. 같은 화면에서 health check, feature flag, A/B test, DORA dashboard도 함께 확인할 수 있다.

## 배포 및 운영

- main 브랜치 기준으로 Vercel과 Docker 배포 흐름을 유지한다.
- `/api/health`가 정상 응답을 반환하는지 먼저 확인하고, Docker smoke test로 `/health`를 검증한다.
- Canary rollout은 `health check failed` 시 rollback 되도록 설계했다.
- 관측성은 GitHub Actions가 수집하는 DORA metrics와 dashboard로 확인한다.

## 검증 방법

```bash
npm install
npm test
npm run test:coverage
```

## 관련 산출물

- [AI Advisor API](../../api/ai.js)
- [AI Advisor 로직](../../src/aiAdvisor.js)
- [대시보드 UI](../../public/index.html)
- [헬스체크 API](../../api/health.js)
- [상태 API](../../api/status.js)
- [테스트](../../tests/aioss.test.js)

---

※ 본 README 및 과제 산출물의 일부 코드/문서는 생성형 AI 도구의 도움을 받아 작성되었습니다.
