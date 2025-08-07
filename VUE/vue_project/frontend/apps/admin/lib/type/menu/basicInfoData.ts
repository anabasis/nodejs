import { FileResType } from 'library/type/common'

export interface IBasicInfoData {
  navigationLocation: string
  system: string
  menuDepth: string
  menuName: string
  menuURL: string
  icon: {
    default: FileResType
    hover: FileResType
    active: FileResType
  }
}
