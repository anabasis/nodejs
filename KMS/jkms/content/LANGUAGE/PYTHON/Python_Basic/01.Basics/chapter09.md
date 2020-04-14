# Decorators

## Closure

데코레이터의 본질은 클로저입니다. 이미 알고 계시다면 과감하게 더 이상 읽지 않으셔도 됩니다!
클로저가 뭐냐 하면 함수에 함수

```python
# 하스스톤의 안녕로봇
def annoy_o_tron(message):

    # 안녕로봇이 인사할 수 있도록 해주는 내부 구현
    def greeting(name):
      print(f'{message} - {name}!')
    return greeting

    # annoy_o_tron 함수의 반환값은 def greeting(name): print(...) 입니다
    # print(f'Hello - {name}') 함수를 값처럼 가지고 있는 상태라고 할 수 있겠네요
    hello_o_tron = annoy_o_tron('Hello')

    # print('Hello - Doondoony!') 함수를 호출합니다
    hello_o_tron('Doondoony') # Hello - Doondoony!
    hello_o_tron('velog') # Hello - velog!
```

## 데코레이터의 종류

1. 함수 데코레이터
2. 클래스 데코레이터

### 함수 데코레이터

```python
def logger(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        print(f'Result: {result}')
        return result
    return wrapper

    @logger
    def add(a, b):
        return a + b

    result = add(20, 22) # Result: 42
    print(result) # 42
```

### 클래스 데코레이터

```python
class Logger(object):
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        result = self.func(*args, **kwargs)
        print(f'Result: {result}')
        return result

    @Logger
    def add(a, b):
        return a + b

    result = add(20, 22) # Result: 42
    print(result) # 42
```

### 람다 표현식 활용한 데코레이터

```python
logger = lambda fn: lambda *args, **kwargs: print(f'Result: {fn(*args, **kwargs)}')
## 함수 실행 결과만 반환, print는 그대로 실행
## logger = lambda fn: lambda *args, **kwargs: (print(f'Result: {fn(*args, **kwargs)}'), fn(*args, **kwargs))[1]

@logger
def add(a, b):
    return a + b

result = add(20, 22) # Result: 42
print(result) # None...
```

## 데코레이터 문법

위의 예제에서도 알 수 있지만 함수 또는 클래스, 메서드 등 callable한 객체의 선언부 상단에 @로 시작하는 함수명을 적어주는 형태를 띄어야 합니다!
(Pycharm 에서 데코레이터 뒤에 함수나 다른 데코레이터가 오지 않을 경우 Syntax Error: @ or def expected 에러를 표시합니다)

```python
@timer # 함수의 정의부 상단에 적용할 데코레이터를 작성합니다
def foo():
    pass

@timer # 클래스 정의부 상단에 적용할 데코레이터를 작성해도 됩니다
class Bar(object):
    pass

class Baz(object):
    @timer # 클래스의 메서드 당연하게도 됩니다
    def qux(self):
        pass

@timer
doondoon = 'Doondoony' # [X] 이런건 안됩니다...

# callable 한 객체에는 모두 사용 가능합니다
callable(foo) # True
callable(Bar) # True
callable(Baz().qux) # True
callable(doondoon) # False
```

## 클러저의 축약문법

```python
def synchronized(lock):
    # codes below...
    pass

def classmethod(arg):
    # codes below...
    pass

# 1안 일반 ######################
def foo(cls):
    # codes below...
    pass

foo = synchronized(lock)(foo)
foo = classmethod(foo)


# 2안 축약문법 ######################
@classmethod
@synchronized(lock)
def foo(cls):
    pass
```

## 데코레이터 실행 순서

- 가장 중요한 건 함수 위에 @decorator 를 적용할 때 greeting 함수가 decorator 함수 안으로 들어감
- 중첩된 데코레이터는 바로 위에서 설명드렸다시피 아래에서 위로 실행

```python
def decorator(func):
    print('in decorator function') #1
    # 2번과 3번의 실행 순서는 비즈니스 로직에 달려있습니다 (데코레이터와는 순서 무관)
    def wrapper(*args, **kwargs):
        print('in wrapper function') #2
        func(*args, **kwargs) #3
        return wrapper

@decorator
def greeting():
    print('in greeting')

if __name__ == '__main__':
    greeting()
```

