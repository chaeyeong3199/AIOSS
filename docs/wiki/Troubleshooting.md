# Troubleshooting

AIOSS에서 자주 발생하는 문제와 빠른 해결 방법을 정리했습니다.

## Git 문제

### non-fast-forward로 push가 거절될 때

- git pull --rebase origin main 실행
- 충돌 해결
- 다시 push

### 인증 실패가 발생할 때

- gh auth login 다시 실행
- 현재 계정과 저장소 권한 확인

## 환경 문제

### 의존성 설치 오류

- Python 버전 확인
- 가상환경 재생성
- 프로젝트 안내에 따라 의존성 재설치

### 스크립트 실행 실패

- 작업 디렉터리 확인
- 필요한 입력 파일 존재 여부 확인
- 스택 트레이스를 읽고 첫 번째 원인 오류부터 해결

## 관련 문서

- 초기 설정은 [Getting Started](Getting-Started)
- 표준 개발 흐름은 [Development Guide](Development-Guide)
- 메인으로 돌아가기: [Home](Home)
