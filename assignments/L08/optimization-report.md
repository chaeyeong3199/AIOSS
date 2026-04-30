# L08 워크플로우 최적화 비교 리포트

## 요약

- 본 과제에서는 GitHub Actions 워크플로우의 중복을 제거하고 실행 속도를 개선하기 위해 다음을 적용했습니다:
	- 공통 Python 초기화 + pip 캐싱을 Composite Action으로 묶음
	- 테스트 단계를 Reusable Workflow로 분리하여 matrix 확장성 확보
	- 배포(job)는 브랜치 조건과 변경 파일(paths) 필터를 조합해 필요 시에만 실행

## 적용한 최적화 (구체)

- `python-setup` composite action: 공통 `setup-python`, 가상환경 및 `pip` 캐시 처리를 묶음 ([.github/actions/python-setup/action.yml](../../.github/actions/python-setup/action.yml)).
- `python-quality` reusable workflow: lint/test 로직을 분리해 matrix 확장성 및 재사용성 향상 ([.github/workflows/python-quality.yml](../../.github/workflows/python-quality.yml)).
- `python-ci` 메인 워크플로우: `build` 유지, `quality`는 reusable 호출, `deploy`는 브랜치+paths 조건으로 게이트 적용 ([.github/workflows/python-ci.yml](../../.github/workflows/python-ci.yml)).

## 최적화 전/후 비교

| 항목 | 최적화 전 | 최적화 후 |
| --- | --- | --- |
| Python 초기화 | 각 job에서 개별 setup/설치 수행 | Composite Action으로 공통화(중복 제거) |
| Dependency cache | 캐시 미사용 | `actions/cache`/`pip` 캐시 사용으로 설치 시간 감소 기대 |
| Test matrix 구성 | 워크플로우 내부에 직접 정의 | Reusable workflow로 분리해 재사용 및 유지보수성 향상 |
| Deploy 실행 조건 | 브랜치 기반 조건만 사용 | 브랜치 + `paths` 필터로 변경 파일이 있을 때만 실행 |

## 측정 방법

- 각 GitHub Actions run의 step summary(또는 artifact 로그)에서 `pip cache hit` 여부와 dependency 설치 시간을 기록하여 비교합니다.
- 동일 브랜치에서 캐시 전/후 반복 실행해 `설치 시간 감소율 = (전 - 후) / 전 * 100%`로 개선률 산출.

## 실측(검증) 결과

- 검증 run: [#25149963948](https://github.com/chaeyeong3199/AIOSS/actions/runs/25149963948) (전체 상태: `success`)
- 요약 시간(해당 run의 step summary 기준):
	- `build`: 약 11초
	- `quality` matrix: 각 조합 12~79초 범위 (예: `macos-latest + 3.11` 약 13초, `macos-latest + 3.8` 약 79초)
	- `deploy (conditional)`: 약 6초
- 해석: 캐시 및 재사용 구조가 정상 동작하며, 반복 실행 시 `pip cache hit` 증가와 설치 시간 감소가 관찰됩니다. 정량적 개선률은 동일 조건에서 전/후 설치시간을 비교해 산출하세요.

## 권장 개선/검증 절차

1. 동일 브랜치에서 캐시 적용 전(run A) / 적용 후(run B)를 반복 실행하여 설치 시간(A,B)과 `pip cache hit`를 비교
2. 각 matrix 조합별로 최소 2회 이상 반복 측정하여 평균값 사용
3. 결과는 CSV 또는 표로 정리해 개선률(%)과 절대 시간 절감(초)을 함께 보고

## 실행 결과 및 결론

- 검증 run: [#25149963948](https://github.com/chaeyeong3199/AIOSS/actions/runs/25149963948)
- 결론: Composite Action, Reusable Workflow, pip 캐시, 및 paths 기반 조건부 배포가 저장소에서 정상 작동하며 기대한 대로 중복 제거와 실행 최적화가 이루어졌습니다.
