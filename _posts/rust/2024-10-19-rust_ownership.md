---
title: "[Rust 공식가이드 정리]소유권(Ownership)"
comments: true
categories:
  - rust
header:
  overlay_filter: "0.8"
  overlay_image: "https://raw.githubusercontent.com/rust-lang/www.rust-lang.org/master/static/images/rust-social-wide-dark.svg"
  teaser: "https://raw.githubusercontent.com/rust-lang/www.rust-lang.org/master/static/images/rust-social-wide-dark.svg"
tags:
  - rust
  - ownership
  - 공식문서
  - 정리
sidebar:
  nav: "docs"
toc: true
---

> 📝 소유권
> 소유권은 러스트에서 가장 독특한 개념으로 Rust가 가비지 컬렉터 없이 메모리 안정성을 보장하도록 하는 방식

### 들어가기 앞서서

#### 스택과 힙

러스트와 같은 시스템 프로그래밍 언어에서는 값을 스택에 저장하는지 힙에 저장하는지에 따라 차이가 생기고 이 차이가 프로그램의 동작 및 프로그래머의 의사결정에 큰 영향을 미친다.
스택과 힙은 둘 다 작성한 프로그램이 런타임에 사용하게 되는 메모리 영역이지만, 구조가 다르다.
**개념**

- **스택(Stack)**: 값이 들어온 순서대로 저장하고, 역순으로 제거 (후입 선출 last in, first out)
  스택은 구조상 저장되는 데이터는 모두 명확하고 크기가 정해져 있어야 한다. 따라서 컴파일 타임에 크기를 알 수 없거나, 크기가 변경될 수 있는 데이터는 스택 대신 힙에 저장되어야 한다.
- **힙(Heap)**:
  **힙 공간 할당(alloction)**: 힙은 데이터를 힙에 넣을 때 저장할 공간이 있는지 운영체제에게 물어보고 메모리 할당자는 커다란 힙 영역 안에서 어떤 빈 지점을 찾고, 이 지점은 사용 중이라고 표시한뒤 해당 지점을 가리키는 포인터를 반환한다.
  포인터는 크기가 정해져 있어 스택에 저장할 수 있지만, 실제 데이터를 사용하고자 할 때는 포인터를 참조해 해당 포인터가 가리키는 위치로 이동하는 과정을 거쳐야 한다.
  **속도**
- 기본적으로 스택이 데이터에 접근하는 속도가 **빠르다.**
- 힙은 공간에 할당하는 작업에서 메모리 할당자가 데이터를 저장하기 충분한 공간을 먼저 찾고 다음 할당을 위한 준비를 위해 예약을 수행해야 하기 때문이다.
- 힙은 포인터가 가리키는 곳으로 찾아가는 과정으로 인해 느려진다.

> 📝
> 코드 어느 부분에서 힙의 어떤 데이터를 사용하는지 추적하고, 힙에서 중복되는 데이터를 최소화하고, 쓰지 않는 데이터를 힙에서 정리해 영역을 확보하는 등의 작업은 모두 **소유권** 과 관련되어 있다. 소유권의 주요 목표는 힙 데이터의 관리자라는 점을 알고 있으면 소유권의 동작 방식을 이해하는 데 도움이 됩니다.

## 소유권

### 소유권 규칙

> 📋 소유권의 규칙
>
> - 러스트에서, 각각의 값은 *소유자 (owner)* 가 정해져 있습니다.
> - 한 값의 소유자는 동시에 여럿 존재할 수 없습니다.
> - 소유자가 스코프 밖으로 벗어날 때, 값은 버려집니다 (dropped).

#### 변수의 스코프

소유권의 첫 예제로 스코프에 대해서 다뤄보면, 프로그램 내에서 아이템이 유효한 범위를 말한다.

```rust
{ // s는 아직 선언되지 않아서 여기서는 유효하지 않습니다
	let s = "hello"; 	// 이 지점부터 s가 유효합니다
	// s로 어떤 작업을 합니다
} // 이 스코프가 종료되었고, s가 더 이상 유효하지 않습니다
```

