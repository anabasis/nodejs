import { find } from 'lodash-es'

export const useCommonCode = (params?) => {
  const findCodeNameByLangCode = (multiLangList: { languageCode: string; codeName: string }[], languageCode: string) => {
    const codeData = find(multiLangList, (item) => {
      return item.languageCode === languageCode
    })

    return codeData ? codeData.codeName : ' '
  }

  return {
    findCodeNameByLangCode,
  }
}
