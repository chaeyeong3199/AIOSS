# 과제 2: 프로젝트 주제 제안서

## 기본 정보 (Basic Info)

- **프로젝트명:** Gaussian Pruning과 Importance Sampling을 적용한 GPS-Gaussian 경량화 및 가속화
- **개요:** GPS-Gaussian 모델에서 불필요한 가우시안을 제거(Pruning)하고, 핵심 디테일 영역에 샘플링을 집중하여 메모리 효율과 렌더링 속도를 높이는 최적화 파이프라인을 구현.
- **동기:** 초실감 입체 공간 미디어 상용화 시 발생하는 대규모 연산과 VRAM 병목 문제를 해결하고, 제한된 환경에서도 실시간 고품질 뷰 합성이 가능하도록 하기 위함.
- **예상 결과물:** 원본 렌더링 화질(PSNR, SSIM)을 유지하면서 메모리 사용을 대폭 줄이고 FPS를 향상시킨 최적화 모델 코드 및 성능 평가 보고서.

## 주요 기능 (Key Features)

1. 가우시안 Pruning
   - 시각적 기여도가 낮은 가우시안을 자동 식별 및 제거
2. Importance Sampling 기반 샘플링
   - 고주파 디테일 영역에 샘플링 자원을 집중
3. 통합 최적화 파이프라인
   - 두 기법을 결합한 실시간 적용 및 성능 측정

## 기술 스택 (Tech Stack)

- **Frontend:** – (해당 없음, 연구 중심 프로젝트)
- **Backend:** Python, PyTorch/TensorFlow 또는 관련 렌더링 라이브러리
- **Database:** – (필요시 성능 로그나 결과 저장용으로 간단한 파일 혹은 SQLite)
- **Deployment:** 로컬 연구 환경 및 GPU 서버

## 마일스톤 (Milestones)

- **W 1-4:** 기획, 설계, 데이터 준비 및 초기 모델 세팅
- **W 5-8:** 핵심 기법 구현(Gaussian Pruning, Importance Sampling) 및 MVP 확보
- **W 9-12:** 고도화, 추가 실험, 품질 및 성능 테스트
- **W 13-16:** 최적화, 문서화, 최종 발표 준비
