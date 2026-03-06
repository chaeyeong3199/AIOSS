# 프로젝트 개요

**프로젝트명:** Gaussian Pruning과 Importance Sampling을 적용한 GPS-Gaussian 경량화 및 가속화

## 연구 목표

- GPS-Gaussian에서 불필요한 가우시안을 제거(pruning)하여 메모리 부담을 줄임
- 핵심 디테일 영역에 importance sampling을 집중해 렌더링 효율을 높임
- 위 두 기법을 통합한 파이프라인을 구축하여 메모리 효율과 렌더링 속도 극대화

## 연구 동기

초실감 입체 공간 미디어가 상용화될 때 발생하는 연산량 및 VRAM 병목 현상을 해결하고,
제한된 환경(모바일/VR 등)에서도 실시간 고품질 뷰 합성을 가능하게 하기 위함.

## 예상 결과물

1. 최적화 모델 코드
   - Gaussian pruning과 importance sampling이 적용된 GPS-Gaussian 구현
2. 성능 평가 지표
   - 원본 렌더링 화질(PSNR, SSIM) 보존
   - 메모리 사용량 대폭 감소
   - 프레임율(FPS) 향상

## 기대 효과

- 컴퓨팅 자원이 제한된 디바이스에서도 실시간 고품질 렌더링
- VRAM 및 연산 부담 감소로 비용 절감 및 사용자 경험 개선
