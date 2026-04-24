# 📌 L01: 오리엔테이션 기반 개발 환경 설정 및 프로젝트 제안

## ✅ 완료 항목

### Git/GitHub 환경 설정
- Git 설정 완료 (사용자: chaeyeong, 이메일: codud1704@naver.com)
- SSH 키 생성 (ED25519 알고리즘)
- 로컬 저장소 초기화 및 첫 커밋 완료

### 프로젝트 제안: LightGauss Optimizer

**프로젝트명:** 동적 인체 렌더링을 위한 3D Gaussian Splatting 기반 경량화 및 샘플링 기법 연구

**문제 정의:** GPS-Gaussian 모델의 VRAM 병목 및 연산 비효율 문제 해결

**핵심 기능 3가지:**
1. 가우시안 Pruning - 불필요한 가우시안 자동 제거
2. Importance Sampling - 중요 영역 중심 샘플링 최적화
3. 통합 최적화 파이프라인 - 두 기법 결합 자동화

**기술 스택:** Python, PyTorch, CUDA, Docker

**마일스톤:** 16주 계획 완성
- W1-4: 기획 및 초기 세팅
- W5-8: 핵심 기법 구현 및 MVP
- W9-12: 고도화 및 실험
- W13-16: 최적화 및 발표 준비

**성능 목표:** 메모리 25% 감소, FPS 1.5배 향상, PSNR 28dB 이상 유지

---

## 📄 상세 자료

- **프로젝트 제안서:** [Project_Proposal.md](Project_Proposal.md)
- **연구 논문 초안:** [paper_draft.md](paper_draft.md)

