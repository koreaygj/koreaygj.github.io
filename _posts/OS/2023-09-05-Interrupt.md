---
title: "[OS] Interrupt란?"
categories:
  - CS
header:
  overlay_image: "https://miro.medium.com/v2/resize:fit:1300/format:webp/0*o88-IjqpciC1Cr2r.png"
  overlay_filter: "0.5"
  teaser: "https://miro.medium.com/v2/resize:fit:1300/format:webp/0*o88-IjqpciC1Cr2r.png"
tags:
  - OS
sidebar:
  nav: "docs"
toc: true
toc_sticky: true
---

CPU에 많은 영향을 주는 Interrupt에 대해 알아보자

## Interrupt

인터럽트는 사전적 의미로 "끼어들다", "방해하다"의 의미를 가지고 있다. CPU이 프로그램을 실행시키고 있는 과정에서 장치의 예외사항이 발생하여 처리가 필요한 경우에 CPU에게 우선적으로 처리하도록 하는 것을 `인터럽트`라고 한다.

### 종류

인터럽트는 크게 외부 인터럽트, 내부인터럽트, 소프트웨어 인터럽트로 나뉜다.

#### 외부 인터럽트

- 전원 이상 인터럽트(Power Fail Interrupt): 정전이나 파워이상
- 기계 착오 인터럽트(Machine Check Interrupt): CPU의 기능오류
- 외부 신호 인터럽트(External Interrupt): I/O 장치가 아닌 오퍼레이터나 타이머에 의해 의도적으로 프로그램이 중단된 경우
- 입출력 인터럽트(I/O Interrupt): 입출력장치가 데이터 전송을 요구하거나 전송이 끝나 다음 동작이 수행되어야 하거나 입출력 데이터에 이상이 있는 경우

#### 내부 인터럽트

- CPU 내부에서 자신이 실행한 명령이나 CPU의 명령 싱행에 관련된 모듈이 변화하는 경우 발생
- Trap 또는 exception이라도 함
- 프로그램의 오류에 의해 생기는 인터럽트
- 프로그램 검사 인터럽트(Program Check Interrupt)
  - Division by zero
  - Overflow/Underflow
  - 기타 Exception

#### 소프트웨어 인터럽트(SVC: SuperVisor Call)

- 사용자가 프로그램을 실행시키거나 감시프로그램(Supervisor)을 호출하는 동작을 수행하는 경우
- 소프트웨어 이용중 다른 프로세스를 실행시키면 시분할 처리(CPU의 처리시간을 세분화하여 이용하는 방식)를 위해 자원 할당 등의 동작이 수행된다.
- SuperVisor Call: System call을 수행하기 위한 CPU 명령어
- System Call: 운영체제가 제공하는 서빗즈에 대한 프로그래밍 인터페이스
  - 사용자 프로세스가 운영체제의 서비스를 요정하기 위해 커널의 함수를 초훌하는 것

### Interrupt 우선순위

여러장치에서 동시에 인터럽트가 발생하거나 인터럽트 서비스 루틴 수행 중 인터럽트가 발생했을 경우 우선순위를 따져서 처리한다.

`전원 이상` > `기계 착오` > `외부 신호` > `입출력(I/O)`> `명령어 잘못` > `프로그램 검사` > `SVC(SuperVisor call)`

일반적으로 하드웨어 인터럽트가 소프트웨어 인터럽트보다 우선 순위가 높고, 외부 인터럽트가 내부 인터럽트보다 우선 순위가 높다.

### 인터럽트 우선순위 판별 방식

- #### 소프트웨어적인 방법(Polling)
  인터럽트 요철 플래그를 차례로 비교하여 우선순위가 가장 높은 인터럽트 자원을 찾고, 이에 해당하는 인터럽트 서비스 루틴을 수행한다.
  속도에 따른 장치에 높은 등급을 부여한다.
  - 장점
    우선순위의 변경이 쉽다.
    회로가 간단하고 융통성이 있고 별도의 하드웨어가 필요없다.
  - 단점
    많은 인터럽트가 존재할때 하드웨어적인 방법에 비해 속도가 드리다.
- #### 하드웨어적인 방법(Vectored Interrupt)
  인터럽트를 요청할 수 있는 장치와 CPU사이에 장치번호를 식별할 수 있는 버스를 직렬/병렬로 연결한다.
  인터럽트 백터는 인터럽트가 발생한 장치가 실행될 순서에 대한 정보이다.
  - 장점
    별도의 소프트웨어 없이 하드웨오로 처리되므로 속도가 빠르다.
  - 단점
    회로가 복잡하고 융통성이 없다.
    소프트웨어적인 방법에 비해 비경제적이다.

`Daisy Chain`  
 인터럽트가 발생하는 모든 장치를 하나의 직렬 회선으로 연결한다. 우선순위가 높은 장치를 상위에 두고 우선순위 차례대로 배치한다.

`병렬(Parallel) 우선순위 부여 방식`  
 인터럽트가 발생하는 모든 장치를 하나의 병렬 회선으로 연결한다.
각 장치별 우선순위를 판별하기 위한 Mask register에 bit를 설정한다.
Mask register상에 우선순위가 높은 서비스 루틴중 우선순위가 낮은 bit들을 비활성화 시킬 수 있다. 우선순위가 높은 인터럽트는 낮은 인터럽트 수행중에도 우선 실행된다.

### 참고 출처

1. [널널한 개발자 유투브](https://www.youtube.com/@nullnull_not_eq_null/)
2. [위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/)
3. [지식잡식 블로그](https://raisonde.tistory.com/entry/%EC%9D%B8%ED%84%B0%EB%9F%BD%ED%8A%B8Interrupt%EC%9D%98-%EA%B0%9C%EB%85%90%EA%B3%BC-%EC%A2%85%EB%A5%98)
4. [nnnyeong.log](https://velog.io/@nnnyeong/OS-%EC%9D%B8%ED%84%B0%EB%9F%BD%ED%8A%B8-Interrupt)
