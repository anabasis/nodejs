// 작업자: 오성광
export const fallbackLng = 'en'
export const languages = [fallbackLng, 'ko']
export const defaultNS = 'platform'

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
