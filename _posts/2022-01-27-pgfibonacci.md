---
title: "[프로그래머스] 피보나치 수"
header:
 overlay_color: "#e9dcbe"
 teaser: "/assets/images/algorithm/programmers/Level 2/fibonacci/problem.jpg"
categories:
 - Algorithm
tags:
 - level2
 - programmers
 - fibonacci
sidebar:
 nav: "docs"
toc: true
---
<script type="text/javascript" 
src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML">
</script>

제귀함수를 이용하여서 피보나치 수를 구현해보는 문제이다. 난이도: 하

#### 문제
[![피보나치 수](/assets/images/algorithm/programmers/Level 2/fibonacci/problem.jpg)](https://programmers.co.kr/learn/courses/30/lessons/12945)
 
 -------

### 힌트

 1234567로 나누어서 결과 출력하는 것 잊지말기...

 시간초과가 일어난다면 동적기획법을 사용하는 것을 떠올리자. 이번 문제의 경우 memo

 <details>
 <summary>코드 자세히 보기</summary>
 <div markdown="1">

```cpp
#include <iostream>
#include <vector>
using namespace std;
vector<int> memo(100001, 0);
int solution(int n)
{
 if (n <= 1)
  return n;
 if (memo[n] > 0)
  return memo[n];
 return memo[n] = (solution(n - 1) + solution(n - 2)) % 1234567;
}
int main(void)
{
 int n;
 cin >> n;
 cout << solution(n);
 return 0;
}
 ```
 </div>
 </details>

------

### 문제 풀이

이문제는 시간초과가 나기 쉬운 피보나치 수열을 동적기획법을 통해 시간 초과를 없애는 것이 주로된 문제였다. 코드를 보면 알 수 있지만 memo배열을 활용하면 시간복잡도를 많이 줄일 수 있다.
  

### 문제 결과
<br>
![result](/assets/images/algorithm/programmers/Level 2/fibonacci/result.jpg)

문제 출처
<https://programmers.co.kr/learn/courses/30/lessons/12945>