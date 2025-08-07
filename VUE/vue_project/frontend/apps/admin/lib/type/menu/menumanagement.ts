import { FileResType } from 'library/type/common'
import { IAuthority } from './menuTypes'

export type MenuName = {
  crtDt?: string
  crtrUid?: string
  langCd: string
  mdfDt?: string
  mdfrUid?: string
  mnuNm: string
}

export type MenuItemApiRes = {
  menuNum: number
  menuParentNum: number
  menuDepth: number
  menuSortNum: number
  menuSystemCode: string
  menuUrl: string
  menuUpdateDate: string
  tsyMnuMlg: MenuName[]
  fileInfoResponse: FileResType
  menuRoleMap: {
    A?: String[]
    B?: String[]
  }
  childrenData?: MenuItemViewType[] | ManageMenuType[]
}

export type MenuItemInitType = {
  menuNum: number
  menuParentNum: number
  menuDepth: number
  menuSortNum: number
  menuSystemCode: string
  menuUrl: string
  menuUpdateDate: string
  menuName: string
  menuIconPath: string
  menuRoleMap: {}
}

export type MenuItemViewType = {
  menuNum: number
  order: number
  depth: number | null
  icon: string | null
  menuName: MenuName[]
  menuRoleMap: {
    A?: String[]
    B?: String[]
  }
  menuUpdateDate: String
  childrenData?: MenuItemViewType[]
}

export type MenuListApiRes = {
  gnbList: MenuItemApiRes[]
  lnbList: MenuItemApiRes[]
}

export type MenuListViewType = {
  gnbList: MenuItemViewType[]
  lnbList: MenuItemViewType[]
}

export type ManageMenuListType = {
  gnbList: ManageMenuType[]
  lnbList: ManageMenuType[]
}

export type MenuPostFormat = {
  menuParentNum: number
  menuDepth: number
  menuSortNum: number
  menuTypeCode: string
  menuLocationCode: string
  menuSystemCode: string | null
  menuUrl: string
  menuMlgInfoDtoRequests: {
    menuLanguageCode: string
    menuName: string
  }[]
  menuRoleInfoDtoRequest: {
    roleNum: number
    readYn: string
    createYn: string
    updateYn: string
    deleteYn: string
  }[]
  menuIconDefaultNum: number
  menuIconActiveNum: number
  menuIconHoverNum: number
}

export type MenuBasicInformationResponse = {
  menuNum: number
  tsyMnuMlg: MenuName[]
  menuParentNum: number
  menuDepth: number
  menuTypeCode: string
  menuLocationCode: string
  menuUrl: string
  menuSystemCode?: string | null
  menuIconDefaultFileInfoResponse: FileResType
  menuIconActiveFileInfoResponse: FileResType
  menuIconHoverFileInfoResponse: FileResType
}

export type MenuRoleInfoResponse = {
  roleNum: number
  readYn: string
  createYn: string
  updateYn: string
  deleteYn: string
}

export type MenuDetailViewType = {
  basicInfoRes: MenuBasicInformationResponse
  roleInfoRes: IAuthority[]
}

export type ManageMenuType = {
  menuNum: number
  menuName: MenuName[]
  menuParentNum: number
  menuDepth: number
  menuSortNum: number
  icon: FileResType
  childrenData?: ManageMenuType[]
}

export type MenuPosition = {
  menuNum: number
  menuParentNum: number
  menuOrder: number
}
