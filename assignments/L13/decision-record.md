# Week 13 Pivot or Persevere Decision Record

## 1. 실험명

`homeHeroCopy` Feature Flag 기반 A/B 테스트

## 2. 실험 기간

2026-05-30 ~ 2026-06-12

## 3. 비교 대상

| Variant | 설명 |
|---|---|
| A | 기존 메인 대시보드 문구 |
| B | 실험 목적과 CTA를 더 명확하게 표현한 문구 |

## 4. 판단 기준

- CTA 클릭률
- 과업 완료율
- 평균 피드백 점수
- 정성 피드백에서 반복적으로 등장한 개선 의견

## 5. 결과 요약

자세한 수치는 `data/metrics-summary.json`과 `reports/week13-summary.md`에 기록했다.

Variant B는 Variant A보다 CTA 클릭률과 과업 완료율이 높게 나타났고, 사용자 피드백에서도 문구가 더 명확하다는 의견이 많았다.

## 6. 최종 결정

**Persevere**

## 7. 결정 이유

Variant B가 사용자의 다음 행동을 더 명확하게 유도했고, 실험 목적 이해도와 CTA 클릭률 측면에서 더 좋은 결과를 보였다. 따라서 현재 방향을 유지하면서, 다음 주차에서는 CTA 버튼 문구와 위치를 추가로 개선하는 후속 실험을 진행한다.

## 8. 후속 액션

- Variant B 문구를 기본값으로 반영한다.
- CTA 버튼 문구를 더 구체적으로 수정하는 후속 A/B 테스트를 설계한다.
- `/api/track` 이벤트를 GitHub Actions 리포트와 연결해 주간 지표 요약을 자동화한다.