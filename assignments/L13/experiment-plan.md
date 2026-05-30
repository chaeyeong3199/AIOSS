# Week 13 Lean Startup Experiment Plan

## 1. 실험 배경

AIOSS 프로젝트는 Week 11에서 Feature Flag와 A/B 테스트 기능을 도입했고, Week 12에서 테스트 자동화와 E2E 검증을 추가했다. Week 13에서는 이 기능을 실제 실험 운영 흐름으로 확장하여 사용자 피드백과 핵심 지표를 기반으로 제품 방향을 결정한다.

## 2. 가설

Variant B처럼 실험 목적과 CTA를 더 명확하게 보여주는 문구를 제공하면, 사용자의 CTA 클릭률과 과업 완료율이 Variant A보다 높아질 것이다.

## 3. 실험 대상

- Experiment Name: `homeHeroCopy`
- Variant A: 기존 메인 문구
- Variant B: 실험 목적이 더 명확한 개선 문구
- 대상 사용자: LLM으로 생성한 10개 페르소나 사용자
- 운영 기간: 2026-05-30 ~ 2026-06-12

## 4. Feature Flag

사용한 Feature Flag는 다음과 같다.

| Flag | 목적 |
|---|---|
| `doraDashboard` | DORA 대시보드 링크 노출 제어 |
| `betaStatusApi` | Beta Status API 카드 노출 제어 |
| `canaryBanner` | Canary Rollout 배너 노출 제어 |

## 5. 핵심 지표

| Metric | 설명 |
|---|---|
| `experiment_exposure` | 실험 variant가 사용자에게 노출된 횟수 |
| `cta_click` | CTA 버튼 클릭 횟수 |
| `task_complete` | 사용자가 주어진 시나리오를 완료한 횟수 |
| `clickRate` | CTA 클릭 수 / 노출 수 |
| `completionRate` | 과업 완료 수 / 노출 수 |
| `averageScore` | 사용자 피드백 만족도 평균 |

## 6. 성공 기준

다음 조건을 만족하면 `Persevere`로 결정한다.

- Variant B의 CTA 클릭률이 Variant A보다 높다.
- Variant B의 과업 완료율이 Variant A 이상이다.
- Variant B의 평균 피드백 점수가 Variant A 이상이다.

조건을 만족하지 못하면 `Pivot`으로 결정한다.