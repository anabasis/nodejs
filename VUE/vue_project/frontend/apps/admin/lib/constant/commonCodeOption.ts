//공통코드 등록, 수정 폼 yup
import * as yup from 'yup'

//공통코드 목록
//keyword select
export const commonCodeKeyword = [
  {
    name: 'Code Group',
    value: 'CodeGroup',
  },
  {
    name: 'Item Code',
    value: 'ItemCode',
  },
]

//공통코드 상세, 등록, 수정
//공통코드 언어 칩
export const commonCodeRoundTabData = [{ tabName: 'All' }, { tabName: 'English(Default)' }, { tabName: 'Korean' }]

export const schema = yup.object().shape({
  codeGroupName: yup.string().required(),
  codeGroupId: yup.string().required(),
  codeItemList: yup.array().of(
    yup.object().shape({
      sortNumber: yup.number(),
      code: yup.string().required(),
      useYn: yup.string().required(),
      codeItemMultiLanguageList: yup.array().of(
        yup.object().shape({
          languageCode: yup.string().required(),
          codeName: yup.string().required(),
        })
      ),
    })
  ),
})

//공통코드 등록, 수정
//다국어로 변경
export const changeLanguage = (language: string) => {
  if (language === 'en') {
    return 'English(Default)'
  } else if (language === 'ko') {
    return 'Korean'
  }
  // 다른 언어 코드에 대한 처리가 필요한 경우에도 이곳에서 처리
  return language
}

//아이템코드 폼 init
//default => sortNumber = 1
//add input => sortNumber = fields.length +1
export const AllLanguage = (sortNumber: number, codeItemMultiLanguageList, useYn) => [
  {
    sortNumber: sortNumber,
    code: '',
    useYn: useYn ? 'Y' : 'N',
    codeItemMultiLanguageList: codeItemMultiLanguageList,
  },
]
export const EnLanguage = (sortNumber: number) => [{ sortNumber: sortNumber, code: '', codeItemMultiLanguageList: [{ languageCode: 'en', codeName: '' }] }]
export const KoLanguage = (sortNumber: number) => [{ sortNumber: sortNumber, code: '', codeItemMultiLanguageList: [{ languageCode: 'ko', codeName: '' }] }]
