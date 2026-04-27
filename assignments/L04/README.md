# 📌 L04: GitHub Flow 및 코드리뷰 협업 실습

Feature 브랜치 전략으로 작업하고 Conventional Commits를 적용해 PR을 생성한다.
최소 3건 이상의 PR 리뷰를 수행하면서 [MUST]/[SHOULD] 태그를 사용해 구조화된 피드백을 남긴다.

---

## ✅ 진행 체크리스트

- [x] `feature/` 브랜치 생성
- [x] Conventional Commits 형식으로 변경 사항 커밋
- [x] 원격 브랜치로 push
- [x] Pull Request 생성
- [x] 최소 3건 이상의 PR 리뷰 수행
- [x] 리뷰 코멘트에 `[MUST]` / `[SHOULD]` 태그 사용

## 🔗 결과 URL

- Pull Request: [#29 docs: add week 4 GitHub Flow guide](/chaeyeong3199/AIOSS/pull/29)

## 💡 리뷰 예시

- `[MUST]` 핵심 로직에서 예외 처리 누락이 있습니다.
- `[MUST]` 테스트가 실패하는 경로를 추가로 검증해야 합니다.
- `[SHOULD]` 함수명을 더 의도를 드러내는 이름으로 바꾸면 좋겠습니다.
- `[SHOULD]` 중복되는 설명은 하나로 합쳐도 충분합니다.

## 📌 권장 진행 방식

1. `feature/l04-github-flow` 같은 이름으로 브랜치를 만든다.
2. 변경 내용을 작은 단위로 나눠 커밋한다.
3. PR 본문에는 변경 이유와 확인 포인트를 간단히 적는다.
4. 리뷰에서는 수정이 꼭 필요한 항목과 개선 제안을 분리해 남긴다.