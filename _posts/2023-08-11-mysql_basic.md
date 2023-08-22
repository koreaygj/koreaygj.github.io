---
title: "[sql]Select 문법 정리"
categories:
 - CS
header:
 overlay_image: "https://logosdownload.com/logo/mysql-logo-1024.png"
 overlay_filter: "0.5"
 teaser: "https://logosdownload.com/logo/mysql-logo-1024.png"
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
Group by를 통해 묶인 레코드 그룹에 대해 조건을 거는 역할이다. where과는 비슷하지만 `그룹화되어진 테이블에서 조건에 만족하는 값을 필터링`해준다.
### order by
테이블을 조회할 때 결과를 정렬하는 방식을 정한다. 기본적으로 order by 뒤에 아무것도 적지 않으면 오름차순으로 정렬이 된다. 오름차순은 `ASC`, 내림차순은 `DESC`를 키워드로 가지고 있다. 
추가적으로 정렬기준을 한개 이상 정하고 싶을 때는 간단하게 `,`뒤에 원하는 만큼 붙일 수 있다. 이때 정렬 우선순위는 앞에서 부터 뒤로 이루어진다.
```sql
select *
  from employee
 order
    by salary desc, employee_id; // salary를 내림차순으로 정렬하되 같을 때에 employee_id를 오름차순으로 정렬한다.
```


참고 출처 
https://prinha.tistory.com/entry/MySQL-GROUP-BY-%EA%B7%B8%EB%A3%B9%ED%95%91     
 https://yongj.in/data%20structure/Segment-Tree/
