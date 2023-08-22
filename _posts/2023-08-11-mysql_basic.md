---
title: "[sql]Select 문법 정리"
comments: true
categories:
 - CS
header:
 overlay_filter: "0.5"
 overlay_image: "https://d1.awsstatic.com/asset-repository/products/amazon-rds/1024px-sql.ff87215b43fd7292af172e2a5d9b844217262571.png"
 teaser: "https://d1.awsstatic.com/asset-repository/products/amazon-rds/1024px-sql.ff87215b43fd7292af172e2a5d9b844217262571.png"
tags:
 - sql
 - DB
sidebar:
 nav: "docs"
toc: true
---
데이터 조회에 쓰이는 Select문을 정리해보자

## Select와 여러 절들
- `From`: 테이블 확인
- `Where`: From절의 테이블을 특정 조건으로 필터링
- `Group by`: 열 별로 그룹화
- `Having`: 그룹화된 새로운 테이블을 특정 조건으로 필터링
- `Select`: 열 선택
- `Order by`: 열 정렬 방식 선택

```sql
 select [열1]
        ,[열2]
        ,[집계함수] as [열이름]
   from [테이블명]
  where [조건]
  group
     by [열1]
        ,[열2]
 having [조건]
  order
     by [열1];
```

### from
어느 테이블에서
### where
조건을 만족하는 값만(select 문에 집계함수가 잇는없든 무조건 where조건부터 확인후 집계)
### group by
select 절에는 `group by뒤에서 사용한 컬럼들` 또는 `count, max등과 같은 집계 함수만 올 수 있다.` 반대로 말하면 group by 뒤에 쓰지 않은 칼럼들은 select뒤에 올 수 없다.
```sql
SELECT  gender,
        COUNT(*),
        AVG(height),
        MIN(weight)
  FROM copang_main.member
 GROUP
    BY gender;
```
### having 
집계조건
### order by
정렬

![](https://velog.velcdn.com/images/koreaygj/post/27f5eb4d-d0b9-4f25-a6a5-ef730fa7cb9b/image.png)
이때 node에 합을 넣게 된다면, 필요한 구간 합을 구할 수 있다. 예를 들어 index값이 2~4에 해당하는 구간 합을 구하고자 할 때, a[2] 와 a[3] + a[4]에 해당하는 노드값의 합을 재귀의 형식으로 풀이할 수 있다. 



참고 출처 
https://prinha.tistory.com/entry/MySQL-GROUP-BY-%EA%B7%B8%EB%A3%B9%ED%95%91     
 https://yongj.in/data%20structure/Segment-Tree/
