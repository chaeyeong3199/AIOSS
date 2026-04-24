# 📌 L01: 오리엔테이션 기반 개발 환경 설정 및 프로젝트 제안

## 🔧 Git/GitHub 개발 환경 설정

### 1. Git 기본 설정

로컬 개발 환경에서 Git 사용자 정보를 설정했습니다.

```bash
git config --global user.name "chaeyeong"
git config --global user.email "codud1704@naver.com"
```

- **Name:** chaeyeong
- **Email:** codud1704@naver.com
- **Git Version:** 2.46.0.windows.1

### 2. SSH 키 생성 및 GitHub 연결

ED25519 알고리즘 기반 SSH 키를 생성했습니다.

```bash
ssh-keygen -t ed25519 -C "codud1704@naver.com"
```

**생성된 키:**
- **Private Key:** `~/.ssh/id_ed25519`
- **Public Key:** `~/.ssh/id_ed25519.pub`

**GitHub 등록 방법:**
1. [GitHub Settings > SSH and GPG keys](https://github.com/settings/keys)로 이동
2. **New SSH key** 클릭
3. 공개 키 내용 (`id_ed25519.pub`)을 복사하여 붙여넣기
4. Title은 현재 PC 이름으로 설정

### 3. 첫 커밋 및 저장소 구조

로컬 저장소를 초기화하고 프로젝트 구조를 커밋했습니다.

```bash
git init
git add .
git commit -m "Initial commit: Project setup with assignments structure"
```

**커밋 히스토리:**
- Initial commit: 프로젝트 구조 및 `.gitignore` 파일 생성

**포함된 파일:**
- `.gitignore` - Python, IDE, 환경 변수 등 무시 설정
- `docker-compose.yml` - 개발 환경 설정
- `prometheus.yml` - 모니터링 설정
- `AIOSS/assignments/` - 과제 디렉토리 구조

---

## 📋 프로젝트 제안: LightGauss Optimizer

### 프로젝트명
**LightGauss Optimizer: 동적 인체 렌더링을 위한 3D Gaussian Splatting 기반 경량화 및 샘플링 기법 연구**

### 문제 정의

최근 **3D Gaussian Splatting** 기반 뷰 합성 기법이 실시간 렌더링과 높은 시각적 품질을 동시에 달성하면서 주목받고 있습니다. 특히 GPS-Gaussian은 사람 중심 3D 재구성에서 높은 품질을 제공하지만 다음과 같은 한계가 있습니다:

- **VRAM 병목:** 수백만 개 이상의 Gaussian으로 인한 메모리 사용량 증가
- **연산 비효율:** 모든 Gaussian을 균일하게 처리하여 불필요한 연산 수행
- **산업 적용 제약:** 모바일, VR/AR 등 제한된 환경에서의 실시간 적용 어려움

**동기:**
초실감 입체 공간 미디어 상용화 시 발생하는 대규모 연산 및 VRAM 병목 문제 해결하여, 산업적 적용성을 높일 필요가 있습니다.

### 핵심 기능 3가지

#### 1️⃣ **가우시안 Pruning (구조적 경량화)**

- 시각적 기여도가 낮은 가우시안을 자동 식별 및 제거
- 렌더링 기여도 기반 중요도 점수(위치, 크기, 색상, 불투명도) 계산
- 프루닝 비율 조정: 10%~90% 범위에서 단계별 조정 가능
- 후처리 보정: 제거된 가우시안으로 인한 시각적 결함 최소화

#### 2️⃣ **Importance Sampling 기반 샘플링 (연산 최적화)**

- 고주파 디테일 영역에 샘플링 자원 집중
- 엣지 검출 및 텍스처 복잡도 분석을 통한 중요도 맵 생성
- 동적 샘플링 전략: 프레임별/뷰별 중요도 실시간 재평가
- 전체 샘플 수 유지 하에서 분배 최적화

#### 3️⃣ **통합 최적화 파이프라인 (자동화)**

- Pruning + Sampling을 결합한 실시간 적용 및 성능 측정
- 모듈화된 파이프라인으로 모델 로딩~최적화~측정 자동화
- 피드백 루프: 품질 지표 모니터링 및 자동 튜닝
- CLI 및 스크립트 기반 사용자 인터페이스

### 기술 스택

| 계층 | 기술 |
|------|------|
| **Backend** | Python, PyTorch, CUDA |
| **GPU 가속** | OpenGL / Vulkan (필요시 통합) |
| **Database** | SQLite (실험 결과/파라미터), PostgreSQL (대규모 확장) |
| **Deployment** | Docker, 로컬 GPU + 클라우드 GPU(AWS/GCP) |
| **모니터링** | 실시간 웹 대시보드 (향후) |

### 예상 결과물

- **최적화 모델:** 원본 화질(PSNR ≥28dB, SSIM ≥0.90)을 유지하면서 메모리 50% 이상 감소, 렌더링 속도 2배 이상 향상
- **성능 평가 보고서:** 정량적 벤치마크 결과 및 정성적 비교 이미지 포함

---

## 📅 마일스톤 계획 (16주)

### **W 1-4: 기획, 설계, 데이터 준비 및 초기 모델 세팅**
- 프로젝트 요구사항 정의 및 설계
- GPS-Gaussian 기본 구조 분석
- 데이터셋 수집 및 전처리
- 초기 프로토타입 구축

### **W 5-8: 핵심 기법 구현 및 MVP 확보**
- Gaussian Pruning 알고리즘 구현
- Importance Sampling 스키마 구현
- 두 기법 통합 최소 기능 제품(MVP) 완성
- 통합 파이프라인 실행

### **W 9-12: 고도화, 실험, 품질 및 성능 테스트**
- 파라미터 튜닝 및 다양한 데이터셋 실험
- 품질 지표 측정(PSNR, SSIM, LPIPS)
- 하드웨어 환경별 성능 벤치마킹
- 결과 분석 및 최적화

### **W 13-16: 최종 최적화, 문서화, 발표 준비**
- 코드 리팩토링 및 최적화
- 정량적 평가 테이블 및 정성적 비교 이미지 제작
- 논문 작성 및 완성
- 최종 발표 자료 준비

---

## 🎯 성능 목표 (KPI)

| 지표 | 목표 |
|------|------|
| **메모리 감소** | VRAM 사용량 ≥ 25% 감소 |
| **렌더링 성능** | FPS ≥ 1.5× 향상 |
| **시각 품질 (PSNR)** | ≥ 28dB |
| **시각 품질 (SSIM)** | ≥ 0.90 |
| **속도-품질 트레이드오프** | Pareto frontier 최적화 |

---

## 📄 참고 자료

- **프로젝트 제안서:** `assignments/L01/Project_Proposal.md`
- **연구 논문 초안:** `assignments/L01/paper_draft.md`
- **DORA 메트릭 수집:** `assignments/L02/`

