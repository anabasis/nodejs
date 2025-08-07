import { atom } from 'jotai'

const initVersionForm = {
  softwareNumber: 0,
  version: '',
  releaseNote: '',
  fileNumber: 0,
}
export const newVersionAtom = atom(initVersionForm)
