---
title: "[구름톤 트레이닝 풀스택 3기] Final project(Polaroad) 기획 및 진행"
categories:
  - Review
header:
  overlay_image: "https://velog.velcdn.com/images/narcoker/post/79edcb57-7899-49b7-8ad2-cfab1f2f2576/image.png"
  overlay_filter: "0.5"
  teaser: "https://velog.velcdn.com/images/narcoker/post/79edcb57-7899-49b7-8ad2-cfab1f2f2576/image.png"
tags:
  - reviews
  - project
  - bootcamp
  - 구름톤
  - 9oormTraining
sidebar:
  nav: "docs"
toc: true
toc_sticky: true
---

# 구름톤 카카오 연계 프로젝트 기획 및 진행

구름톤 풀스택의 마지막 프로젝트는 카카오 X 구름 연계 프로젝트로 진행되었다. `23.02.27~23.04.22`일까지 약 56일간 기획, 개발, 마무리 발표까지 이어지는 기간이였다.  
이전 프로젝트와 다르게 자유 주제로 이루어지는 만큼 기획단계에서 매우 여러가지의 아이디어가 오고 갔다. 또 이전의 프로젝트 경험을 토대로 기획단계에 회의를 정말 많이 진행했다.

<div class="callout callout-note">
  <div class="callout-header">
    📝 프로젝트 요구사항  
  </div>
  <div class="callout-content">
  1. 카카오 API 활용<br>
  2. 카카오 크램폴린 활용 (선택)<br>
  </div>
</div>

## 기획

### 브레인 스토밍

우리 팀이 개발할 수 있는 능력을 가지고 다른 팀들과 남다른 프로젝트를 진행하기 위해서는 아이디어가 무엇보다 중요하다고 우리 팀은 생각했다. 그래서 최대한 많은 아이디어를 내보고 이야기를 나눴다. 그 방식중 하나로 특히한 브레인 스토밍을 진행했다.

나를 포함한 우리 팀원들이 아이디어를 냈을 때 아쉬운 부분이나 좋은 부분들에 대해서 직설적으로 이야기하는 것에 대해 어려움을 느꼈다. 그래서 주제 선정을 위해 아이디어를 내는 것과 아이디어에 대해 비판하는 것이 부족했다.

#### 노션 & 문서 활용

그래서 본인 만의 아이디어를 하나의 노션페이지에 각자 정리 하기로 했다. 진행 방식은 아래와 같이 진행되었다.

<div class="callout callout-tip">
 <div class="callout-header">
  🔥 진행 방식
  </div>
  <div class="callout-content">
  1. 기획: 각자 생각하는 아이디어에 대해 적고 구체화 시키기(컨셉, 차별점, 비즈니스 모델)<br>
  2. 리뷰: 모든 기획 페이지들을 돌아가면서 아쉬운 점이나 보강해야 할 부분들 또는 좋은 부분들에 대해 comment달기<br>
  3. 분류: 최종후보, 보류, 탈락 3단계로 아이디어 페이지들을 정리<br>
  4. 최종 결정: 모든 팀원들이 생각하는 괜찮은 아이디어를 결정<br>
  </div>
</div>

이후 우리 팀이 생각한 수많은 아이디어가 페이지에 정리되었고, 각자의 아이디어에 대해서 최대한 부정적으로 리뷰를 달려고 노력했다. (나도 그랬지만 팀원들이 아이디어에 대해서 아쉬운점을 리뷰로 다는 것을 힘들어해서 내가 최대한 강하게 리뷰하려고 노력했다.)

<figure>
  	<strong>[브레인 스토밍이 진행된 후에 사진]</strong>
	<img src="https://i.imgur.com/APJKQen.png" alt="브레인 스토밍 사진"/>
</figure>

<figure>
  	<strong>[아이디어 상세페이지]</strong>
	<img src="https://i.imgur.com/AeKCFOm.png" alt="아이디어 상세페이지"/>
</figure>
  
이방식을 통해 이전과 다르게 우리가 생각할 수 있는 모든 아이디어들을 정리할 수 있었고, 각자의 페이지를 통해 장단점을 확인하고 최종 아이디어에 대한 기획을 자연스럽게 진행할 수 있었다.
### 아이디어
브레인 스토밍을 통해서 얻은 아이디어 중에서 우리가 최종 후보로 올라왔던 것들은 아래와 같았다.

<div class="callout callout-abstract">
 <div class="callout-header">
    ✅ 최종 후보 아이디어 목록
  </div>
  <div class="callout-content">
  1. 위치 기반 도보 여행 경로 공유<br>
  2. 카카오 독스(채팅방에 있는 인원들끼리 공유할 수 있는 웹 md)<br>
  3. 암표 방지 서비스<br>
  4. 개발자 간의 커피챗 플랫폼<br>
  5. 음식 재료 관리 + 레시피 추천<br>
  6. 카카오 캠퍼스<br>
  </div>
