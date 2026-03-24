---
title: "GTC 2026 Watch Party 후기"
categories:
  - Review
header:
  overlay_image: "https://deeperinsights.com/wp-content/uploads/2026/03/NVIDIA-GTC-2026-Highlights-Recap-on-Everything-You-Missed-1.png"
  overlay_filter: "0.5"
  teaser: "https://deeperinsights.com/wp-content/uploads/2026/03/NVIDIA-GTC-2026-Highlights-Recap-on-Everything-You-Missed-1.png"
tags:
  - reviews
  - RobotPolicy
  - NVIDIA
  - Cosmos
  - WorldModel
sidebar:
  nav: "docs"
toc: true
toc_sticky: true
---

> title: *How Open World Models are Powering the Next Breakthroughs in Physical AI*


GTC watch party에 참여했다. 발표 주제는 **"How Open World Models are Powering the Next Breakthroughs in Physical AI"** — NVIDIA가 Cosmos 플랫폼을 중심으로 Physical AI의 다음 단계를 어떻게 설계하고 있는지를 다루는 세션이었다. 신청해서 영어 세션을 듣는 것과 다르게 같이 듣고 해석해주시면서, 사견을 넣어주시는 세션 진행자분들의 리뷰를 들을 수 있는게 watch party의 장점이였다. 특히 현업에 있으신 분들의 다른 식견을 들을 수 있어서 좋았다.

---

## AI의 진화 방향: Generative → Agentic → Physical

![이미지](../../../assets/images/gtc/1.png)

세션은 AI의 발전 단계를 세 구간으로 나누는 것에서 시작했다.

- **Generative AI**: Chat, Content Creation — 대규모 인터넷 데이터로 학습
- **Agentic AI**: Coding Agent, OpenClaw — 대규모 도구 사용 데이터로 학습
- **Physical AI**: 자율주행, 휴머노이드 — 대규모 Physical AI 데이터로 학습



---

## Physical AI Data — 피라미드 구조

![이미지](../../../assets/images/gtc/5.png)

데이터 전략이 인상 깊었다. NVIDIA는 학습 데이터를 피라미드로 계층화한다.


여기서 Cosmos가 **Passive Synthetic Data**와 **Interactive Synthetic Data (World Models)** 를 모두 생성할 수 있는 엔진으로 등장한다. 개념 자체는 명확하지만, 시뮬레이션 품질과 다양성을 높이는 데 드는 컴퓨팅 리소스가 어마어마할 것 같다는 생각이 들었다. 
그럼에도 불구하고 physical AI를 학습시키기 위해서는 엔비디아의 방식으로 거대한 데이터셋을 만들 수 있는 기업이 없음을 알 수 있었고, 특히 엔비디아의 렌더링 엔진과 같은 게임 엔진에 대한 하드웨어 제작에 대한 노하우를 활용할 수 있는 분야를 적절히 잘 찾았다는 생각이 들었다.

---

## NVIDIA Cosmos — World Foundation Model Platform

![이미지](../../../assets/images/gtc/2.png)

Cosmos는 단순한 모델이 아니라 플랫폼으로 제시된다.

| 구분 | 구성 요소 |
|---|---|
| **Models** | Cosmos Reason 2, Cosmos Predict 2.5, Cosmos Transfer 2.5 |
| **Frameworks** | Cosmos Curator, Cosmos RL, Cosmos Evaluator |
| **Scripts** | Inference, Post-training, Cosmos Cookbook |
| **Blueprints** | VSS Blueprint, Cosmos Data Search, Physical AI Data Factory |

특히 **Cosmos Reason 2**는 Physical AI Bench에서 오픈 VLM 1위를 기록했고, Hugging Face 다운로드 600만 건 이상이라고 한다. 로봇팔을 활용한 데모를 보여주면서, understanding + prediction을 함께 수행하는 VLA 방향성이 분명히 보여주었다.

한 가지 흥미로운 생각이 들었던 건 — MCP(Model Context Protocol) 생태계와 같이 툴을 가져와 Physical AI에 붙이는 식의 개발 흐름이 가능해지지 않을까 하는 것이다. 아직 논의 수준이지만, Agentic AI → Physical AI 전환에서 자연스럽게 나올 수 있는 아키텍처 방향 같다.

---


## 정리하면서

NVIDIA가 이 분야에서 차별화되는 지점은 결국 렌더링이다. 다른 AI 가속기 회사들이 행렬 연산 속도 경쟁을 할 때, NVIDIA는 **그래픽스 파이프라인 전체를 Physical AI 데이터 생성 엔진으로 전환**하는 전략을 갖고 있다. Cosmos가 단순한 생성 모델이 아니라 World Foundation Model 플랫폼인 이유가 여기에 있는 것 같다.

다만 실제 연구자 입장에서 생각하면, 이 파이프라인을 돌리는 데 필요한 컴퓨팅 리소스가 진입장벽이 될 것 같다는 현실적인 걱정도 남는다. 시뮬레이션에서 의미 있는 데이터를 뽑아내려면 결국 거대한 인프라를 구성하거나 빌려야 하는데 그 의미는 결국 엔비디아에 종속됨을 명확하게 보여주고 있었다.

---

*GTC 2025 Watch Party, 2026년 3월*

---

## Tags

#GTC #NVIDIA #Cosmos #PhysicalAI #WorldModel #RobotPolicy #VLA
