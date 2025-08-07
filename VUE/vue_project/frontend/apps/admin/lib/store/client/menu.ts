import { atom } from 'jotai'

export const currentTabIndexAtom = atom(0)

export const currentTabSelectedAtom = atom(null, (get, set, val: string) => {
  const tabInfo: { [key in string]: number } = {
    GNB: 0,
    LNB: 1,
  }
  set(currentTabIndexAtom, tabInfo[val])
})
