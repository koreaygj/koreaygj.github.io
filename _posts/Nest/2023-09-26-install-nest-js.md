---
title: "[Nest.js] nest.js 설치하기 (feat.npm install --silent fail error 해결법)"
comments: true
categories:
  - nest-js
header:
  overlay_filter: "0.5"
  overlay_image: "https://camo.githubusercontent.com/c704e8013883cc3a04c7657e656fe30be5b188145d759a6aaff441658c5ffae0/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f5f746578742e737667"
  teaser: "https://camo.githubusercontent.com/c704e8013883cc3a04c7657e656fe30be5b188145d759a6aaff441658c5ffae0/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f5f746578742e737667"
tags:
  - nest-js
  - error
sidebar:
  nav: "docs"
toc: true
---

nest.js를 다운받고 프로젝트 파일을 만들어보자

## Install Nest.js

공식문서를 참고해보면 Nest 프로젝트를 시작하기 전에 Nest를 npm을 통해 다운로드 하도록 되어있다.

```bash
    # 1
    # i == install, -g == --global 전역으로 다운로드
    $ npm i -g @nestjs/cli
    # 프로젝트 이름은 마음대로 정하고 ""는 제외
    $ nest new "프로젝트 이름"
    # 2
    $ npm i -g @nestjs/cli
    $ nest new
    $ what name would you like to use for the new project? (nest-app) "프로젝트 이름 입력"

```

-g 옵션을 통해 전역으로 설치하여야지 어느 디렉토리에 가더라도 nest 프로젝트를 생성할 수 있다.
위와 비슷하게 nest new 를 입력하고 프로젝트 이름을 다시 입력하는 방식으로도 할 수 있다.
<br>

> -g 옵션을 통해 전역으로 다운로드 하기 때문에 macOS에서는 permission denied가 나타날 수 있는데 이경우 설치시에 sudo 명령어를 붙여주어야한다.

## 오류 발생

<img src="/assets/images/Nest/error.png">
위와 같이 npm install --silent가 수행되지 않는다고 뜨는 경우가 있다. 이 경우 여러가지의 방법을 찾아보았는데

### 1. Urix module문제

사실 이 module이 문제가 되는 경우가 이해가 되지 않는데 혹시 몰라서 시도해보았다.

```bash
  $ npm cache clean --force
  $ npm i -g source-map-resolve
  $ npm i -g @nestjs/cli
  $ nest new "프로젝트 이름"
```

필자의 경우에는 이방법이 전혀 먹히지 않았다. 캐시를 지우고 일부 패키지를 다시 다운받는 방식인데 이 문제가 아니였다.

### 2. KT망의 문제(?)

23.01부터 지속적으로 한국의 커뮤니티에서 지적된 것이 KT망을 사용하는 경우에 ts-jest(jest의 ts모듈)이 설치되지 않는 문제가 있다고 깃허브 issue에서 찾을 수 있었다. 이경우에는

```bash
  # npm mirror 를 통해 모듈 설치하기 위해
  $ npm config set registry https://registry.npmjs.cf/
  # nestJS install & project build
  $ npm i -g @nestjs/cli
  $ nest new "프로젝트 이름"
  # 설치완료 후 원래의 주소로 변경
  $ npm config set registry https://registry.npmjs.org/
```

### 3. node.js의 버전 문제

node의 버전이 지원하지 않는 경우에도 이러한 오류가 생길 수 있다.

```bash
  #npm 버전 확인
  $ npm -v
  #node 버전 확인
  $ node -v
  # node 버전 관리용 nvm 설치
  $ npm i -g nvm
  # .zshrc에 환경변수 추가 (/.bash_profile, /.profile, ~/.bashrc, ~/.nvm)동일하게
  $ vim ~/.zshrc
  # 파일 맨 아래쪽에 아래 내용을 복사해서 저장
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
  # 수정된 부분 적용
  $ source ~/.zshrc
  # node LTS버전 설치
  $ nvm install --lts
```

이후 node 버전을 확인해보면 LTS버전이 설치된 것을 볼 수 있다. 필자의 경우에는 이과정을 통해 다시 시도해보아도 같은 오류가 표시되었다.

<h3>4. <span style="background-color:yellow">권한문제(해결!!!)</span></h3>

```bash
  # ~/.npm파일과 ~/.config의 소유자 USER로 변경
  sudo chown -R $USER:$GROUP ~/.npm
  sudo chown -R $USER:$GROUP ~/.config
  npm i -g @nestjs/cli
```

이전 3가지의 방법이 모두 통하지 않아서 골치 아플때 github Issue에서 설명도 없이 권한을 변경하는 코드를 답변으로 적어준 것을 보았고 이를 통해서 다시 설치하고 시도하니 결과적으로 성공하였다.

<img src="/assets/images/Nest/success.png">

### 참고 출처

1. [nest.js 공식 가이드](https://docs.nestjs.com/)
2. [github.com 관련 이슈](https://github.com/nestjs/nest-cli/issues/153)
3. [인프런 NestJS 프로젝트 생성 실패](inflearn.com/questions/779041/solved-nestjs-프로젝트-생성-실패)
4. [github.com KT망 이슈](https://github.com/kulshekhar/ts-jest/issues/3992)
