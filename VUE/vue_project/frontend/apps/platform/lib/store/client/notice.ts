import { atom } from 'jotai'
import { atomFamily, selectAtom } from 'jotai/utils'

export const langauageDataAtom = atom([])

export const langauageDataAtomFamily = atomFamily((id: number) => atom((get) => get(langauageDataAtom)[id]))

export const langauageDataTagName = selectAtom(langauageDataAtom, (list) => list.map((el) => ({ tabName: el.langauage })))
