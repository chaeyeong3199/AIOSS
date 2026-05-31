# RETROSPECTIVE

## 1. 프로젝트 요약

AIOSS 수업을 통해 GitHub 기반 OSS 개발 흐름, CI/CD, 테스트 자동화, 배포, 보안 스캔, 관측성, Feature Flag, A/B 테스트, Canary Rollout, Lean Startup 실험 운영을 단계적으로 구현했다.

최종적으로 AI OSS Delivery Advisor 기능을 추가하여 사용자가 최종 제출 준비 상태를 입력하면 누락된 제출 항목과 위험도를 분석할 수 있도록 했다.

## 2. 잘한 점

- GitHub Flow 기반으로 주차별 기능을 branch와 PR 중심으로 관리했다.
- CI/CD workflow를 구성하여 테스트와 배포 검증을 자동화했다.
- Feature Flag와 A/B 테스트를 구현하여 실험 기반 개발 흐름을 경험했다.
- Dependabot, npm audit, Snyk scan을 통해 보안 자동화 흐름을 구성했다.
- DORA metrics와 dashboard를 통해 개발 생산성 지표를 관찰할 수 있게 했다.

## 3. 어려웠던 점

- GitHub Actions 버전 변경과 artifact 업로드 오류를 해결하는 과정이 어려웠다.
- Vercel 배포 구조와 로컬 Express 서버 구조를 함께 관리해야 해서 API 경로 정리가 필요했다.
- E2E 테스트는 브라우저 설치가 필요해 로컬과 CI 환경 차이를 이해해야 했다.
- 주차별 산출물이 많아 최종 제출 기준에 맞게 문서를 정리하는 데 시간이 필요했다.

## 4. 개선한 점

- 테스트 커버리지 기준을 추가하여 코드 변경 안정성을 높였다.
- 헬스체크 API와 Docker smoke test를 통해 배포 안정성을 검증했다.
- Canary Rollout과 Rollback Plan을 문서화하여 장애 대응 흐름을 정리했다.
- 최종 제출을 위해 README, RUNBOOK, CHANGELOG, RETROSPECTIVE를 보강했다.

## 5. 배운 점

- OSS 프로젝트는 코드뿐 아니라 문서, 기여 가이드, 보안, 테스트, 배포, 운영 계획이 함께 갖춰져야 한다.
- CI/CD는 단순 자동 실행이 아니라 PR 품질을 보장하는 gate 역할을 한다.
- Feature Flag와 Canary는 빠른 실험과 안전한 배포를 동시에 가능하게 한다.
- 최종 제출 단계에서는 구현보다도 재현 가능성과 증거 정리가 중요하다.

## 6. 향후 개선 방향

- 실제 LLM API 또는 경량 ML 모델을 연결하여 AI Advisor의 분석 정확도를 높인다.
- SBOM 생성을 추가해 공급망 보안을 강화한다.
- 대시보드에 실시간 로그와 metric summary를 더 명확히 시각화한다.
- GitHub Release Notes 자동 생성을 추가한다.