1. `s`가 스코프 내에 나타나면 유효
2. 유효기간은 스코프 밖으로 벗어나기 전까지

### String 타입

힙에 저장되면서 러스트의 데이터 정리 과정을 보기 위한 좋은 예시로 String 타입이 있다.
문자열 리터럴은 불변성을 가지기 때문에 변경할 수 없기 때문에 러스트는 또 다른 문자열 타입인 `string`을 제공한다.
이 타입은 힙에 할당된 데이터를 다루기 때문에, 컴파일 타임에 크기를 알 수 없는 텍스트로 저장 가능하다.

### 메모리와 할당

String은 힙에 메모리를 할당하는 방식을 사용하기 때문에,

- 실행 중 메모리 할당자로부터 메모리를 요청해야 한다.
- `string`사용을 마쳤을 때 메모리를 해제할 방법이 필요하다.
  첫번째는 `String::from`을 활용하면 필요한 만큼 메모리를 요청하도록 구현되어있다.
  두번째는 가비지 컬렉터를 갖는 언어에ㅓㅅ는 GC가 사용하지 않는 메모리를 찾아 없애주므로 프로그래머가 신경쓸 필요가 없다. 그러나 가비지 컬렉터가 없는 언어에서는 할당받은 메모리를 필요없어지는 부분에 메모리 해제 코드를 작성해야했다.
  러스트에서는 이 문제를 변수가 자신이 소속된 스코프를 벗어나는 순간 자동으로 메모리를 해제하는 방식으로 해결했다.

```rust
    {
        let s = String::from("hello"); // s는 이 지점부터 유효합니다
        // s를 가지고 무언가 합니다
    }                                  // 이 스코프가 종료되었고, s는 더 이상
                                       // 유효하지 않습니다.
```

러스트는 s가 스코프를 벗어날때 `drop`이라는 함수를 호출해 메모리 해제된다.

### Move(변수와 데이터 간 상호작용)

러스트에서는 동일한 데이터에 여러 변수가 서로 다른 방식으로 상호작용할 수 있다.
**정수형**

```rust
    let x = 5;
    let y = x;
```

이 예시에서는 정수형을 활용하기 때문에 크기가 정해진 단순한 값인 정수는 스택에 푸시된다.
**String**

```rust
let s1 = String::from("hello");
let s2 = s1;
```

이 예시도 위와 같이 `s1`, `s2`에 각각 복사본을 생성해서 바인딩하는 방식으로 동작한다고 생각할 수 있지만 전혀 다른 방식으로 동작한다.

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="https://doc.rust-kr.org/img/trpl04-01.svg" width="400px" align="center" alt="string 예시"/>
</div>

`String`에는 포인터, 길이, 용량에 대한 값들을 가지고 있고, 이 데이터는 스택에 저장된다. 그리고 우측에 있는 문자열 내용은 힙 메모리에 저장된다.

- 포인터: 문자열 내용이 들어가 있는 메모리
- 길이: string내용이 현재 사용하고 있는 메모리를 바이트 단위로 계산
- 용량: 메모리 할당자가 string에 할당한 메모리의 양
  위의 예시처럼 `s2`에 `s1`의 값을 대입하면 데이터가 복사된다. 그러면 아래와 같이 동작하게 된다.

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="https://doc.rust-kr.org/img/trpl04-02.svg" width="400px" alt="문자열 대입시 구조"/>
</div>

러스트는 이런 구조로 `string`값을 복사하고 이를 통해 힙 메모리에 할당하는 데이터를 줄임으로써 연산속도를 줄일 수 있다.
그러나 이렇게 설계되었을때 두 포인터가 같은 곳을 가리킬때 메모리를 각각 해제하게 되면 **중복 해제**오류가 생기게 된다. 이는 메모리 안정성 버그중 하나로 보안을 취약하게 만드는 메모리 손상의 원인이 된다.
메모리 안정성을 보장하기 위해서, 러스트는 `let s2 = s1`이후로 `s1`이 유효하지 않다고 판단한다. 이를 통해서 러스트는 `s1`이 스코프를 벗어나더라도 해제할 필요가 없다.

