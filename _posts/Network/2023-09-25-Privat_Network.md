---
title: "[Network]Virtual Private Network(VPN) - IPsec VPN"
categories:
  - Network
header:
  overlay_image: https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80
  overlay_filter: "0.5"
  teaser: https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80
tags:
  - OS
  - CS
  - Network
sidebar:
  nav: docs
toc: true
---

IPsec VPN에 대해 알아보자...

VPN은 Virtual Private Network의 약자로 인터넷과 암호화 기술을 사용하여 구축한 가상의 Private Network이다. 이말은 VPN에 대해 알아보기 전에 Private Network에 대해 이해해야 한다.

# PN(Private Network)

## 회사 내의 네트워크

<img src="/assets/images/Network/VPN/Private%20Network.png">

우리가 아는 대부분의 회사들이 이러한 구조를 지니고 있고 보안을 위해서 내부망만을 사용하는 경우에는 인터넷에 연결되어있는 PC가 내부망으로 들어오지 못하게 막아 놓는다. 이말은 즉 물리적으로 먼 거리에 있는 경우에는 회사에 있는 서버에 접근할 수 없다.

예를 들어 서울에 있는 kakao가 서울에 있는 본사에서 두번째 회사로 제주도로 확장하려고 한다면, 서울의 본사의 내부망에 있는 서버를 제주도에서 사용하게 하기 위해서는 우리가 흔히 사용하는 랜선을 서울에서 제주도까지 연결해야 하는 경우가 생긴다.

이경우 kakao는 여러가지 방식이 있겠지만 간략히 두가지의 방식을 생각할수 있다.

1. 회사에서 자체적으로 랜선을 서울에서 제주도까지 연결하는 방식
2. 서울에서 제주도까지의 통신망을 확보하고 있는 통신사의 통신망의 일부를 독점적으로 사용하는 방법
   첫번째 경우에는 kakao가 통신망을 공사한다는 것은 불가능에 가깝고 생각하기도 어려운 비용이 발생할 것이다. 두번째 방식은 좀 더 현실적이지만 이또한 적은 돈이 들어가는 것이 아니고 통신 속도가 느리다는 큰 단점이 존재한다.

> 이때 비용을 절감시키고 인터넷을 이용하는 소프트웨어적인 해결방안으로 떠오른 것이 바로 `VPN`이다. 그중 IPsec VPN에 대해 자세히 알아보자

# VPN(Virtual Private Network)

## 네트워크

<img src="/assets/images/Network/VPN/VPN.png">

앞서 내부망 그림에서와 비슷하게 회사의 내부망이 생겼을때 만약 재택근무자가 생기게 되면 PC5와 같은 내부망 ip인 3.3.3.-과 같은 형식이 아닌 9.9.9.9의 외부ip의 접근을 허용해야 하는 경우가 생긴다.

이러한 부분을 해결하기 위해서 회사가 VPN을 도입하기로 한다면

> 1. Router부터 VPN을 지원하는 Router로 바꾸어야 한다. 이러한 라우터를 SG(Security gateway)라고 한다.
> 2. 재택근무를 하는 PC에 VPN Client를 설치하여야 한다.

이러한 과정후에는 SG와 VPN Client가 설치된 PC간에 `터널링`이 연결되었다고 표현한다.

## 터널링

터널링이 되었을때 VPN Client 가 설치되었을때 사용자의 컴퓨터에서 어떠한 역할을 하는지 알아보자

### 1.일반적인 패킷 송신

<img src="/assets/images/Network/VPN/User_computer.png">

이경우에는 `Process -> socket -> TCP/IP -> Driver -> NIC`의 과정으로 이루어지는데 이과정에서 생성되는 패킷을 보면,

<img src="/assets/images/Network/VPN/Usual_packet.png">

TCP/IP를 지날때 패킷의 내용을 암호화하고 해더를 추가한다. 그때 패킷의 헤더에 출발지의 IP Address와 도착지의 IP Address를 저장하여 패킷과 결합한다.

### 2. VPN을 통한 송신과정

<img src="/assets/images/Network/VPN/User_computer.png">

VPN의 경우는 일반적인 경우와 달리 Virtual NIC(Network Interface Card)를 구성한다. 이때 OS는 실제로는 존재하지 않으나, 실제로 존재하는 네트워크 카드라고 생각하게된다. 이후 유저의 컴퓨터가 인터넷에 패킷을 송신할때는 `Process -> Socket -> TCP/IP -> virtural NIC -> IP -> Driver -> NIC -> Internet`으로 연결된다. 이 과정에서 생성되는 패킷을 분석해보면,

<img src="/assets/images/Network/VPN/PS1.png">

- Inner IP
  위와 같은 과정중에 일반적으로 TCP를 지나면서 데이터의 앞에 TCP가 결합되고, 이후 Virtual NIC에 도착했을때 TCP와 데이터를 암호화(캡슐화) 시키고 그앞에 IP 헤더를 결합시킨다. 이 헤더에는 출발지의 IP Address와 도착지의 IP Address 정보가 포함되어있다.
  > 출발지의 IP: 임의로 할당된 가상의 내부망 IP
  > <br>
  > 도착지의 IP: 실제 내부망에 도착해야하는 IP

<img src="/assets/images/Network/VPN/PS2.png)">

- Outer IP
  이러한패킷이 다시 IP -> Driver 를 거쳐서 실질적인 NIC(Network Interface Card)로 도착했을때 앞에서와 마찬가지로 IP헤더, TCP, 데이터를 암호화(캡슐화)하고 두번째 IP 헤더를 붙인다.
  > 출발지 IP: 실제 컴퓨터의 IP
  > <br>
  > 도착지 IP: 실제 내부망의 SG IP

### VPN 패킷

<img src="/assets/images/Network/VPN/Packet.png">

결과적으로 완성된 패킷을 보면 TCP, 데이터, IP Header(Virtual NIC에서 붙인)가 암호화(캡슐화)되어있는 것을 볼 수 있다. 이렇게 완성된 패킷은 결과적으로 내부망의 SG(Security Gateway)로 향하게 된다. 앞서 본 그림을 다시보면,

### 도착

<img src="/assets/images/Network/VPN/VPN.png">

SG에 도착한 패킷의 IP헤더는 도착했으니 버려지고 암호화된 부분은 1차적으로 풀게되면 IP(Inner)와 암호화된 TCP, 데이터를 보고 SG는 이패킷의 최종 목적지로 전송되어진다.

> SG: Outer IP Header 제거후 패킷 해석후 Inner IP Header의 도착지로 전송
> <br>
> Server1: Inner IP Header 제거후 패킷 해석

## 결과

여러가지 장점을 가지는 VPN이지만 위에서 말한듯이 회사가 자체적인 내부망을 사용하면서 외부의 사용자를 한정적으로 내부망에 접근가능하게 할 수 있다. 이때 Inner IP 또한 암호화, 캡슐화 되기때문에 인터넷상에서 패킷을 가로채기 당해도 내부망의 IP가 유줄될 가능성이 적다.

### 참고 출처

1. [널널한 개발자 유투브](https://www.youtube.com/@nullnull_not_eq_null/)
2. [VPN velog](https://velog.io/@dldhk97/VPN)
