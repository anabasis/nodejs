import { atom } from 'jotai'

const init = {
  codeGroupId: '',
  codeGroupName: '',
  codeItemList: [
    {
      code: '',
      sortNumber: 1,
      codeItemMultiLanguageList: [
        {
          languageCode: '',
          codeName: '',
        },
      ],
    },
  ],
}

export const itemInfoAtom = atom(init)

const codeInit = {
  code: '',
  codeGroupId: '',
  sortNumber: 1,
  codeItemMultiLanguageList: [
    {
      languageCode: '',
      codeName: '',
    },
  ],
}
export const newCodeAtom = atom(codeInit)
