---
title: "[자료구조]해시 테이블(python)"
comments: true
categories:
  - CS
header:
  overlay_color: "#e9dcbe"
  overlay_filter: "0.5"
  overlay_image: "https://plus.unsplash.com/premium_photo-1681810994162-43dbe0919d3f?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  teaser: "https://plus.unsplash.com/premium_photo-1681810994162-43dbe0919d3f?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
tags:
  - data_structure
  - hash
  - hash-table
  - python
sidebar:
  nav: "docs"
toc: true
---

# 해시테이블

## 해시테이블이란?

> 해시 테이블은 **(Key, Value)**로 **데이터를 저장하는 자료구조 중 하나**로 빠르게 데이터를 검색할 수 있는 자료구조입니다.
> 해시 테이블은 **각각의 Key에 해시함수를 적용해 배열의 고유한 index를 생성**하고, 이 index를 활용해 값을 저장하거나 검색합니다. 여기서 실제 값이 저장되는 장소를 버킷 또는 슬롯이라고 합니다.

- [*] 이러한 특성으로 <span style="background-color:#fff5b1"> 해시테이블의 평균 시간 복잡도는 O(1) </span> 입니다.

## 해시 함수

> 임이의 길이를 갖는 데이터를 고정된 길이의 데이터로 매핑하는 함수입니다.  
> 매핑전 원래 데이터릐 값을 key, 매핑 후 데이터의 값을 Hash Value 또는 Hash Code라고 하며, 키와 값으로 매핑되는 과정을 Hashing(해싱)이라고 합니다.

