# Secrets 및 배포 설정 안내

이 파일은 `assignments/L07`의 GitHub Actions 배포·시크릿 설정에 대한 예시 문서입니다.

1) 필요한 시크릿
 - `DEPLOY_TOKEN`: 배포 도구(예: 서버 토큰, 클라우드 API 키)에서 발급받은 토큰. 워크플로우의 `deploy` 잡에서 사용됩니다.

2) GitHub에 시크릿 추가 방법
 - 리포지토리 페이지에서 `Settings` → `Secrets and variables` → `Actions` → `New repository secret`를 선택
 - Name: `DEPLOY_TOKEN`, Value: (토큰 값)

3) 워크플로우에서의 사용 예시
 - `.github/workflows/python-ci.yml`의 `deploy` 잡은 환경변수 `DEPLOY_TOKEN`을 읽어 실제 배포 스크립트에서 사용합니다.
 - 민감정보는 워크플로우에 직접 하드코딩하지 마세요.

4) 배포 단계 예시 명령 (예)
 - Docker Hub에 푸시: `echo $DEPLOY_TOKEN | docker login --username <user> --password-stdin` 후 `docker push`
 - SSH 배포: `ssh` 키 대신 GitHub Secret을 사용하는 경우, 워크플로우에서 적절히 키를 생성/주입하여 사용하세요.

5) 로컬 실행 및 검증
 - 의존성 설치:
   ```bash
   python -m pip install -r requirements.txt
   python -m pip install -r requirements-dev.txt
   ```
 - 린트 실행:
   ```bash
   flake8
   ```
 - 테스트 실행:
   ```bash
   pytest -q
   ```

6) 유의사항
 - 실제 배포 전에는 `deploy` 잡의 커맨드를 안전한 테스트 환경에서 먼저 검증하세요.
 - 필요 시 `secrets` 외에 `environments`와 보호된 브랜치 규칙을 함께 사용하세요.

문의사항 있으면 알려주세요 — 배포 예시 스크립트를 환경에 맞게 작성해드리겠습니다.
