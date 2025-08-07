import { atom } from 'jotai'
import { QnaManageMeberListType } from '@type/qna'
import { selectAtom } from 'jotai/utils'

export const isReplyAtom = atom(false)

export const qnaNumAtom = atom(0)
export const qnaCommentCountAtom = atom(0)

/* 추후 jotai로 데이터 가져와야할 부분 */

export const isSaveAtom = atom(false)

export const checkedAtom = atom<QnaManageMeberListType[]>([])
