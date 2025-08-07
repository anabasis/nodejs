import { atom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { paramsAtom } from 'library/store/client/paramsState'
import { NoticeCommonCodesType, NoticeAddParamsType, NoticeDetailReturnType } from '@type/notice'
import uuid from 'react-uuid'

export const noticeInitData = {
  noticeTypeCode: '',
  noticeCategoryCode: '',
  exposureTypeCode: '',
  exposurePeriodTypeCode: '',
  exposureFrequencyCode: '',
  openLevelCode: '',
  noticeAttachment: [],
  noticeMultiLanguage: [],
  noticeNumber: 0,
  title: '',
  noticeType: '',
  noticeCategory: '',
  openLevel: '',
  exposureFrequency: '',
  exposurePeriodType: '',
  createDate: '',
}

export const noticeDataAtom = atom<NoticeDetailReturnType>(noticeInitData)

export const commonDataAtom = atom<NoticeCommonCodesType>({
  category: [],
  type: [],
  openLevel: [],
  exposureFrequencyCode: [],
  exposurePeriodTypeCode: [],
  exposureTypeCode: [],
})

export const noticeCategoryAtom = selectAtom(commonDataAtom, (list) => list?.category)
export const paramsDataAtom = atom((get) => get(paramsAtom))

export const editorFormEditAtom = atom(null, (get, set) => {
  const params = get(paramsAtom) as NoticeAddParamsType
  const codtionData = [...(params?.noticeMultiLanguage || [])]

  const newArr = codtionData?.splice(1, params?.noticeMultiLanguage?.length - 1).map((el) => {
    return {
      id: uuid(),
      ...el,
    }
  })

  set(editorFormAtom, newArr)
})
export const editorFormAtom = atom([])
