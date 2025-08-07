import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'
import { LibraryCommonCodeType, LibraryManualListDetailType } from '@type/library'
export type LibraryType = {
  title?: string
  description?: string
}

/* Library Card */
const filterData = (data, id) => data.filter((item) => item.manualsId === id)

const filterIds = (data) => data?.map((item) => item.manualsId)

export const initCardData = {
  manualsTitle: '',
  manualsDescription: '',
  manualsImageFileTitle: '',
}

export const libDataAtom = atom([])

export const getCardIdsIdsAtom = atom((get) => filterIds(get(libDataAtom)))

export const libCardAtomFamily = atomFamily((id?: number) =>
  atom((get) => {
    if (id) {
      return id && filterData(get(libDataAtom), id)[0]
    }
    return initCardData
  })
)

export const isPluseEditAtom = atom(false)

export const addPlusEditAtom = atom(false)

export const manualsIdAtom = atom(0)

export const iconSelectedIconAtom = atom('')

/* Library List */

export const libInitData = {
  librNum: 0,
  librCatNum: 0,
  titl: '',
  cont: '',
  dowlUseYn: '',
  openLvlCd: '',
  fileInfoResponses: [],
  crtrDt: '',
  mdfDt: '',
  ptlCorpCode: [],
}

export const commonDataAtom = atom<LibraryCommonCodeType>({
  openLevel: [],
})

export const libListDataAtom = atom<LibraryManualListDetailType>(libInitData)