```rust
    let s1 = String::from("hello");
    let s2 = s1;

    println!("{}, world!", s1);

```

위의 예시를 실행시에는 아래와 같이 유효하지 않은 참조자 사용이라는 오류가 뜨게 된다.

```bash
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0382]: borrow of moved value: `s1`
 --> src/main.rs:5:28
  |
2 |     let s1 = String::from("hello");
  |         -- move occurs because `s1` has type `String`, which does not implement the `Copy` trait
3 |     let s2 = s1;
  |              -- value moved here
4 |
5 |     println!("{}, world!", s1);
  |                            ^^ value borrowed here after move
  |
  = note: this error originates in the macro `$crate::format_args_nl` which comes from the expansion of the macro `println` (in Nightly builds, run with -Z macro-backtrace for more info)
help: consider cloning the value if the performance cost is acceptable
  |
3 |     let s2 = s1.clone();
  |                ++++++++

For more information about this error, try `rustc --explain E0382`.
error: could not compile `ownership` due to previous error

```

이와 같은 개념은 다른 언어에서는 얕은 복사(shallow copy)라고 생각할 수 있지만, 러스트에서는 **기존의 변수를 무효화**하기 때문에 **이동(move)** 라고 한다.

### Clone(변수와 데이터 간 상호작용)

`String`의 힙 데이터까지 깊이 복사하고 싶을 때는 `clone`이라는 공통 메서드를 사용할 수 있다.

```rust

    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}, s2 = {}", s1, s2);
```

이 예제의 실행 결과는 깊은 복사를 진행한 구조와 동일하게 나타난다.

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="https://doc.rust-kr.org/img/trpl04-03.svg" alt="힙 데이터까지 복사한 구조" width="400px"/>
</div>

이 시점에서는 `clone`이라는 메서드가 호출된 부분에서 성능에 영향이 갈 수 있다고 생각해야 한다.

### Copy(스택에만 저장되는 데이터)

```rust
    let x = 5;
    let y = x;

    println!("x = {}, y = {}", x, y);
```

위의 예제는 정수형을 이용하는 예시로 `clone`을 호출하지도 않았지만, `x`와 `y` 모두 유효한것을 볼 수 있다. _이는 정수형과 같이 컴파일 타입에 크기가 고정되는 타입은 모두 스택에 저장되기 때문이다._ 스택에 저장되니 복사본을 빠르게 만들수 있고 이떄는 깊은 복사와 얕은 복사간의 차이가 없다.
러스트에는 정수형과 같이 스택에만 저장되는 타입에만 `Copy`트레이트를 달아놓을 수 있다. 이 타입의 변수는 사용되어도 move되지 않고 자명하게 복사되고, 대입 연상후에도 사용가능하다.
그러나 구현하려는 타입이나, 타입 중 일부분이 `Drop`트레이트가 구현되어 있는 경우에는 `Copy` 트레이트를 어노테이션 할 수 없다.
**Copy 가능한 타입 목록 일부**

- 모든 정수형 타입 (예: `u32`)
- `true`, `false` 값을 갖는 논리 자료형 `bool`
- 모든 부동 소수점 타입 (예: `f64`)
- 문자 타입 `char`
- `Copy` 가능한 타입만으로 구성된 튜플 (예를 들어, `(i32, i32)`는 `Copy` 가능하지만 `(i32, String)`은 불가능합니다)

### 반환값과 스코프

소유권은 반환하는 과정에서도 이동한다.

