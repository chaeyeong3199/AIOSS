# Week 11 A/B Test Experiment Log

## 실험 개요

- Experiment Name: `homeHeroCopy`
- Variant A: 기존 제목 문구 사용
- Variant B: 개선된 제목 문구 사용
- 사용자 할당 방식: `experimentName:userId` 기반 hash
- 일관성 검증: 동일 userId는 항상 동일 variant를 받도록 구현

## 테스트 사용자

| userId | Assigned Variant | Event |
|---|---|---|
| chaeyoung | A 또는 B | experiment_exposure |
| guest | A 또는 B | experiment_exposure |
| tester | A 또는 B | cta_click |

## 이벤트 추적 방식

프런트엔드에서 `/api/track`으로 이벤트를 전송한다.

추적 이벤트 예시:

```json
{
  "userId": "chaeyoung",
  "eventName": "experiment_exposure",
  "experimentName": "homeHeroCopy",
  "variant": "A",
  "metadata": {
    "page": "public/index.html"
  }
}
```

## 검증 결과

- /api/flags?userId=chaeyoung 호출 시 Feature Flag와 A/B variant가 함께 반환됨
- 같은 userId로 반복 호출해도 동일한 variant가 반환됨
- 페이지 진입 시 experiment_exposure 이벤트가 기록됨
- 버튼 클릭 시 cta_click 이벤트가 기록됨