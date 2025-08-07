import { atom } from 'jotai'

import { DetailGuideDetailReturnType } from '@type/detail-guilde'

const initData = {
  guideNumber: 0,
  title: '',
  moveParameter: '',
  createUid: '',
  createDate: '',
  modifierUid: '',
  modifyDate: '',
  guideAttachmentRequestList: [],
}

export const detailGuideDataAtom = atom<DetailGuideDetailReturnType>(initData)
