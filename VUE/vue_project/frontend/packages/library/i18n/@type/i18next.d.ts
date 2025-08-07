// 작업자: 오성광
import 'i18next'
import Resources from './resources'

declare module 'i18next' {
  interface CustomTypeOptions {
    // defaultNS: 'translation'
    resources: Resources
  }
}
