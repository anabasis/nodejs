import { SignUpTermsAgreementType } from '@type/signup/SignUpType'
import { atom } from 'jotai'

export const newCoEmailAtom = atom<string>('')

export const passwordAtom = atom<string>('')

export const existedEmailAtom = atom<boolean>(false)

export const checkListAtom = atom<boolean[]>([])

export const temrsListAtom = atom([])

export const termsLanguageListAtom = atom([])

export const termsAgreementListAtom = atom<SignUpTermsAgreementType[]>([])
