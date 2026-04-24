# 🚀 GPS-Gaussian Optimization  
### 동적 인체 렌더링을 위한 3D Gaussian Splatting 기반 경량화 및 샘플링 기법 연구

---

## 📌 프로젝트 개요

본 프로젝트는 **GPS-Gaussian 모델의 렌더링 효율을 높이기 위한 최적화 연구**입니다.  
Gaussian Pruning과 Importance Sampling을 결합해 불필요한 연산을 줄이고 중요한 영역에 자원을 집중합니다.  
이를 통해 **메모리 사용량 감소, 렌더링 속도 향상, 화질 유지**를 함께 목표로 합니다.

---

## ⚙️ 주요 기능

Gaussian Pruning으로 중요도가 낮은 가우시안을 제거해 메모리와 연산량을 줄입니다.  
Importance Sampling으로 디테일이 많은 영역에 샘플링을 집중해 품질을 유지합니다.  
두 기법을 통합한 파이프라인으로 최적화, 렌더링, 성능 평가를 자동화합니다.

---

## 📊 DORA 4대 지표 자동 수집 (GitHub Actions)

과제 요구사항에 맞춰 DORA 4대 지표를 GitHub Actions로 자동 수집하도록 구성했습니다.

- Lead Time for Changes: 최근 30일 내 머지된 PR의 첫 커밋 시각부터 머지 시각까지 평균 시간
- Deployment Frequency: 최근 30일 내 `production/prod/live` 환경 성공 배포 수를 일 단위로 환산
- Change Failure Rate: 최근 30일 내 배포 상태(`failure/error`) 비율
- MTTR: 최근 30일 내 `incident/outage/sev/bug` 라벨 이슈의 평균 복구 시간(오픈~클로즈)

워크플로우 파일: `.github/workflows/dora-metrics.yml`

수집 스크립트: `scripts/collect_dora_metrics.py`

산출 파일

- `docs/metrics/latest.json`: 최신 DORA 지표 스냅샷
- `docs/metrics/history.json`: 날짜별 추이 데이터

실행 방식

- `workflow_dispatch`로 수동 실행
- `schedule`(매일 00:00 UTC)로 자동 실행
- 실행 후 metrics JSON을 저장소에 자동 커밋

---

## 🖥️ 대시보드 시안 (Chart.js)

대시보드 시안/구현 파일을 추가했습니다.

- 구현 파일: `docs/dora-dashboard.html`
- 시안 이미지: `docs/assets/dora-dashboard-preview.svg`

아래 이미지는 저장소에 포함된 대시보드 시안입니다.

![DORA Dashboard Preview](docs/assets/dora-dashboard-preview.svg)

대시보드는 `docs/metrics/history.json`과 `docs/metrics/latest.json`을 읽어 카드/추세 차트를 표시합니다.

