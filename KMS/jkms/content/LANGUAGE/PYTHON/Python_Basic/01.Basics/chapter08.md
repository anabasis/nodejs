# Closure

- 클로저란 퍼스트클래스 함수를 지원하는 언어의 네임 바인딩 기술
- 클로저는 어떤 함수를 함수 자신이 가지고 있는 환경과 함께 저장한 레코드
- 함수가 가진 프리변수(free variable)를 클로저가 만들어지는 당시의 값과 레퍼런스에 맵핑하여 주는 역할
- 일반 함수와는 다르게, 자신의 영역 밖에서 호출된 함수의 변수값과 레퍼런스를 복사하고 저장한 뒤, 이 캡처한 값들에 액세스
