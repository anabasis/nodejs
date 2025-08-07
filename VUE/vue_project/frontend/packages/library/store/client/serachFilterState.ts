import { atom } from 'jotai'

export const currentPageAtom = atom(0)

export const searchParamsAtom = atom({})

export const resetParamsAtom = atom(null, (_, set, { initData }) => {
  if (!initData) return
  set(searchParamsAtom, initData)
})

export const setSearchParamsAtom = atom(null, (get, set, { data, key }) => {
  const prev = get(searchParamsAtom)

  /* get Event Params */
  if (key && typeof data === 'object' && 'target' in data) {
    set(searchParamsAtom, {
      ...prev,
      [key]: data.target.value,
    })
    return
  }

  /* get Key value Params */
  if (key) {
    set(searchParamsAtom, {
      ...prev,
      [key]: data,
    })
    return
  }

  /* get Object & Array type Params */
  if (!key && typeof data === 'object') {
    set(searchParamsAtom, {
      ...prev,
      ...data,
    })
  }
})