## 사용방법

- 반복을 줄임
- 메소드나 함수의 책임을 확장
- 가독성이 떨어짐

### 데코레이터를 사용하지 않는 경우

```python
import functools
import time
  
# 시작, 종료 시간을 체크해서 프린트 하는 코드를 함수안에 반영합니다.
def huge_add(a, b):
    start = time.time()
    result = a + b
    time.sleep(1)
    print(f'add Elapsed time: {round((time.time() - start), 4)} seconds')
    return result

# huge_add 와 같은 일을 하는 코드가 반복됩니당
def huge_subtract(a, b):
    start = time.time()
    result = a + b
    time.sleep(1)
    print(f'subtract Elapsed time: {round((time.time() - start), 4)} seconds')
    return result

# 같은 일을 하는 코드가 반복됩니당
def huge_multiply(a, b):
    start = time.time()
    result = a * b
    time.sleep(1)
    print(f'multiply Elapsed time: {round((time.time() - start), 4)} seconds')
    return result
  
if __name__ == '__main__':
    huge_number = 10e8
    huge_add(huge_number, huge_number)
    huge_subtract(huge_number, huge_number)
    huge_multiply(huge_number, huge_number)
  
# 출력
# add Elapsed time: 1.0039 seconds
# subtract Elapsed time: 1.0048 seconds
# multiply Elapsed time: 1.0048 seconds
```

### 데코레이터를 사용하는 경우

```python
import functools
import time

def timer(func):

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f'{func.__name__} took {round((time.time() - start), 4)} seconds')
        return result
    return wrapper

# timer 데코레이터 적용
@timer
def huge_add(a, b):
    result = a + b
    time.sleep(1)
    return result

@timer
def huge_subtract(a, b):
    result = a + b
    time.sleep(1)
    return result

@timer
def huge_multiply(a, b):
    result = a * b
    time.sleep(1)
    return result

if __name__ == '__main__':
    huge_number = 10e8
    huge_add(huge_number, huge_number)
    huge_subtract(huge_number, huge_number)
    huge_multiply(huge_number, huge_number)

# 출력, 이제는 간편하게 호출된 함수 이름도 확인할 수 있습니다
# huge_add took 1.0037 seconds
# huge_subtract took 1.0044 seconds
# huge_multiply took 1.0028 seconds

```

## 예제

```python
from urllib.parse import urljoin

import urllib3
from urllib3.exceptions import HTTPError


def response_ok(func):
    def validate(*args, **kwargs):
        result = func(*args, **kwargs)
        if result.status != 200:
            raise HTTPError(f'Request Failed with status code {result.status}')
            return result
        return validate

@response_ok
def fetch(path):
    with urllib3.PoolManager() as http:
        return http.request('GET', path)

if __name__ == '__main__':
    api = 'http://httpbin.org'
    url = urljoin(api, 'ip')  # 존재하는 URL 입니다. 200 응답을 기대합니다
    wrong_url = urljoin(api, 'pi')  # 존재하지 않는 URL 입니다. 404 응답을 기대합니다
    fetch(url).data.decode()  
    fetch(wrong_url).data.decode()
    # urllib3.exceptions.HTTPError: Request Failed with status code 404

# 출력
# 올바른 URL로 접속 시도시
# '{\n  "origin": "1.2.3.4"\n}\n'
# 잘못된 URL로 접속 시도시
# urllib3.exceptions.HTTPError: Request Failed with status code 404
```

## 데코레이터 장단점

### 장점

1. 중복을 제거하고, 코드가 간결해짐
2. 클로저를 직접 작성하는 것 보다 문법적으로 간결함
3. 부수 효과 없는 함수로 작성된 데코레이터의 경우, 조합해서 사용하기 용이

### 단점

1. 가독성이 떨어짐
2. 특정 메소드/함수 한정적인 데코레이터는 재사용성 떨어짐
3. 디버깅이 어려움
