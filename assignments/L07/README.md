# 📌 L07: GitHub Actions 기반 기본 CI/CD 구축

Node.js 또는 Python 프로젝트에 CI 워크플로우를 구성해 Lint/Test를 자동 실행한다.
Matrix 전략으로 버전/OS 조합 테스트를 적용하고 Secrets로 민감정보를 안전하게 주입한다.
Build->Test->Deploy 의존성과 아티팩트 업로드/다운로드를 포함한 복합 워크플로우를 완성한다.

## 제출 내용
- 워크플로우 파일: [`.github/workflows/python-ci.yml`](../../.github/workflows/python-ci.yml)
- 시크릿 및 배포 설명: [`DEPLOY.md`](DEPLOY.md)
- GitHub Actions 실행 내역: [Run #25092830338](https://github.com/chaeyeong3199/AIOSS/actions/runs/25092830338)

## 구현 요약
- `build` 잡에서 빌드 산출물을 생성하고 아티팩트로 업로드
- `test` 잡에서 OS/Python 매트릭스로 린트와 테스트 실행
- `deploy` 잡에서 `build` 산출물을 다운로드하고 `DEPLOY_TOKEN` 시크릿을 사용해 배포 단계 준비

## 검증 결과
- 로컬 `pytest -q` 실행 성공
- 워크플로우 핵심 구성은 `tests/test_python_ci.py`로 검증