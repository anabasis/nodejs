import { mapKeys } from 'lodash-es'
import { isEmpty, omitBy, trim, every, some, isNumber } from 'lodash-es'
import { CommonSelectOptionType, FileResType } from '../type/common'
import { FileRequestType } from '../hook'
import Cookies from 'js-cookie'

// 서버 상태 확인
export const isBrowser = typeof window === 'object'
export const isDev = process.env['NODE_ENV'] === 'development'

export const createMarkup = (content: string) => {
  return { __html: content }
}

// obj를 keys, values 로 반환
export const separationObject = (obj: { [key in string]: string }) => {
  const keys = Object.keys(obj)
  const values = Object.values(obj)

  return { keys, values }
}

/* check obj all empty value */
export const checkAllTrim = (obj: { [key in string]: string | number }) => {
  return Object.values(obj).every((ob) => String(ob).trim() !== '')
}

/* obj empty check / false => empty */
export const isEmptyCheck = (obj: { [key in string]: unknown }) => !isEmpty(obj)

/* 객체의 값이 모두 비워져있으면  => false반환  */
export const isEmptyPropertyCheck = (obj: { [key in string]: unknown }) => !every(obj, isEmpty)

/* 객체의 프로퍼티 value값이 하나라도 없으면 false 반환  */
export const isEmptyAnyPropertyCheck = (obj: { [key in string]: unknown }) => some(obj, (value) => isEmpty(trim(String(value))))

/* 객체 프로퍼티 value값들이 모두 값이 있으면 false / 하나라도 없으면 true
   객체안의 배열까지 점검해주는 벨리데이션.
   버튼 disabled용이라 true /false 상황을 반대로했음 
*/
export const isEmptyEveryCheck = (obj: { [key in string]: unknown | unknown[] }) =>
  some(obj, (value, key) => {
    const keys = obj[key]
    if (Array.isArray(keys)) {
      return !every(keys, (item: unknown[]) => {
        return every(item, (value) => !isEmpty(String(value)))
      })
    }

    return isEmpty(String(value))
  })

/* 배열안의 객체안의 값이 모두 있을땐 false, 없을땐 true  */

/* 배열안의 객체 프로퍼티 value값들이 모두 값이 있으면 false / 하나라도 없으면 true */
export const isArrayEmptyPropertyCheck = (arr: unknown[]) =>
  !every(arr, (item: unknown[]) => {
    return every(item, (value) => !isEmpty(value))
  })

// 공통 코드 key 변환
export const convertOptionKey = (obj: object, names = ['cd', 'cdNm'] as string[]) =>
  mapKeys(obj, (val, key) => {
    return key === names[0] ? 'value' : key === names[1] ? 'name' : key
  })

// 공통 코드 그룹을 반환
export const getCode = (code: string) =>
  fetch(`${process.env['NEXT_PUBLIC_URL_API_PLATFORM']}/common/code/${code}/item-list?useYn=Y`)
    .then((res) => res.json())
    .then((data) => data.map((i: object) => convertOptionKey(i)))

// localStorage 토큰 반환
export const getToken = (token?: string) => {
  if (isBrowser) {
    let aTkn = localStorage.getItem('aTkn')

    if (token) {
      localStorage.setItem('aTkn', token)
      return token
    } else {
      return aTkn
    }
  }
}

// const getJsonAuth = () => isBrowser && JSON.parse(localStorage.getItem('authInfo'))

// export const getToken = () => {
//   if (isBrowser && getJsonAuth()) {
//     const { token_type, access_token } = getJsonAuth()
//     return access_token && `${token_type} ${access_token}`
//   }
// }

/* get common group code */
export const getCodeGroup = async (commonCodes: { [key in string]: string }) => {
  const { keys, values } = separationObject(commonCodes)
  const setData: { [key in string]: unknown[] } = {}
  await Promise.all(
    values.map(async (v: string, i) => {
      const data = await getCode(v)
      setData[keys[i]] = data
      return setData
    })
  ).catch((e) => {
    console.error(e)
  })
  return setData
}

/* 객체 데이터 타입스크립트 자동화*/
/* return data -> typescript auto */
export const getPropertyTypes = (obj: { [key in string]: unknown }) => {
  const res = Object.keys(obj).reduce((acc: { [key in string]: unknown }, key) => {
    acc[key] = typeof obj[key]
    return acc
  }, {})
  return
}

/* select 'All' setting */
export const selectInitValue = (listArr: { [key in string]: unknown }) =>
  Object.fromEntries(
    Object.entries(listArr).map(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        return [key, [{ value: '', name: 'All' }, ...value]]
      } else {
        return [key, [{ value: '', name: 'All' }]]
      }
    })
  )

// sessionStorage isRoot 반환
export const getIsRoot = () => isBrowser && sessionStorage.getItem('isRoot') == 'true'