</div>

각각의 아이디어들이 장단점이 있었지만 우리 팀은 `위치 기반 도보 여행 경로 공유` 를 주제로 잡았다.
그중 가장 큰 이유가 카카오 api를 사용해야 하는 프로젝트 특성상 `카카오 맵 api`를 사용하기가 가장 편리하고 유리하다고 생각한 부분이 있었다.
또한 우리팀이 개발가능한 난이도와 레퍼런스가 존재하는지도 중요한 선정 기준이었다.

그래서 우리는 브레인스토밍에 이어서 아이디어를 구체화시키는 작업을 시작했다.

<figure>
	<strong>[아이디어 구체화]</strong>
	<img src="https://i.imgur.com/sOb9Lmw.png" alt="아이디어 구체화"/>
</figure>

### 설계

정해진 아이디어를 기반으로 컨셉을 구체화시킨 후에 설계를 하기 시작했다. 컨셉의 특성상 앱과 웹에 대한 와이어 프레임을 완성시켜야 하고, 사진을 어디에 저장하고 불러올지에 대한 설계 그리고 CI/CD를 구성하는 방식을 구체화시키기 위해 아키텍쳐까지 구성하였다.

<div class="callout callout-abstract">
 <div class="callout-header">
    ✅ 설계 고려 사항
  </div>
  <div class="callout-content">
  1. 웹과 앱에 대한 와이어 프레임<br>
  2. 컨셉에 따른 기능 명세 <br>
  3. 사진 저장 로직, CI/CD 로직을 고려한 아키텍쳐 설계<br>
  </div>
</div>

#### 와이어 프레임

<iframe
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/kIPnzHVxM2qoyIRhFJONNM/PolaRoad?node-id=0-1&t=w8Y5RMxyzYiKzuVh-1"
  allowfullscreen>
</iframe>

앱과 웹의 와이어 프레임은 모두 피그마를 통해서 설계했다. 디자이너가 없는 만큼 완성도는 떨어지지만 프론트 팀이 참고해서 만들 수 있을 정도로 설계했고, 앱은 유저의 flow에 따라 설계했다. 그리고 디자인의 레퍼런스는 `airbnb`,`야놀자`등 여러가지의 여행 관련된 어플이나 웹을 참고해서 만들었다.

#### 기능 명세

