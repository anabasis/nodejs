// 작업자: 오성광
import 'i18next'
import common from './locale/en/common.json'
import insilico from './locale/en/insilico.json'
import platform from './locale/en/platform.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1'
    resources: {
      ns1: typeof ns1
      ns2: typeof ns2
    }
  }
}
