import { atom } from 'jotai'

const init = {
  notificationTypeCode: '',
  title: '',
  notificationCode: '',
  landingUrl: '',
  // text: '',
  notificationMultiLanguage: [
    {
      languageCode: '',
      text: '',
    },
  ],
}

export const notificationBasicAtom = atom(init)
// export const notificationBasicAtom = atom([])

export const newListAtom = atom([])

export const isLoading = atom(false)