[polaroad-기능 명세 notion 링크](https://goorm.notion.site/043301aaff404b29b8d172ced9d86f14)
기능 명세나 api 설계 같은 경우는 우리 팀의 노션페이지에 정리해놓고 모두가 볼 수 있도록 하였다. 그래서 기능 명세는 큰 기능들과 작은 기능들까지 모두 포함해서 작성하였다. 이를 바탕으로 jira의 타임라인을 작성하고 계획했다.

#### API 설계 & ERD

API와 ERD 관련 회의는 팀 모두가 참여했지만 주로 백엔드 팀장분이 주도해서 진행하게 되었다. 진행하면서 어느 정도 수정해야 하는 부분이 있었지만 그래도 백엔드 팀장분이 최대한 자세하게 진행해줘서 감사했다.

api 설계와 ERD에 대한 내용은 발표 canva링크를 통해 확인할 수 있다.

<iframe
  width="100%"
  height="450"
  src="https://dbdiagram.io/d/Copy-of-DDravel-ERD-65e674eccd45b569fb842d6d"
  allowfullscreen>
</iframe>

#### 아키텍쳐(기획 및 결과)

![](https://i.imgur.com/z4JEFMk.png)
우리팀의 최종 아키텍쳐는 이와 같이 설계되었다. 이상적인 프로젝트라면 카카오 트램폴린만을 사용해서 배포할 수 있는 구조로 이루어져야 했지만, 프론트의 경우 CI/CD가 구축하기 어렵다는 점과 지속되는 오류로 인해 `S3버킷`을 활용하였다.  
그리고 여행의 경험을 공유하는 `이미지와 프로필 이미지`를 저장하기 위해 별도의 S3버킷을 활용했고, 백엔드의 DB에는 주소만 저장하는 방식으로 진행했다.  
백엔드에서는 구글 OAuth 문제로 인해 ec2에 서버를 클론해서 저장해 놓고 OAuth시에 ec2주소를 사용하는 방식으로 해결하였다. 좋은 해결 방법은 아니였지만, 크램폴린을 활용하기 위해서는 어쩔 수 없는 방안이였다.

## 진행

우리 팀은 이전 프로젝트에서 진행했던 방식을 어느 정도 고수하면서 진행하였다. 기본적으로 PR을 넣어서 머지하고, 데일리 스크럼을 통해서 현재 진행도를 공유했다.  
나는 프론트 팀장으로 작업했고 그래서 프론트의 진행 방식을 중점으로 리뷰하겠다. 특히 코드 관리 부분은 프론트에 관해 이야기 하려고 한다.

### 코드 관리

[polaroad - 프론트 Github 링크](https://github.com/java-is-coffee/Front-PolaRoad)
[polaroad - 백엔드 Github 링크](https://github.com/java-is-coffee/Back-PolaRoad)

우리 팀은 프론트와 백엔드의 각각의 레포를 나누어서 활용했고, 각각의 Git Convention을 통해서 commit을 통일성 있게 작성하였다.

[polaroad - 프론트 git convention](https://github.com/java-is-coffee/Front-PolaRoad/blob/main/docs/commit-convention.md)

그리고 우리는 각자의 기능에 맞는 이슈 번호로 branch를 파고 작업이 모두 끝나고 나서야 develop 브런치에 병합하는 git flow 전략을 통해서 작업하면서, git action을 활용해 develop브런치에 병합했을때 오류가 뜨는지 확인하고 main 브런치에 병합시에 배포되도록 했다.(본래는 develop 브런치에 병합되어도 배포가 되도록 했지만, 멘토님이 분리하는게 좋아보인다고 말씀해주셔서 수정하게 되었다.)

### CI/CD

이전 프로젝트와 비슷하게 React를 활용하여서 CI/CD 구축은 저번 프로젝트와 동일하게 진행되었다. 그러나 이미지 저장을 위한 S3버킷을 사용하게 되면서 이제 여러가지 환경변수들이나 secret들이 중간에 들어오면서 yaml 파일이 수정되었다.

#### develop 브런치용 workflow

<iframe frameborder="0" scrolling="no" style="width:100%; height:814px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fjava-is-coffee%2FFront-PolaRoad%2Fblob%2Fmain%2F.github%2Fworkflows%2Fbuild-and-test.yml&style=github-dark-dimmed&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>

#### main 브런치용 workflow

<iframe frameborder="0" scrolling="no" style="width:100%; height:1003px;" allow="clipboard-write" src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fjava-is-coffee%2FFront-PolaRoad%2Fblob%2Fmain%2F.github%2Fworkflows%2Fdeploy.yml&style=github-dark-dimmed&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></iframe>

### PR & 코드리뷰

저번 프로젝트때 내 생각과 다르게 github를 잘 활용 못했던 느낌이 강했었는데 이번에는 최대한 활용하려고 노력했다. 특히 PR과 코드리뷰는 정말 중요하다고 느꼈다. 그래서 좀 더 상세하게 작성하고 코드에 대한 리뷰도 좀 더 자세하게 하려고 노력했다.  
그리고 PR에 `라벨`과 `담당자`를 넣도록 수정했는데 이는 PR 목록을 볼 때 가독성을 많이 높여주었다. 그래서 향후 프로젝트에서도 무조건 도입할 생각이다.

#### PR 목록에 담당자와 라벨 적용한 모습

![](https://i.imgur.com/N2H7z4K.png)

#### 코드리뷰시에 코드를 직접 태그해서 보여주는 방식

![](https://i.imgur.com/7utXiEn.png)

## discord 활용

우리 팀은 이전과 같이 discord를 활용해서 협업을 진행했고, 개발중에는 무조건 discord에 참석해서 진행하였다. 그래서 만약 문제가 생겼을 떄 개인 dm이나 개별적으로 통화할 수 있게 하였다. 그리고 담당자가 없을때 제보 채널을 통해서 트러블 슈팅 가능하도록 했다.

#### 디스코드 채널 구성

![](https://i.imgur.com/1Uq8qRO.png)

#### 제보 채널 활용

![](https://i.imgur.com/LBE563J.png)

향후 이런 방식들에 장단점이나 구름톤 트레이닝에 관한 주관적인 회고는 마무리 회고에서 이어서 진행하겠다.

## 참고 자료

[자바는 커피조 - notion 링크](https://goorm.notion.site/0469450766194798b4a4bd6bcc5e3611)  
[polaroad - 피그마 링크](https://www.figma.com/design/kIPnzHVxM2qoyIRhFJONNM/PolaRoad?node-id=0-1&t=w8Y5RMxyzYiKzuVh-1)  
[polaroad - 기획발표 canva 링크](https://www.canva.com/design/DAF-6Br0xt0/wOrRm3ddOIi28Ha0OCOFQQ/edit?utm_content=DAF-6Br0xt0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)  
[polaroad - 마지막발표 canva 링크](https://www.canva.com/design/DAGCu1_M-Hc/WfLZpa59THkfTUCmdg6A5Q/edit?utm_content=DAGCu1_M-Hc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)  
[polaroad - ERD 다이어그램 링크](https://dbdiagram.io/d/Copy-of-DDravel-ERD-65e674eccd45b569fb842d6d)
[polaroad - 프론트 Github 링크](https://github.com/java-is-coffee/Front-PolaRoad)  
[polaroad - 백엔드 Github 링크](https://github.com/java-is-coffee/Back-PolaRoad)
