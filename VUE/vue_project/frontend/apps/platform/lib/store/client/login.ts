import { atom } from 'jotai'

export const emailAtom = atom<string>('')

export const passwordAtom = atom<string>('')

export const checkPasswordAtom = atom<string>('')

export const passwordErrorAtom = atom<boolean>(false)

export const checkPasswordErrorAtom = atom<boolean>(false)

export const codeMatchAtom = atom<boolean>(false)

export const findCorpDomain = (email: string) => {
  const atIndex = email?.indexOf('@')
  if (atIndex !== -1) {
    const domain = email?.slice(atIndex)
    return domain //megazone.syyang@seegene.com -> @seegene.com
  }
  return null
}
