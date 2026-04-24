# 📌 L02: DORA 메트릭 수집 자동화

## 📊 DORA 4대 지표 자동 수집 (GitHub Actions)

과제 요구사항에 맞춰 DORA 4대 지표를 GitHub Actions로 자동 수집하도록 구성했습니다.

- Lead Time for Changes: 최근 30일 내 머지된 PR의 첫 커밋 시각부터 머지 시각까지 평균 시간
- Deployment Frequency: 최근 30일 내 `production/prod/live` 환경 성공 배포 수를 일 단위로 환산
- Change Failure Rate: 최근 30일 내 배포 상태(`failure/error`) 비율
- MTTR: 최근 30일 내 `incident/outage/sev/bug` 라벨 이슈의 평균 복구 시간(오픈~클로즈)

워크플로우 파일: `.github/workflows/dora-metrics.yml`

수집 스크립트: `assignments/L02/collect_dora_metrics.py`

산출 파일

- `assignments/L02/latest.json`: 최신 DORA 지표 스냅샷
- `assignments/L02/history.json`: 날짜별 추이 데이터

실행 방식

- `workflow_dispatch`로 수동 실행
- `schedule`(매일 00:00 UTC)로 자동 실행
- 실행 후 metrics JSON을 저장소에 자동 커밋

---

## 🖥️ 대시보드 시안 (Chart.js)

대시보드 시안/구현 파일을 추가했습니다.

- 구현 파일: `assignments/L02/dora-dashboard.html`
- 시안 이미지: `assignments/L02/dora-dashboard-preview.svg`

아래 이미지는 저장소에 포함된 대시보드 시안입니다.

![DORA Dashboard Preview](assignments/L02/dora-dashboard-preview.svg)

대시보드는 `assignments/L02/history.json`과 `assignments/L02/latest.json`을 읽어 카드/추세 차트를 표시합니다.