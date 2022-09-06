---
title: "Kotlin 입력과 출력"
layout: posts
comments: true
categories:
 - kotlin
header:
 overlay_color: "#e9dcbe"
 overlay_filter: "0.5"
 overlay_image: "https://images.velog.io/images/foxrain_gg/post/25771f3f-177d-48bd-a3e4-e4acab5be909/kotlin.png"
 teaser: "https://images.velog.io/images/foxrain_gg/post/25771f3f-177d-48bd-a3e4-e4acab5be909/kotlin.png"
tags:
 - ktbasic
sidebar:
 nav: "docs"
toc: true
---

#### Kotlin의 입력

 코틀린의 경우 3개의 방법으로 입력받을 수 있다.

##### readLine()
```kotlin
fun main(){
    var name = readLine()   // 입력
    println(name)   //출력
```

 readLine()의 경우에는 어떠한 입력이든 String으로 입력받는다. 그래서 만약 입력받은 데이터를 원하는 자료형으로 변환하는 과정이 필수적이다. 이때 아래와 같은 코드를 통해 자료형을 바꾸어 입력받을 수 있다.

```kotlin
fun main(){
    var i:Int = readLine()!!.toInt()
    var d:Double = readLine()!!.toDouble()
}
```

-------

##### BufferedReader
 kotlin은 자바기반의 언어이기 때문에 BufferReader를 자바에서 사용하는 것처럼 사용할 수 있다.

```kotlin
 import java.io*
 import java.util.*
 fun main(argsL Array<String>) = with(BufferedReader(InputStreamReadrr(System.`in`))){
     val token - StringTokenizer(readLine())
     println(Integer.parseInt(token.nextToken()) + Integer.parseInt(token.nextToken()))
 }
```

------

##### Scanner

 마지막으로 스캐너를 사용하는 방법도 있다. 자바에서는 보통 변수를 활용해서 사용하는데 kotlin에서는 with을 사용해서 바로 스캐너를 만들어서 사용하는 방법도 있다.

```kotlin
import java.util.*
fun main(args: Array<String>){
    var input = Scanner(System.`in`)
}
```

```kotlin
import java.util.*
fun main(args: Array<String>) = with(Scanner(System.`in`)) {
}
```
------

#### Kotlin의 출력
 kotlin의 콘솔 출력에는 print, println을 사용한다.

```kotlin
fun main(){
    println("개행이 있는 출력")
    print("개행이 없는 출력")
}
```