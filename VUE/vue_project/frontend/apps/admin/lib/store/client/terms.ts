import { atom } from 'jotai'
import { atomFamily, selectAtom } from 'jotai/utils'
import { paramsAtom } from 'library/store/client/paramsState'
import { TermsCommonCodes, TermsDetailType } from '@type/terms'
import uuid from 'react-uuid'

export const termsIniData = {
  termsVersionNum: null,
  termsNum: null,
  termsCategoryName: '',
  content: '',
  langName: '',
  countryName: '',
  termsCategoryCode: '',
  version: '',
  countryCode: '',
  releaseDate: '',
  conditionsDetail: [],
}

export const termsDataAtom = atom<TermsDetailType>(termsIniData)

export const termsCategoryNameAtom = selectAtom(termsDataAtom, (list) => list?.termsCategoryName)

export const termsDataFamilyAtom = atomFamily((id: number) =>
  atom((get) => {
    const termsData = get(termsDataAtom)
    return termsData?.conditionsDetail[id]
  })
)
export const termsVersionAtom = atom('')

export const commonDataAtom = atom<TermsCommonCodes>({})

export const paramsDataAtom = atom((get) => get(paramsAtom))
export const editorFormEditAtom = atom(null, (get, set) => {
  const params = get(paramsAtom) as TermsDetailType
  const codtionData = [...(params?.conditionsDetail || [])]

  const newArr = codtionData?.splice(1, params?.conditionsDetail?.length - 1).map((el) => {
    return {
      id: uuid(),
      ...el,
    }
  })
  set(editorFormAtom, newArr)
})
export const editorFormAtom = atom([])