```rust
fn main() {
    let s1 = gives_ownership();         // gives_ownership이 자신의 반환 값을 s1로
                                        // 이동시킵니다

    let s2 = String::from("hello");     // s2가 스코프 안으로 들어옵니다

    let s3 = takes_and_gives_back(s2);  // s2는 takes_and_gives_back로 이동되는데,
                                        // 이 함수 또한 자신의 반환 값을 s3로
                                        // 이동시킵니다
} // 여기서 s3가 스코프 밖으로 벗어나면서 버려집니다. s2는 이동되어서 아무 일도
  // 일어나지 않습니다. s1은 스코프 밖으로 벗어나고 버려집니다.

fn gives_ownership() -> String {             // gives_ownership은 자신의 반환 값을
                                             // 자신의 호출자 함수로 이동시킬
                                             // 것입니다
    let some_string = String::from("yours"); // some_string이 스코프 안으로 들어옵니다
    some_string                              // some_string이 반환되고
                                             // 호출자 함수 쪽으로
                                             // 이동합니다
}

// 이 함수는 String을 취하고 같은 것을 반환합니다
fn takes_and_gives_back(a_string: String) -> String { // a_string이 스코프 안으로
                                                      // 들어옵니다

    a_string  // a_string이 반환되고 호출자 함수 쪽으로 이동합니다
}
```

변수의 소유권 규칙은 다른 변수에 대입하면 값이 이동하고, 힙에 데이터를 갖는 변수가 스코프를 벗어나면, 사전에 해당 데이터가 이동하여 소유권이 다른 변수로 이동되지 않는 이상 `drop`에 의해 데이터가 제거된다.
함수에 넘겨줄 값을 함수 호출이후에도 쓰고 싶을 때 함수가 값을 사용할 수 있도록 하되 소유권을 가져가지 않도록 하고 싶다면, **참조자(referece)** 기능을 통해 사용 가능하다.

## 참조와 대여

**참조자(_reference_)** 는 해당 주소에 저장된 데이터에 접근 할 수 있도록 하는 포인터와 같은 것으로 그 데이터는 다른 어떤 변수가 소유하고 있다. 포인터와 다른 점은 참조자는 살아있는 동안 특정 타입에 대한 유효한 값을 가리킨다는 것을 **보장**해줍니다.

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

이전과 달리 `s1`대신 `&s1`을 전달하고 함수의 정의에 `Stirng`대신 `&String`을 사용한다. 이 &라는 기호가 참조자를 나타내고, 어떤 값의 소유권을 가져오지 않고 해당 값을 참조할 수 있도록 한다.

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="https://doc.rust-kr.org/img/trpl04-05.svg" alt="참조 개념 도식" width="400px"/>
</div>

> & 참조의 반대는 역참조로 기호는 \*을 사용한다.

```rust
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
```

`&s1`구문은 `s1`값을 참조하지만 해당 값을 소유하지 않는 참조라를 형성한다. 값을 소유하지 않으므로 이 참조자가 가리킨 값은 참조자가 사용되지 않을 때까지 버려지지 않는다.
이렇게 참조자를 만드는 행위를 **대여(borrow)** 라고 한다.
참조자는 변수와 마찬가지로 불변성을 가지고 있으므로 수정할 수 없다.

### 가변 참조자

가변 참조자를 활용하면 참조자를 통해서 값을 수정할 수 있다.

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

우선 `s`를 `mut` 로 변경합니다. 그런 다음 `change` 함수를 호출하는 곳에서 `&mut s`로 가변 참조자를 생성하고, 이 함수에서 가변 참조자를 전달받도록 `some_string: &mut String`으로 수정합니다. 이는 `change` 함수가 빌린 값을 수정할 수 있음을 매우 명확하게 합니다.
가변 참조자는 어떤 값에 가변 참조자를 **한 개 이상 생성**할 수 없다.
이를 통해 러스트는 컴파일 타임에서 **데이터 경합(data race)** 을 방지할 수 있다.

> 📝 데이터 경합 조건
>
> - 둘 이상의 포인터가 동시에 같은 데이터에 접근
> - 포인터 중 하나 이상이 데이터 쓰기 작업을 시행
> - 데이터 접근 동기화 메커니즘이 없음

또한 가변 참조자와 불변 참조자를 혼용할 때도 유사한 규칙이 적용된다.(가변 참조자는 데이터당 1개, 불변 참조자는 데이터당 제약 없음)
어떤 값에 불변 참조자가 있는 동안 같은 값의 가변 참조자를 만드는 것 또한 불가능하다.

