# 📌 L03: GitHub Projects 계획·추적 체계 구축

칸반 기반 GitHub Project를 생성하고 상태 컬럼(Backlog/To Do/In Progress/Review/Done)을 구성한다.
10개 이상 이슈, 템플릿(Bug/Feature), 라벨 체계, 2개 마일스톤을 포함한 스프린트 운영용 백로그를 만든다.

## ✅ 완료/준비 항목

- [x] 과제 요구사항 분석
- [x] Issue Template 2종(Bug/Feature) 작성
- [x] 라벨 체계 정의
- [x] 마일스톤 2개 정의
- [x] 10개 이상 백로그 이슈 초안 작성
- [ ] GitHub Project 보드 생성 및 상태 컬럼 구성
- [ ] 원격 저장소에 이슈/라벨/마일스톤 실제 등록

## 1) GitHub Project 보드 구성

새 Project(보드형) 생성 후 아래 상태를 만든다.

- `Backlog`
- `To Do`
- `In Progress`
- `Review`
- `Done`

권장 운영 규칙:

- 신규 이슈는 `Backlog`로 시작
- 스프린트 시작 시 `To Do`로 이동
- 구현 시작 시 `In Progress`
- PR 생성 시 `Review`
- 머지 완료 시 `Done`

## 2) 라벨 체계

아래 라벨을 먼저 만든다.

- `type: bug`
- `type: feature`
- `priority: high`
- `priority: medium`
- `priority: low`
- `status: blocked`
- `status: ready`
- `area: docs`
- `area: metrics`
- `area: automation`

## 3) 마일스톤 구성

- `Sprint 1 (Planning & Setup)`
- `Sprint 2 (Execution & Review)`

각 마일스톤에는 시작/종료 예정일을 넣고, 이슈를 5개 이상 배정한다.

## 4) 백로그 이슈(10+) 예시

아래 항목을 그대로 이슈로 등록해도 된다.

1. `프로젝트 보드 초기 상태 컬럼 구성`
2. `Bug 템플릿 적용 및 검증`
3. `Feature 템플릿 적용 및 검증`
4. `라벨 체계 생성 및 설명 문서화`
5. `마일스톤 2개 생성 및 일정 설정`
6. `L02 DORA 수집 스크립트 개선 포인트 정리`
7. `DORA 대시보드 UI 개선 항목 정의`
8. `워크플로우 실패 시 알림/재시도 정책 정의`
9. `README 과제 진행 현황 표준화`
10. `주차별 산출물 점검 체크리스트 작성`
11. `프로젝트 회고 이슈 템플릿 초안 작성`
12. `스프린트 종료 보고서 양식 작성`

## 5) 템플릿 위치

- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/feature_request.yml`
- `.github/ISSUE_TEMPLATE/config.yml`

## 6) 제출 시점 체크리스트

- [ ] Project 보드 링크 첨부
- [ ] 이슈 10개 이상 생성 확인
- [ ] 라벨/마일스톤 설정 확인
- [ ] 이슈 템플릿 동작 스크린샷 첨부