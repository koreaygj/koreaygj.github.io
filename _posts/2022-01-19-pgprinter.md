---
title: "[프로그래머스] 프린터"
header:
 overlay_color: "#e9dcbe"
 teaser: "/assets/images/algorithm/programmers/Level 2/printer/problem.jpg"
 overlay_image: "https://s3.ap-northeast-2.amazonaws.com/grepp-cloudfront/programmers_imgs/design/logo.jpg"
categories:
 - Algorithm
tags:
 - level2
 - programmers
 - sort
sidebar:
 nav: "docs"
toc: true
---
<script type="text/javascript" 
src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML">
</script>

간단한 행렬의 곱셈 C++로 간단하게 구하는 문제이다.

#### 문제
[![행렬의 곱셈](/assets/images/algorithm/programmers/Level 2/printer/problem.jpg)](https://programmers.co.kr/learn/courses/30/lessons/42587)
 
 -------

### 힌트

 문제상에서 제한 조건에 곱할 수 있는 배열만 주어진다.

 <details>
 <summary>코드 자세히 보기</summary>
 <div markdown="1">

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

vector<vector<int>> solution(vector<vector<int>> arr1, vector<vector<int>> arr2)
{
 vector<vector<int>> answer(arr1.size(), vector<int>(arr2[0].size(), 0));
 for (int i = 0; i < answer.size(); i++)
 {
  for (int j = 0; j < answer[i].size(); j++)
  {
   for (int k = 0; k < arr1[0].size(); k++)
   {
    answer[i][j] += arr1[i][k] * arr2[k][j];
   }
  }
 }
 return answer;
}
 ```
 </div>
 </details>

------

### 문제 풀이

이문제는 단순히 반복문을 통해서 2차원 행렬을 곱하는 간단한 문제였다. 행렬곱의 정의를 생각해보면 단순히 풀이가능한 문제였다. 아래와 같은 식을 생각하고 풀이 하면 쉬운 문제이다.
  
 $$ ans_{ij} = A_{i1}B_{1j} +A_{i2}*B_{2j} + \dots + A_{in}*B{nj} = \sum_{k=1}^{n} A_{ik}*B_{kj} $$


### 문제 결과
<br>
![result](/assets/images/algorithm/programmers/Level 2/printer/result.jpg)

문제 출처
<https://programmers.co.kr/learn/courses/30/lessons/12949>