```rust
    let mut s = String::from("hello");

    let r1 = &s; // 문제없음
    let r2 = &s; // 문제없음
    println!("{} and {}", r1, r2);
    // 이 지점 이후로 변수 r1과 r2는 사용되지 않습니다

    let r3 = &mut s; // 문제없음
    println!("{}", r3);
```

이러한 제약은 불편할 수 있지만, 러스트 컴파일러가 코드에 숨어 있는 버그를 런타임이 아닌 컴파일 타임에 일찌감치 찾아내어 어느 부분이 문제인지 집어 줄 수 있도록 하는 기능이다.

### 댕글링 참조

**댕글링 포인터(dongling pointer)?**
어떤 메모리를 가리키는 포인터가 남아있는 상황에서 일부 메모리를 해제해버림으로써, 다른 개체가 할당받았을지도 모르는 메모리를 참조하게 된 포인터를 말한다.
이러한 참조를 러스트에서는 어떤 데이터의 참조자를 만들면, 해당 참조자가 스코프를 벗어나기 전에 데이터를 먼저 스코프를 벗어나는지 컴파일러에서 확인하여 댕글링 참조가 생성되지 않도록 보장한다.

```rust
fn dangle() -> &String { // dangle은 String의 참조자를 반환합니다

    let s = String::from("hello"); // s는 새로운 String입니다

    &s // String s의 참조자를 반환합니다
} // 여기서 s는 스코프 밖으로 벗어나고 버려집니다. 해당 메모리는 해제됩니다.
  // 위험합니다!
```

이렇게 dangle 참조가 생기는 부분에서는 컴파일러가 아래와 같은 오류를 출력한다.

```
this function's return type contains a borrowed value, but there is no value for it to be borrowed from. (해석: 이 함수는 빌린 값을 반환하고 있으나, 빌린 실제 값이 존재하지 않습니다.)
```

이는 유효하진 않는 `String`값을 가리키는 참조자를 반환하는 행위이기 때문에 에러가 발생한다.
이는 아래와 같은 코드로 수정하면 문제 없이 작동한다.

```rust
fn no_dangle() -> String {
    let s = String::from("hello");

    s
}
```

> 📝 참조자 규칙
>
> - 단 하나의 가변 참조자 또는 여러 개의 불변 참조자를 만들 수 있다.
> - 참조자는 항상 유효해야 한다.

## 슬라이스

슬라이스(slice)는 컬렉션(collection)을 통째로 참조하는 것이 아닌, 컬렉션의 연속된 일련의 요소를 참조하도록 한다. 슬라이스는 참조자의 일종으로써 소유권을 가지지 않는다.
**슬라이스를 사용하지 않고 구현한 문자열의 첫 번째 단어를 반환하는 함수**

```rust
fn first_word(s: &String) -> usize {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return i;
        }
    }

    s.len()
}
```

이 함수는 `usize`를 반환하고 있는데 이는 `&String`의 컨텍스트에서만 의미가 있는 숫자로 `String`과는 별개의 값으로 향후에도 유효하다는 보장이 없다.
이 함수를 호출하고 난 이후에 `s`가 유효한지 확인할 방법이 없다.

```rust
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s); // word는 값 5를 받습니다

    s.clear(); // 이 코드는 String을 비워서 ""으로 만듭니다

    // 여기서 word에는 여전히 5가 들어있지만, 이 5를 의미있게 쓸 수 있는
    // 문자열은 더 이상 없습니다. word는 이제 전혀 유효하지 않습니다!
}
```

이럴때 활용할 수 있는 것이 문자열 슬라이스이다.

### 문자열 슬라이스

문자열 슬라이스는 `String`의 일부를 가리키는 참조자를 말한다.

```rust
    let s = String::from("hello world");

    let hello = &s[0..5];
    let world = &s[6..11];
```

슬라이스는 내부적으로 시작 위치, 길이를 데이터 구조에 저장하고, 길이 값은 `end_index`값에서 `starting_index`값을 빼서 계산한다.

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="https://doc.rust-kr.org/img/trpl04-06.svg" alt="슬라이스 구조" width="400px"/>
</div>

