---
title: "[프로그래머스] 소수 찾기"
header:
 teaser: "/assets/images/algorithm/programmers/Level 2/decimal/problem.jpg"
categories:
 - Algorithm
tags:
 - level2
 - programmers
 - matrix
sidebar:
 nav: "docs"
---
<script type="text/javascript" 
src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML">
</script>

#### 문제
[![행렬의 곱셈](/assets/images/algorithm/programmers/Level 2/decimal/problem.jpg)](https://programmers.co.kr/learn/courses/30/lessons/42839)
 
 -------

### 힌트

 문제를 보면 예시에 17의 경우 만들수 있는 조합의 수는 1, 7, 17, 71이다. 17, 71만 있는 경우만 생각하면 안된다.

 경우의 수를 조합할때 dfs를 사용할수 있다. 

 <details>
 <summary>코드 자세히 보기</summary>
 <div markdown="1">

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int n;
vector<bool> check(8, 0);
vector<int> ans;
string case_num = "";
string input;
bool check_decimal(int n)
{
 if (n == 0 || n == 1)
  return false;
 for (int i = 2; i * i <= n; i++)
 {
  if (n % i == 0)
   return false;
 }
 return true;
}
void permutation(int count)
{
 if (count == n)
  return;
 for (int i = 0; i < n; i++)
 {
  if (check[i] == true)
   continue;
  case_num += input[i];
  ans.push_back(stoi(case_num));
  check[i] = true;
  permutation(count + 1);
  check[i] = false;
  case_num.pop_back();
 }
}
int solution(string numbers)
{
 int answer = 0;
 n = numbers.size();
 input = numbers;
 permutation(0);
 sort(ans.begin(), ans.end());
 ans.erase(unique(ans.begin(), ans.end()), ans.end());
 for (int i = 0; i < ans.size(); i++)
 {
  if (check_decimal(ans[i]))
   answer++;
 }
 return answer;
}
 ```
 </div>
 </details>

------

### 문제 풀이

이문제는 주어진 문자열을 보고 가능한 조합을 모두 구한수에 소수가 가능한지를 확인하면 되는 문제였다. 이번 문제에서 중요했던 부분은 조합후에 중복되는 것을 지우는 것과 힌트에서 언급한 것 처럼 조합의 경우의 수가 한자리수도 있는 만큼 이것을 고려하여 dfs를 활용하는 부분이 중요했다. 이는 permutation 함수의 흐름을 따라가보면 알 수 있다.
  

### 문제 결과
<br>
![result](/assets/images/algorithm/programmers/Level 2/decimal/result.jpg)

문제 출처
<https://programmers.co.kr/learn/courses/30/lessons/42839>