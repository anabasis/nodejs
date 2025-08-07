<!-- 작업자: 오성광 -->

# I18N 사용 방법

## <span style='color: #2D3748; background-color:#fff5b1'>json 파일 위치</span>

- path: /packages/library/i18n/locale

## <span style='color: #2D3748; background-color:#fff5b1'>json 파일 정리 방법</span>

ex) /packages/library/i18n/locale/en/common.json

```bash
{
  "search": "search result"
}
```

ex) /packages/library/i18n/locale/ko/common.json

```bash
{
  "search": "검색 결과"
}
```

## <span style='color: #2D3748; background-color:#fff5b1'>1개의 nameSpace 사용 방법</span>

- 파일 상단에 import

```bash
import { useTranslation } from 'library/i18n/client'
```

사용하고자 하는 컴포넌트 상단에 useTranslation 선언

```bash
const { t } = useTranslation('common')
```

t() 함수 안에 json 키값 설정

```bash
<p>{t('search')}</p>
```

## <span style='color: #2D3748; background-color:#fff5b1'>2개 이상의 nameSpace 사용 방법</span>

- 파일 상단에 import

```bash
import { useTranslation } from 'library/i18n/client'
```

- 사용하고자 하는 컴포넌트 상단에 useTranslation 선언
- default nameSpace 넣기

```bash
const { t, i18n } = useTranslation('common')
```

추가로 원하는 nameSpace 로드 방법

```bash
  useEffect(() => {
    i18n.loadNamespaces('insilico') // custom nameSpace 로드
  }, [i18n])
  useEffect(() => {
    i18n.loadNamespaces('platform') // custom nameSpace 로드
  }, [i18n])
```

사용 방법

```bash
<h1>{t('platform:title')}</h1>
<h1>{t('insilico:title')}</h1>
<h1>{t('search')}</h1>
```

## <span style='color: #2D3748; background-color:#fff5b1'>다국어 영역에 변수 사용 방법</span>

- 다국어 리로스 파일에서 '{{ }}' 로 변수 감싸기

```bash
{
  "title": "안녕! {{_0}}"
}
```

- 사용하고자 하는 컴포넌트에서 변수 사용

```bash
 <p>{t('title', { _0: 'insil' })}</p>
```

- 결과

```bash
 안녕! insil
```

## <span style='color: #2D3748; background-color:#fff5b1'>root package 에서 import</span>

```bash
import { useTranslation } from 'library/i18n/client'
```

## <span style='color: #2D3748; background-color:#fff5b1'>언어 변경 가이드</span>

사용하고자 하는 컴포넌트 상단에 useTranslation 선언

```bash
const { t, i18n } = useTranslation('common')
```

- i18n.changeLanguage() 함수 사용
- 쿠키 설정

```bash
 const changeLang = (lang: string) => {
    i18n.changeLanguage(lang)
    Cookies.set('USER_LANGUAGE', lang, { expires: 365 })
  }
```

## <span style='color: #2D3748; background-color:#fff5b1'>필요 플러그인 정리</span>

```bash
 "react-i18next": "^13.0.1",
 "i18next": "^23.2.7",
 "accept-language": "^3.0.18",
 "i18next-browser-languagedetector": "^7.1.0",
 "i18next-resources-to-backend": "^1.1.4",
 "js-cookie": "^3.0.5",
 "@types/js-cookie": "^3.0.3",
```

## <span style='color: #2D3748; background-color:#fff5b1'>스프레드시트 url</span>

협의 후 작업 예정

## <span style='color: #2D3748; background-color:#fff5b1'>기타사항</span>

- 다국어 json 파일 관리 방식 및 스프레드 시트 관리 방식은 협의 후 가이드 작성 예정
- 현재 client side 기준 가이드, server side 필요시 추가 작업 필요, 추가 가이드 필요
- 미사용 코드 추후 삭제 예정