**슬라이스 사용법 정리**

```rust
let s = String::form("hello");
// index 0 ~ 2
let slice = &s[0..2];
let slice = &s[..2];
// index 3 ~ end
let len = s.len();
let slice = &s[3..len];
let slice = &s[3..];
// index start ~ end
let slice = &s[..];
```

이런 slice를 활용해서 위의 함수를 수정하면

```rust
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
```

공백을 찾았을때 단어의 끝부분의 인덱스를 활용해서 문자열 맨 앞부터 알아낸 위치까지의 문자열 슬라이스를 생성하여 반환하는 방식으로 수정된 버전이다.
이러한 방식을 통해서 컴파일러가 `String`을 가리키는 참조자의 유효함을 보증할 수 있다.

```rust
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear(); // 에러!

    println!("the first word is: {}", word);
}
```

이처럼 오류가 있는 함수를 컴파일시에

```bash
$ cargo run
   Compiling ownership v0.1.0 (file:///projects/ownership)
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
  --> src/main.rs:18:5
   |
16 |     let word = first_word(&s);
   |                           -- immutable borrow occurs here
17 |
18 |     s.clear(); // error!
   |     ^^^^^^^^^ mutable borrow occurs here
19 |
20 |     println!("the first word is: {}", word);
   |                                       ---- immutable borrow later used here

For more information about this error, try `rustc --explain E0502`.
error: could not compile `ownership` due to previous error
```

`claer`함수는 String의 길이를 변경해야 하기 때문에 가변 참조자가 필요하다. 그러나 `println!`는 `word`의 참조자를 활용하기 때문에 불변 참조자가 활성화되어 있다. 그러므로 러스트에서는 `claer` 가변 참조자와 `word`의 불변 참조자가 동시에 존재하는 것을 허락하지 않기 떄문에 컴파일 에러가 발생하게 된다.

### 슬라이스로써의 문자열 리터럴

문자열은 바이너리 내에 저장되는데 문자열 리터럴 또한 슬라이스를 통해서 이해 할 수 있다.

```rust
let s = "Hello, world!";
```

여기서 `s`는 바이너리의 특정 지점을 가리키는 **슬라이스**이다. 그러므로 `s`는 `&str`타입임을 알 수 있고, `&str`은 불변 참조자이기 때문에 문자열 리터럴은 변경 불가능하다.

### 문자열 슬라이스를 매개변수로 활용하기

문자열 슬라이스라면 이를 바로 인수로써 활용할 수 있다. `String`은 `String`슬라이스 또는 `String`에 대한 참조자를 전달할 수 있다.
**예시**

```rust
fn main() {
    let my_string = String::from("hello world");

    // `first_word`는 `String`의 일부 혹은 전체 슬라이스에 대해 작동합니다
    let word = first_word(&my_string[0..6]);
    let word = first_word(&my_string[..]);
    // 또한 `first_word`는 `String`의 전체 슬라이스와 동일한 `String`의
    // 참조자에 대해서도 작동합니다
    let word = first_word(&my_string);

    let my_string_literal = "hello world";

    // `first_word`는 문자열 리터럴의 일부 혹은 전체 슬라이스에 대해 작동합니다
    let word = first_word(&my_string_literal[0..6]);
    let word = first_word(&my_string_literal[..]);

    // 문자열 리터럴은 *곧* 문자열 슬라이스이므로,
    // 아래의 코드도 슬라이스 문법 없이 작동합니다!
    let word = first_word(my_string_literal);
}
```

### 그 외 슬라이스

슬라이스는 여러가지 타입에 사용가능하다.

```rust
let a = [1, 2, 3, 4, 5];
let slice = &a[1..3];
assert_eq!(slice, &[2, 3]);
```

예제에서 활용된 슬라이스는 `&[i32]` 타입입니다. 동작 방식은 문자열 슬라이스와 동일하다.

**참조**
[러스트 공식 가이드 4장 소유권](https://doc.rust-kr.org/ch04-01-what-is-ownership.html)
