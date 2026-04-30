# 📌 L08: 워크플로우 실행 최적화 (재사용/캐싱/조건부)

Matrix 확장 테스트를 적용하고 Reusable Workflow 및 Composite Action을 만들어 중복을 제거한다.
캐싱 전후 실행 시간을 측정해 개선률을 수치로 보고한다.
브랜치/PR 조건 및 변경 파일 감지를 활용해 선택적 배포 파이프라인을 구현한다.

## 제출 내용
- 메인 워크플로우: [`.github/workflows/python-ci.yml`](../../.github/workflows/python-ci.yml)
- 재사용 워크플로우: [`.github/workflows/python-quality.yml`](../../.github/workflows/python-quality.yml)
- Composite Action: [`.github/actions/python-setup/action.yml`](../../.github/actions/python-setup/action.yml)
- 비교 리포트: [`optimization-report.md`](optimization-report.md)

## 요약
- `build` 잡은 아티팩트 생성을 유지하면서 Python 초기화를 공통 액션으로 정리했다.
- `quality` 잡은 matrix 기반으로 OS / Python 버전을 확장하고, lint/test 로직을 reusable workflow로 분리했다.
- `deploy` 잡은 main 브랜치이면서 배포 관련 파일이 바뀐 경우에만 실행된다.

## 실행 결과
- Actions run: [#25149963948](https://github.com/chaeyeong3199/AIOSS/actions/runs/25149963948)
- 전체 결론: `success`
- 확인된 결과: `build` 1개 job, `quality` matrix 12개 job, `Deploy (conditional)` job 모두 성공
- 실행 요약: 재사용 워크플로우와 composite action이 정상 동작했고, 조건부 배포 단계도 실패 없이 통과했다.

## GitHub 링크
- Repository Actions: https://github.com/chaeyeong3199/AIOSS/actions