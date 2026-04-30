# L08 워크플로우 최적화 비교 리포트

## 적용한 최적화
- 공통 Python 초기화와 pip 캐싱을 [`python-setup`](../../.github/actions/python-setup/action.yml) composite action으로 묶어 중복을 제거했다.
- 테스트 단계는 [`python-quality.yml`](../../.github/workflows/python-quality.yml) reusable workflow로 분리했다.
- 배포 단계는 [`python-ci.yml`](../../.github/workflows/python-ci.yml)에서 브랜치 조건과 변경 파일 감지를 함께 사용해 필요할 때만 실행되도록 만들었다.

## 최적화 전후 비교
| 항목 | 최적화 전 | 최적화 후 |
| --- | --- | --- |
| Python setup | 각 job에서 개별적으로 setup / install 수행 | composite action으로 공통화 |
| Dependency cache | 캐시 없음 | `actions/setup-python`의 pip cache 사용 |
| Test matrix | CI workflow 내부에 직접 작성 | reusable workflow로 분리 |
| Deploy gate | 브랜치 조건만 사용 | 브랜치 + paths filter 조건 사용 |

## 실행 시간 측정 방법
- 각 run의 step summary에 `pip cache hit`와 `dependency install time`이 기록된다.
- 같은 브랜치에서 반복 실행할수록 cache hit가 증가하고, dependency install time이 감소한다.
- 실제 수치는 GitHub Actions run summary 또는 artifact 로그에서 확인한다.

## GitHub 링크
- Repository Actions: https://github.com/chaeyeong3199/AIOSS/actions
- Main workflow: [`.github/workflows/python-ci.yml`](../../.github/workflows/python-ci.yml)
- Reusable workflow: [`.github/workflows/python-quality.yml`](../../.github/workflows/python-quality.yml)
- Composite action: [`.github/actions/python-setup/action.yml`](../../.github/actions/python-setup/action.yml)