import { atom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { CorporatePartiallyType } from 'library/type/common'

export const checkedAtom = atom<CorporatePartiallyType[]>([])

export const checkedCount = selectAtom(checkedAtom, (checkedList) => checkedList.length)

export const prtnUserAtom = selectAtom(checkedAtom, (checkList) => {
  return checkList.map((check: CorporatePartiallyType) => {
    return { corporationNum: check?.corporationNum }
  })
})

export const setCheckAtom = atom(
  (get) => get(checkedAtom),
  (get, set, { checked, item }: { checked: boolean; item: CorporatePartiallyType }) => {
    if (checked) {
      const prev: CorporatePartiallyType[] = get(checkedAtom)
      set(checkedAtom, [...prev, item])
    }
    if (!checked) {
      const checkedItem = get(checkedAtom)
      set(
        checkedAtom,
        checkedItem.filter((data) => data?.corporationNum !== item.corporationNum)
      )
    }
  }
)

export const removeSelectedAtom = atom(
  (get) => get(checkedAtom),
  (get, set, corporationNum) => {
    const prev: CorporatePartiallyType[] = get(checkedAtom)
    set(
      checkedAtom,
      prev.filter((check) => check?.corporationNum !== corporationNum)
    )
  }
)