![](https://i.imgur.com/87rUb1j.png)

## 대표적인 해싱 함수

### 나눗셈 법(Division Method)

: 함수를 적용하고자 하는 값을 해시 테이블(N)의 크기로 나눈 나머지를 해시값으로 사용하는 방법 (N을 소수로 선택하면 더 좋은 성능)

> $h(k) = k \mod N$

### 자리수 접기(Digit Folding)

: 키의 숫자들을 일정한 길이로 나누고, 각 부분을 더한 후 해시 테이블의 크기로 나눈 나머지를 해시값으로 사용하는 방법

> k = 123456789 N(해시 테이블 크기) = 1000
> $123 + 456 + 789 = 1368 \mod  1000 = 368$

### 곱셈법(Multiplication Method)

: 키에 특정 상수를 곱하고, 소수점 이하 부분을 사용하여 해시값을 생성하는 방법

> key = k, N(테이블 크기)
> $kA$의 소수점 이하 부분을 구함: $fractional_{part}=k×A−⌊k×A⌋
  해시값을 구함: $h(k)=⌊N×fractional_{part}⌋$
> 일반적으로 $A=(\sqrt5​−1)/2​$ (골든 레이시오) 사용.

### 중간 제곱(Mid-Square)

: 키를 제곱하고, 결과 값의 중간 부분을 사용하여 해시값을 생성하는 방법입니다.

> 키 $k=1234$와 해시 테이블 크기 $N=1000$이 주어졌을 때:
> 키를 제곱함: $k^2 = 1234^2 = 1522756$
> 결과 값의 중간 부분을 선택: 중간 3자리 227
> 해시 테이블 크기로 나눈 나머지를 구함: $h(k)=227 \mod 1000=227$

## 해시 충돌

다른 키값을 해시 함수를 돌렸을때 같은 해시 값이 나오는 경우를 해시 충돌이라고 합니다.

### 충돌 해결 - 개방 주소법(Open Addressing)

> 특정 버킷에서 충돌이 발생하면, 비어있는 버킷을 찾아 저장(해시 테이블 전체를 열린 공간으로 가정) 해시 테이블에서 비어있는 공간을 찾는 것을 조사(probing)이라고 합니다.

#### 선형 조사(Linear Probing)

> 선형 조사법은 충돌이 발생한 곳에서 다음 벜시이 비어있는 곳이 나올 때까지 계속해서 조사하는 방법입니다. 테이블의 끝에 도달하는 경우 처음으로 돌아갑니다.

```python
class LinearProbing:
    def __init__(self, size):
        self.M = size  # 해시 테이블의 크기 설정
        self.a = [None] * size  # 해시 테이블의 키 저장 배열
        self.d = [None] * size  # 해시 테이블의 데이터 저장 배열

    def hash(self, key):
        return key % self.M  # 나눗셈 해시 함수

    def put(self, key, data):
        initial_position = self.hash(key)  # 초기 위치 계산
        i = initial_position
        j = 0
        while True:
            if self.a[i] is None:  # 비어 있는 경우, 키와 데이터 삽입
                self.a[i] = key
                self.d[i] = data
                return
            if self.a[i] == key:  # 키가 이미 테이블에 있으면 데이터 갱신
                self.d[i] = data
                return
            j += 1
            i = (initial_position + j) % self.M  # 다음 위치 계산
            if i == initial_position:  # 테이블이 가득 찼다면 루프 종료
                break

    def get(self, key):
        initial_position = self.hash(key)  # 키의 초기 해시 위치 계산
        i = initial_position
        j = 1
        while self.a[i] is not None:  # None이 아닐 때까지 탐색
            if self.a[i] == key:
                return self.d[i]  # 키가 일치하면 데이터 반환
            i = (initial_position + j) % self.M  # 다음 위치 계산
            j += 1
            if i == initial_position:  # 초기 위치로 돌아오면 None 반환
                return None
        return None

    def print_table(self):
        # 해시 테이블의 현재 상태 출력
        for i in range(self.M):
            print('{:4}'.format(str(i)), end=' ')
        print()
        for i in range(self.M):
            print('{:4}'.format(str(self.a[i])), end=' ')
        print()

```

- 선형 조사는 해시 테이블의 키들이 빈틈없이 뭉쳐지는 현상이 발생(1차 군집화)
- 군집화는 해시 테이블에 empty 원소가 적을수록 더 심화되며 해시 성능을 극단적으로 저하시킵니다.

#### 이차조사(Quadratic Probing)

> 선형조사와 비슷한 충돌 해결방법입니다.  
> $(h(key) + j^2 \mod N)$
> j = 충돌횟수, N = 해시 테이블 크기

```python
class QuadProbing:
    def __init__(self, size):
        self.M = size  # 해시 테이블의 크기
        self.a = [None] * size  # 해시 테이블의 키 저장 배열
        self.d = [None] * size  # 해시 테이블의 데이터 저장 배열
        self.N = 0  # 현재 저장된 원소의 개수

    def hash(self, key):
        return key % self.M  # 주어진 키에 대한 해시값 계산

    def put(self, key, data):
        initial_position = self.hash(key)  # 초기 위치
        i = initial_position
        j = 0
        loop_limit = 20  # 루프 제한
        while True:
            if self.a[i] is None:  # 비어있는 위치 발견
                self.a[i] = key  # 키 저장
                self.d[i] = data  # 데이터 저장
                self.N += 1  # 저장된 원소의 개수 증가
                return
            if self.a[i] == key:  # 이미 키가 존재하는 경우 데이터 갱신
                self.d[i] = data
                return
            j += 1
            i = (initial_position + j * j) % self.M  # 이차 조사 계산
            loop_limit -= 1
            if loop_limit == 0:  # 루프 제한에 도달하면 중단
                break

    def get(self, key):
        initial_position = self.hash(key)  # 초기 위치
        i = initial_position
        j = 1
        loop_limit = 20  # 루프 제한
        while self.a[i] is not None and loop_limit > 0:
            if self.a[i] == key:  # 키 발견
                return self.d[i]  # 연관된 데이터 반환
            i = (initial_position + j * j) % self.M  # 이차 조사 계산
            j += 1
            loop_limit -= 1
        return None  # 키를 찾지 못하면 None 반환

```

- 1차 군집화 문제를 해결 하지만 같은 해시 값을 가지는 키들이 같은 점프 시퀀스에 따라 empty 원소를 찾아 저장합니다. 따라서 또 다른 형태의 **2차 군집화가 발생합니다.**

#### 랜덤 조사(Random Probing)

> 점프 시퀀스르 무작위화하여 empty 원소를 찾는 방식입니다.

```python
import random

class RandProbing:
    def __init__(self, size):
        self.M = size  # 해시 테이블의 크기
        self.a = [None] * size  # 해시 테이블의 키 저장 배열
        self.d = [None] * size  # 해시 테이블의 데이터 저장 배열
        self.N = 0  # 현재 저장된 원소의 개수

    def hash(self, key):
        return key % self.M  # 주어진 키에 대한 해시값 계산

    def put(self, key, data):
        initial_position = self.hash(key)  # 초기 위치
        i = initial_position
        random.seed(1000)  # 난수 생성 초깃값 설정
        loop_limit = 20  # 루프 제한
        while True:
            if self.a[i] is None:  # 비어있는 위치 발견
                self.a[i] = key  # 키 저장
                self.d[i] = data  # 데이터 저장
                self.N += 1  # 저장된 원소의 개수 증가
                return
            if self.a[i] == key:  # 이미 키가 존재하는 경우 데이터 갱신
                self.d[i] = data
                return
            j = random.randint(1, 99)  # 난수 생성
            i = (initial_position + j) % self.M  # 난수를 이용한 다음 위치 계산
            loop_limit -= 1
            if loop_limit == 0:  # 루프 제한에 도달하면 중단
                break

    def get(self, key):
        initial_position = self.hash(key)  # 초기 위치
        i = initial_position
        random.seed(1000)  # 난수 생성 초깃값 설정
        loop_limit = 20  # 루프 제한
        while self.a[i] is not None and loop_limit > 0:
            if self.a[i] == key:  # 키 발견
                return self.d[i]  # 연관된 데이터 반환
            i = (initial_position + random.randint(1, 99)) % self.M  # 난수를 이용한 다음 위치 계산
            loop_limit -= 1
        return None  # 키를 찾지 못하면 None 반환

```

- 의사 난수 생성기를 사용합니다.
- 랜덤 조사 방식도 동의어들이 같은 점프 시퀀스에 따라 empty 원소를 찾아 키를 저장하게 되므로 3차 군집화가 발생합니다.

#### 이중 해싱(Double Hashing)

> 2개의 다른 해시 함수를 사용하는 방식
> $h_1(x)$는 주어진 키 x에 대해 해시 테이블의 초기 인덱스를 반환합니다.
> $h_2(x)$는 충돌이 발생할 경우, 이동할 간격(step size)를 결정합니다.
> $(h_1(x) + j * h_2(x)) \mod m$

```python
class DoubleHashing:
    def __init__(self, size):
        self.M = size  # 해시 테이블의 크기
        self.a = [None] * size  # 해시 테이블의 키 저장 배열
        self.d = [None] * size  # 해시 테이블의 데이터 저장 배열
        self.N = 0  # 현재 저장된 항목 수

    def hash(self, key):
        return key % self.M  # 주어진 키에 대한 해시값 계산

    def put(self, key, data):
        initial_position = self.hash(key)  # 초기 위치
        i = initial_position
        d = 7 - (key % 7)  # 두 번째 해시 함수
        j = 0
        loop_limit = 20  # 루프 제한
        while True:
            if self.a[i] is None:  # 비어있는 위치 발견
                self.a[i] = key  # 키 저장
                self.d[i] = data  # 데이터 저장
                self.N += 1  # 저장된 항목 수 증가
                return
            if self.a[i] == key:  # 이미 키가 존재하는 경우 데이터 갱신
                self.d[i] = data
                return
            j += 1
            i = (initial_position + j * d) % self.M  # 이중 해싱 계산
            loop_limit -= 1
            if loop_limit == 0:  # 루프 제한에 도달하면 중단
                break

    def get(self, key):
        initial_position = self.hash(key)  # 초기 위치
        i = initial_position
        d = 7 - (key % 7)  # 두 번째 해시 함수
        j = 0
        loop_limit = 20  # 루프 제한
        while self.a[i] is not None and loop_limit > 0:
            if self.a[i] == key:  # 키 발견
                return self.d[i]  # 연관된 데이터 반환
            j += 1
            i = (initial_position + j * d) % self.M  # 이중 해싱 계산
            loop_limit -= 1
        return None  # 키를 찾지 못하면 None 반환

```

- 점프 시퀀스가 일정하지 않고, 모든 군집화 현상을 발생시키지 않습니다.
- 해시 성능을 저하시키지 않는 동시에 해시 테이블에 많은 키를 저장합니다.

### 폐쇄 주소 방식(Closed Addressing)

> 해시값에 대응되는 곳에만 키를 저장합니다.
> 충돌이 발생한 키들은 한위치에 저장합니다.

#### 체이닝(Chaining)

> 키를 해시값에 대응되는 연결리스트에 저장하는 해시방식

```python
class Chaining:
    class Node:
        def __init__(self, key, data, link):
            self.key = key  # 노드의 키
            self.data = data  # 노드의 데이터
            self.next = link  # 다음 노드에 대한 참조

    def __init__(self, size):
        self.M = size  # 해시 테이블의 크기
        self.a = [None] * size  # 해시 테이블의 배열

    def hash(self, key):
        return key % self.M  # 나눗셈 해시 함수

    def put(self, key, data):
        i = self.hash(key)  # 해시 값을 계산하여 인덱스 결정
        p = self.a[i]
        while p is not None:
            if key == p.key:  # 키가 이미 존재하면
                p.data = data  # 데이터만 갱신
                return
            p = p.next
        self.a[i] = self.Node(key, data, self.a[i])  # 새로운 노드를 리스트 맨 앞에 삽입

```

- empty원소를 찾는 오버헤드와 군집화가 일어나지 않습니다.
- 연결리스트로 구현되어 참조값을 차지하는 공간이 추가적으로 필요합니다.

### 기타 해싱

#### 2-방향 체이닝(Two-Way Chaining)

> 2개의 해시 함수를 이용하여 연결 리스트의 길이가 짧은 리스트에 새 키를 저장하는 방식입니다.

1. 이중 버킷 구조: 각 버킷은 두 개의 연결 리스트를 가지고 있습니다.
2. 해시 함수의 사용: 두 개의 해시 함수 $h_1$ $h_2$ 를 사용하여 두 리스트 중 하나에 key-value 쌍을 삽입합니다.
3. **삽입 규칙**:
   - 첫 번째 해시 함수 $h_1$​에 의해 결정된 버킷의 첫 번째 리스트에 삽입을 시도합니다.
   - 만약 첫 번째 리스트가 가득 차 있거나 특정 조건에 의해 삽입할 수 없다면, 두 번째 해시 함수 $h_2$​에 의해 결정된 버킷의 두 번째 리스트에 삽입을 시도합니다.

```python
class TwoWayChaining:
    class Node:
        def __init__(self, key, data, next=None):
            self.key = key
            self.data = data
            self.next = next

    def __init__(self, size):
        self.M = size
        self.a1 = [None] * size  # 첫 번째 해시 테이블
        self.a2 = [None] * size  # 두 번째 해시 테이블

    def hash1(self, key):
        return key % self.M  # 첫 번째 해시 함수

    def hash2(self, key):
        return (key // self.M) % self.M  # 두 번째 해시 함수

    def put(self, key, data):
        index1 = self.hash1(key)
        index2 = self.hash2(key)

        # 첫 번째 리스트에 삽입 시도
        if self._insert(self.a1, index1, key, data):
            return

        # 두 번째 리스트에 삽입 시도
        self._insert(self.a2, index2, key, data)

    def _insert(self, table, index, key, data):
        p = table[index]
        while p is not None:
            if p.key == key:
                p.data = data
                return True
            p = p.next
        table[index] = self.Node(key, data, table[index])
        return True

    def get(self, key):
        index1 = self.hash1(key)
        index2 = self.hash2(key)

        # 첫 번째 리스트에서 검색
        data = self._search(self.a1, index1, key)
        if data is not None:
            return data

        # 두 번째 리스트에서 검색
        return self._search(self.a2, index2, key)

    def _search(self, table, index, key):
        p = table[index]
        while p is not None:
            if p.key == key:
                return p.data
            p = p.next
        return None

```

- 충돌 확률이 줄어들고 탐색 성능이 향상됩니다.
- 필요에 따라 연결 리스트의 크기를 동적으로 조절할 수 있습니다.
- 두 개의 연결리스트를 유지해야 하므로 메모리 사용량이 증가합니다.

#### 뻐꾸기 해싱(Cuckoo Hashing)

> 두개의 해시 함수를 사용하여 각 키를 두 개의 가능한 위치 중 하나에 저장할 수 있게 합니다.
> 충돌이 일어날 때 기존의 키를 다른 위치로 이동시키는 방식입니다.

- **두 개의 해시 함수**:
  - $h_1(x)$: 첫 번째 해시 함수
  - $h_2(x)$: 두 번째 해시 함수
  - 각각의 해시 함수는 테이블의 두 개의 다른 위치를 제공합니다.
- **삽입 연산**:
  - 키 $k$를 삽입할 때, $h_1(k)$ 위치에 삽입합니다.
  - 만약 $h_1(k)$ 위치에 이미 다른 키가 있다면, 기존의 키를 $h_2$​ 함수로 계산된 다른 위치로 이동시킵니다.
  - 이 과정을 반복하면서 충돌을 해결합니다.
- **탐색 연산**:
  - 키 $k$를 검색할 때, $h_1(k)$와 $h_2(k)$ 두 위치를 확인합니다.

```python
class CuckooHashing:
    def __init__(self, size):
        self.M = size
        self.table1 = [None] * size
        self.table2 = [None] * size

    def hash1(self, key):
        return key % self.M

    def hash2(self, key):
        return (key // self.M) % self.M

    def put(self, key, data):
        for _ in range(self.M):
            pos1 = self.hash1(key)
            if self.table1[pos1] is None:
                self.table1[pos1] = (key, data)
                return
            key, data = self.table1[pos1]
            self.table1[pos1] = (key, data)

            pos2 = self.hash2(key)
            if self.table2[pos2] is None:
                self.table2[pos2] = (key, data)
                return
            key, data = self.table2[pos2]
            self.table2[pos2] = (key, data)

        raise Exception("Hash table is full, need to rehash")

    def get(self, key):
        pos1 = self.hash1(key)
        if self.table1[pos1] is not None and self.table1[pos1][0] == key:
            return self.table1[pos1][1]

        pos2 = self.hash2(key)
        if self.table2[pos2] is not None and self.table2[pos2][0] == key:
            return self.table2[pos2][1]

        return None

    def delete(self, key):
        pos1 = self.hash1(key)
        if self.table1[pos1] is not None and self.table1[pos1][0] == key:
            self.table1[pos1] = None
            return

        pos2 = self.hash2(key)
        if self.table2[pos2] is not None and self.table2[pos2][0] == key:
            self.table2[pos2] = None
            return

```

- 탐색과 삭제를 O(1) 시간을 보장합니다.
- 최대 2회의 해시 함수 계산으로 각각의 테이블 원소를 찾아 각 연산을 처리합니다.

### 재해시(Rehash)

> 해시 테이블을 확장시키고 새 해시 함수를 사용하여 모든 키를 새 해시 테이블에 다시 저장합니다.
> 모든 키를 다시 저장해야 하므로 $O(n)$의 시간이 소요됩니다.

- 재해시의 수행 여부는 적재율에 의해 정해집니다.
- 적재율 $\alpha = (key의 수 n) / (테이블 크기 M)$

### 동적 해싱

> 대용량의 데이터 베이스를 위한 해시 방법으로 재해싱을 수행하지 않고 동적으로 해시 테이블의 크기를 조절합니다.

#### 확장 해싱

> 디렉토리(Directory)를 메인메모리에 저장하고, 데이터는 디스크 블록 크기의 버킷 단위로 저장합니다.

1. **디렉터리**: 해시 테이블의 논리적인 구조로, 디렉터리 엔트리는 버킷을 가리킵니다.
2. **버킷**: 실제 데이터를 저장하는 공간입니다. 버킷이 꽉 차면 분할(Split)됩니다.
3. **해시 함수**: 해시 함수는 디렉터리의 깊이에 따라 조정됩니다. 초기에는 해시 함수의 일부 비트만 사용하다가, 테이블이 커지면 더 많은 비트를 사용합니다.

   - **삽입**:
   - 데이터의 해시 값을 계산하고, 해당 디렉터리 엔트리로 이동합니다.
   - 버킷에 빈 공간이 있으면 데이터를 삽입합니다.
   - 버킷이 가득 차면, 버킷을 분할하고 디렉터리 크기를 조정합니다.

- **검색**:
  - 데이터의 해시 값을 계산하고, 디렉터리 엔트리를 통해 버킷을 찾습니다.
  - 버킷에서 데이터를 검색합니다.
- **삭제**:
  - 데이터의 해시 값을 계산하고, 디렉터리 엔트리를 통해 버킷을 찾습니다.
  - 버킷에서 데이터를 삭제합니다.

#### 선형 해싱(Linear Hashing)

> 해시 테이블의 크기를 점진적으로 확장하는 기법입니다. 디렉토리를 사용하지 않고 새로운 버킷을 순차적으로 추가하여 확장합니다.

1. **레벨**: 해시 테이블의 현재 단계. 해시 함수는 레벨에 따라 달라집니다.
2. **버킷**: 데이터를 저장하는 공간입니다. 레벨이 증가할 때마다 버킷이 추가됩니다.
3. **해시 함수**: 해시 함수는 레벨에 따라 변하며, 데이터가 분포된 버킷의 위치를 결정합니다.

- **삽입**
  - 데이터의 해시 값을 계산하고, 해당 버킷으로 이동합니다.
  - 버킷이 가득 차면, 새로운 버킷을 추가하고 기존 데이터를 재분배합니다.
- **검색**:
  - 데이터의 해시 값을 계산하고, 버킷에서 데이터를 검색합니다.
- **삭제**
  - 데이터의 해시 값을 계산하고, 버킷에서 데이터를 삭제합니다.
