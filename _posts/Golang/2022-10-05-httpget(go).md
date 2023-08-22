---
title: "[Go]http GET 정리"
comments: true
categories:
 - go
header:
 overlay_color: "#e9dcbe"
 overlay_filter: "0.5"
 overlay_image: "https://miro.medium.com/max/720/1*CdjOgfolLt_GNJYBzI-1QQ.jpeg"
 teaser: "https://miro.medium.com/max/720/1*CdjOgfolLt_GNJYBzI-1QQ.jpeg"
tags:
 - gobasic
sidebar:
 nav: "docs"
toc: true
---

#### http pagckage
 http package는 HTTP client와 서버 구현을 제공한다.

#### HTTP GET 예제

```go
package main
import (
    "fmt"
    "net/http" /http Package import
)
func main(){
    var url = "https://www.gogle.com/"
    resp, err := http.Get(url)
    status := "OK"
    if(err != nil || resp.StatusCode >= 400){
        status = "Request Failed"
    }
}
```

 위의 코드를 보면, google의 http get을 통해 요청을 할 수 있었다. 그러나 위와 같은 단순한 방식으로는 header를 수정하거나 할 수 없다. 그럴 때 사용 되는 것이 Client 객체를 사용하는 것이다.

#### HTTP GET header 변경 예제
```go
package main
import(
    "fmt"
    "log"
    "net/http"
)
func checkErr(err error){
	if err != nil{
        log.Fatalln(err)
    }
}
func main(){
    //Request 객체 생성
    req, err := http.NewRequest("Get", "https://www.google.com/")
    if(err != nil)
        checkErr(err)
    //헤더에 User-Agent 추가하기
    req.Header.Add("User-Agent", "Mozilla/5.0")
    req.Header.Set("User-Agent", "Mozilla/5.0")
    //client 객체 생성 및 Request
    client := &http.Client{}
    resp, err := client.Do(req)
    checkErr(err)
    //메모리 누수 방지를 위해 BODY close
    defer resp.Body.Close()
    //결과 출력
    bytes, _ := ioutil.ReadAdd(resp.Body)
    str := string(bytes)
    fmt.println(str)
}
```

 HTTP GET의 헤더를 수정하고 싶을 경우 
 Request 객체 생성 -> 해더 수정 -> Client 객체 생성후 Request
 순서로 하면 쉽게 수정 할 수 있다.
 또한 HTTP 호출결과는 Response 객체로 Body 필드를 활용하여 결과를 출력할 수 있다. 이때 메모리 누수를 방지하기 위해 Body 필드는 항상 사용하고 난 후에는 close하여야 한다.

참고자료: <https://pkg.go.dev/net/http>