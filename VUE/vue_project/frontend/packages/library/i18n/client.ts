// 작업자: 오성광
'use client'

import { useEffect, useState } from 'react'
import i18next, { FlatNamespace, KeyPrefix } from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationOptions, UseTranslationResponse, FallbackNs } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, languages } from './settings'
import Cookies from 'js-cookie'

interface ExtendedUseTranslationResponse<Ns extends string = string, KPrefix extends string | undefined = string | undefined>
  extends UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  changeLang: (language: string) => void
}

const runsOnServerSide = typeof window === 'undefined'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`./locale/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // 클라이언트에서 언어 감지
    detection: {
      order: ['cookie'],
    },
    preload: runsOnServerSide ? languages : [],
  })

export function useTranslation<Ns extends FlatNamespace, KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined>(
  ns?: Ns,
  options?: UseTranslationOptions<KPrefix>
): ExtendedUseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret

  const changeLang = (language: string) => {
    i18n.changeLanguage(language)
    Cookies.set('USER_LANGUAGE', language)
  }

  if (!Cookies.get('USER_LANGUAGE')) Cookies.set('USER_LANGUAGE', 'en')
  const lang = Cookies.get('USER_LANGUAGE')

  if (runsOnServerSide && lang && i18n.resolvedLanguage !== lang) {
    i18n.changeLanguage(lang)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lang || i18n.resolvedLanguage === lang) return
      i18n.changeLanguage(lang)
    }, [lang, i18n])
  }

  return { ...ret, changeLang } as ExtendedUseTranslationResponse<FallbackNs<Ns>, KPrefix>
}
