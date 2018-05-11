# Variable (변수)

Sass 는 CSS에 변수 개념을 도입해줍니다.
변수로 사용 가능한 형태는 숫자, 문자열, 폰트, 색상, null, lists 와 maps 가 있습니다.
변수를 사용 할 떄는 $ 문자를 사용합니다. 첫 변수를 한번 만들어볼까요?

```sass
$primary-color: #333;
```

변수를 만들어도, 사용하지 않으면 컴파일된 CSS 파일에는 아무것도 나타나지 않음

```scss
# SCSS
$primary-color: #333;

body {
  background-color: $primary-color;
}
```

```css
# CSS
body {
  background-color: #333;
}
```

## Variable Scope (변수 범위)

변수를 특정 selector (선택자) 에서 선언하면 해당 selector 에서만 접근이 가능

```scss
# SCSS
$primary-color: #333;

body {
  $primary-color: #eee;
  background-color: $primary-color;
}

p {
  color: $primary-color;
}
```

```css
#CSS
body {
  background-color: #eee;
}

p {
  color: #333;
}
```

변수를 선언 할 때, 변수를 global (전역) 하게 설정 할 때는 !global 플래그를 사용

```scss
#SCSS
$primary-color: #333;

body {
  $primary-color: #eee !global;;
  background-color: $primary-color;
}

p {
  color: $primary-color;
}
```

```css
# CSS
body {
  background-color: #eee;
}

p {
  color: #eee;
}
```

추가적으로, !default 플래그는 해당 변수가 설정되지 않았거나 값이 null 일떄 값을 설정
이 플래그는 나중에 mixin 을 작성 할 떄 유용하게 사용

```scss
# SCSS
$primary-color: #333;

$primary-color: $eee !default;

p {
  color: $primary-color;
}
```

```css
# CSS
p {
  color: #333;
}
```