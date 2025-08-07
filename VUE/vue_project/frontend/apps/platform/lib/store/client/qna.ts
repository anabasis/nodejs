import { atom } from 'jotai'
import { OpenLevelType, QnaDetailType } from '@type/qna'
import { selectAtom } from 'jotai/utils'

const qnaDetailInitData = {
  type: '',
  category: '',
  module: '',
  title: '',
  content: '',
  openLevel: '',
  qnaNum: 0,
  userUid: '',
  writer: '',
  status: '',
  createDate: '',
  modifyDate: '',
  qnaStatus: '',
  qnaCategory: '',
  qnaType: '',
  qnaModule: '',
  openLevelCode: '',
  prtnUser: [],
  qnaAttachResponse: [],
}

export const libraryDataAtom = atom([])

export const qnaNumAtom = atom(0)

export const qnaCommentCountAtom = atom(0)

export const qnaDetailDataAtom = atom<QnaDetailType>(qnaDetailInitData)

/* 추후 jotai로 데이터 가져와야할 부분 */

export const isSaveAtom = atom(false)

export const checkedAtom = atom<OpenLevelType[]>([])

export const checkedCount = selectAtom(checkedAtom, (checkedList) => checkedList.length)
