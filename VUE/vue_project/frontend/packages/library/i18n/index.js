// 작업자: 오성광
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import Cookies from 'js-cookie'
import { getOptions } from './settings'

const initI18next = async (lng, ns) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language, namespace) => import(`../i18n/locale/${language}/${namespace}.json`)))
    // .init(getOptions(lng, ns))
    .init({
      supportedLngs: ['en', 'ko', 'ja'],
      // detection: {
      //   order: ['cookie'], // 쿠키를 언어 감지 우선순위로 설정
      //   caches: ['cookie'], // 쿠키 캐시 사용
      // },
      resources: {
        en: {
          platform: require(`../i18n/locale/en/platform.json`),
        },
        ko: {
          platform: require(`../i18n/locale/ko/platform.json`),
        },
      },
      // lng,
      lng: Cookies.get('USER_LANGUAGE') || 'en', // 쿠키에서 언어 값 가져오기
      fallbackNS: 'platform',
      fallbackLng: 'en',
      defaultNS: 'platform',
      ns: 'platform',
    })
  return i18nInstance
}

export async function useTranslation(lng, ns, options = {}) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  }
}
