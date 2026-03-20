# LightGauss Optimizer  
### 동적 인체 렌더링 최적화를 위한 3D Gaussian Splatting 경량화 및 샘플링 기법 연구

---

## 1. Background

최근 **3D Gaussian Splatting** 기반 뷰 합성 기법은 실시간 렌더링과 높은 시각적 품질을 동시에 달성하며 주목받고 있다.  
특히 *3D Gaussian Splatting for Real-Time Radiance Field Rendering (SIGGRAPH 2023)*은 기존 NeRF 대비 매우 빠른 렌더링 성능을 보여주었다.

이후 확장된 방식인 **GPS-Gaussian**은 사람 중심 3D 재구성에서 높은 품질을 제공하지만 다음과 같은 한계를 가진다:

- 수백만 개 이상의 Gaussian → 높은 VRAM 사용량
- 모바일/VR 환경에서 실시간 렌더링 어려움
- 비효율적인 전체 영역 균일 처리

기존 연구에서는 다음과 같은 방법이 제안되었다:

- Density 기반 Gaussian pruning
- LOD(Level of Detail) 기반 최적화
- Importance sampling 기반 렌더링

하지만  
> **Pruning + Importance Sampling을 통합한 end-to-end 최적화 구조는 부족하다.**

---

## 2. Research Questions & Hypotheses

### RQ1. Gaussian pruning은 렌더링 성능을 얼마나 개선하는가?

- H1-1: 중요도 기반 pruning은 ≥50% 메모리 감소를 달성할 수 있다.
- H1-2: pruning 이후에도 PSNR 30dB 이상 유지 가능하다.
- H1-3: 학습 기반 pruning이 단순 threshold 방식보다 품질 유지에 유리하다.

---

### RQ2. Importance sampling은 렌더링 효율을 향상시키는가?

- H2-1: 중요 영역 집중 샘플링은 동일 샘플 수 대비 품질을 향상시킨다.
- H2-2: 에러 기반 sampling은 균일 샘플링보다 SSIM이 높다.
- H2-3: 장면 복잡도에 따라 최적 sampling 전략이 달라진다.

---

### RQ3. Pruning + Sampling 통합 시 시너지 효과가 존재하는가?

- H3-1: 두 기법 결합 시 FPS가 ≥2× 향상된다.
- H3-2: pruning으로 인한 정보 손실을 sampling이 보완한다.
- H3-3: 통합 파이프라인이 더 나은 speed-quality tradeoff를 가진다.

---

## 3. Key Performance Indicators (KPI)

### 3.1 Memory Efficiency
- VRAM 사용량 ≥ **50% 감소**
- Gaussian 개수 감소율
- 모델 저장 용량 감소

### 3.2 Rendering Performance
- FPS ≥ **2× 향상**
- Rendering latency 감소
- Throughput 증가

### 3.3 Visual Quality
- PSNR ≥ **30dB**
- SSIM ≥ **0.95**
- LPIPS 최소화

### 3.4 Analysis Metrics
- Pruning ratio vs Quality
- Sampling density vs Performance
- Pareto frontier (Speed vs Quality)

---

## 4. Scope

본 연구는 다음 영역에 집중한다:

- Gaussian Splatting 기반 렌더링 최적화
- 3D Human Reconstruction
- 메모리 효율적인 3D Representation

적용 분야:
- VR / AR
- Mobile Rendering
- Real-time Graphics

---

## 5. Method Overview

### Pipeline

Input (GPS-Gaussian)
↓
[1] Importance Estimation
↓
[2] Gaussian Pruning
↓
[3] Importance Sampling
↓
[4] Rendering
↓
Evaluation (FPS / PSNR / SSIM)


---

### Core Ideas

#### Importance Score
- 렌더링 기여도 기반 계산
- opacity / gradient / visibility 활용

#### Pruning
- low-importance Gaussian 제거
- adaptive threshold 적용

#### Sampling
- high-detail 영역 집중 샘플링
- error-driven weighting

---

## 6. Dataset

### Primary Dataset
- THuman2.0

### Why THuman2.0?
- 고품질 3D human 데이터
- 다양한 pose 및 shape 포함
- Gaussian 기반 실험에 적합

### Future Plan
- 추가 human dataset 적용
- synthetic / augmented data 활용
- generalization 성능 검증

---

## 7. Open Issues

1. Pruning threshold 결정 방식 (heuristic vs learning-based)
2. Importance score 정의 (opacity vs gradient vs hybrid)
3. Sampling 전략 (static vs adaptive)

---

## 8. Expected Contributions

- Gaussian pruning + importance sampling 통합 파이프라인 제안
- 메모리 효율성과 렌더링 성능 동시 개선
- real-time 환경에서 적용 가능한 최적화 방법 제시