import { atom } from 'jotai'

export const paramsAtom = atom({})

export const resetParamsAtom = atom(null, (_, set, { initData }) => {
  if (!initData) return
  set(paramsAtom, initData)
})

export const setParamsAtom = atom(null, (get, set, { data, key }) => {
  const prev = get(paramsAtom)

  /* get Event Params */
  if (key && typeof data === 'object' && 'target' in data) {
    set(paramsAtom, {
      ...prev,
      [key]: data.target.value,
    })
    return
  }

  /* get Key value Params */
  if (key) {
    set(paramsAtom, {
      ...prev,
      [key]: data,
    })
    return
  }

  /* get Object & Array type Params */
  if (!key && typeof data === 'object') {
    set(paramsAtom, {
      ...prev,
      ...data,
    })
  }
})
