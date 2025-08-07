import { ModalType } from 'library/hook/useModal'
import { MyInfoType } from './myInfoType'

export interface MyPageProp {
  data: MyInfoType
  popup?: ModalType
}