// sessionStorage isAdmin 반환
export const getIsAdmin = () => isBrowser && sessionStorage.getItem('isAdmin') == 'true'

// 플랫폼 도메인 반환
export const getRootUrl = (): string => {
  let res = ''
  if (isBrowser) {
    const root = isDev ? process.env['NEXT_PUBLIC_URL_LOCAL_PLATFORM'] : process.env['NEXT_PUBLIC_URL_PLATFORM']
    res = !getIsRoot() ? root ?? '' : ''
  }
  return res
}

/* 해더부분 밑에 들어가는 설명데이터를 가공해주는 함수 */
export const setDescListData = (descTitleArr: string[], listInfoValueArr: (string | number | undefined)[]) => {
  return descTitleArr.reduce(
    (
      accumulator: {
        listTitle: string
        listInfo: string | number | undefined
      }[],
      currentTitle,
      index
    ) => {
      const currentInfo = listInfoValueArr?.[index]
      if (currentInfo !== undefined) {
        accumulator.push({ listTitle: currentTitle, listInfo: currentInfo })
      }
      return accumulator
    },
    []
  )
}

/* initData의 객체 키값만 res에서 필터링하여 객체를 반환해주는 함수 */
export const initDataWithRes = (initData: { [key in string]: unknown }, res: { [key in string]: unknown }) => {
  const clone = filterNonEmptyValues(res)
  const cloneKey = Object.keys(clone)
  return Object.keys(initData).reduce((result, key) => {
    if (cloneKey.includes(key)) {
      result[key] = clone[key]
    }
    return result
  }, {} as { [key in string]: unknown })
}

/* 빈값 없애고 필터링하여 객체를 반환해줌 함수 */
export const filterNonEmptyValues = (res: { [key in string]: unknown }) => omitBy(res, (val) => isEmpty(val) && !isNumber(val))

/* 
    타입 4가지
    array => 각 key, value값이 name / value가 포함되어있지않을경우 
    init => name / value setting
    '' => default 
    code => code api => init name / value  setting
*/
export const getSelectPromiseSettled = <T>(convertArr: { [key in string]: string | string[] }, callbackList: Promise<T>[]) => {
  return Promise.allSettled<T>(callbackList)
    .then((result) => {
      return result.reduce((acc, cur, i) => {
        if (cur.status === 'fulfilled') {
          const key = Object.keys(convertArr)
          const mappingKeys = Object.values(convertArr)[i]
          const data = cur.value
          if (!Array.isArray(data)) return acc

          acc[key[i]] = data.map((common) => {
            if (mappingKeys === 'init') {
              return mapKeys(common, (val, key) => {
                const [name, value] = [key.toLocaleLowerCase().includes('name'), key.toLocaleLowerCase().includes('code')]

                return name ? 'name' : value ? 'value' : key
              })
            }
            if (Array.isArray(mappingKeys)) {
              return convertOptionKey(common, mappingKeys)
            }
            return common
          })
        }

        return acc
      }, {} as { [key in string]: CommonSelectOptionType[] })
    })
    .catch((e) => {
      console.log(e)
    })
}

// PUB: CDN 파일 url 변환
export const getCdnFileUrl = (file: FileResType): string | null => {
  if (!file || !file.filePath || !file.fileName || !file.fileExtension) return null
  const { filePath, fileName, fileExtension } = file
  return `${process.env['NEXT_PUBLIC_URL_CDN_FILE']}/${filePath}${fileName}.${fileExtension}`
}

// PUB: CDN 파일 url 변환
export const getCdnPreviewUrl = (file: Partial<FileRequestType>): string | null => {
  if (!file || !file.key) return null
  return `${process.env['NEXT_PUBLIC_URL_CDN_FILE']}/${file.key}`
}

export const jsCookies = Cookies

// // getPreviewImage
// export const getPreviewImageUrl = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     if (!file || !file.type.startsWith('image/')) reject('이미지 파일이 아닙니다.')

//     const reader = new FileReader()
//     reader.readAsDataURL(file)

//     reader.onloadend = () => {
//       const result = reader.result
//       if (result && typeof result === 'string') {
//         resolve(result)
//       } else if (result instanceof ArrayBuffer) {
//         const blob = new Blob([result], { type: file.type })
//         const blobUrl = URL.createObjectURL(blob)
//         resolve(blobUrl)
//       } else {
//         reject('미리보기 생성 실패')
//       }
//     }
//   })
// }

export const scrollTopMain = (top = 0) => {
  const mainContainer = document.querySelector('#main_container') as HTMLElement | null
  if (mainContainer) {
    mainContainer.scrollTop = top
  }
}

export const getQueryParameter = (params: { [key in string]: string | number }) => {
  return Object.entries(params)
    .filter(([_, value]) => !isEmpty(value?.toString()))
    .map(([key, value]) => `&${key}=${value}`)
    .join('')
}
