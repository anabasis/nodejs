import { groupBy as _groupBy } from 'lodash-es'
import { getCdnFileUrl } from './fn'
import { getGnbMenu, getLnbMenu } from '../api/common'
import { FileResType } from '../type/common'

export type MenuApiItem = {
  parentsMnuNum: number // 부모 id
  parentsMnuName: string | null // NRD
  mnuNum: number // 본인 id > 부모와 형제를 찾음
  mnuName: string // 본인 이름
  mnuUrl: string // URL path '/some/menu/path'
  mnuDpth: number // depth
  acvIconTsyFl: FileResType // active시 이미지
  dftIconTsyFl: FileResType // 기본 이미지
  hovIconFl: FileResType // hover시 이미지
  redYn: string
  uptYn: string
  crtYn: string
  delYn: string
  subNavs?: MenuItemType[] // 자식들
}

export type MenuItemType = {
  parentsMnuNum?: number // 부모 id
  parentsMnuName?: string | null // NRD
  mnuNum: number // 본인 id > 부모와 형제를 찾음
  mnuName: string // 본인 이름
  mnuUrl: string // URL path '/some/menu/path'
  mnuDpth: number // depth
  acvIcon?: string | null // active시 이미지
  hovIcon?: string | null // hover시 이미지
  dftIcon?: string | null // 기본 이미지
  redYn: string
  uptYn: string
  crtYn: string
  delYn: string
  subNavs?: MenuItemType[] // 자식들
}

const convertMenuNotation = (tempItem: MenuApiItem): MenuItemType => {
  const isOneDepth = tempItem.mnuDpth === 1

  let item: MenuItemType = {
    parentsMnuNum: tempItem.parentsMnuNum,
    mnuNum: tempItem.mnuNum,
    mnuName: tempItem.mnuName,
    mnuUrl: tempItem.mnuUrl,
    mnuDpth: tempItem.mnuDpth,
    acvIcon: getCdnFileUrl(tempItem.acvIconTsyFl),
    hovIcon: getCdnFileUrl(tempItem.hovIconFl),
    dftIcon: getCdnFileUrl(tempItem.dftIconTsyFl),
    redYn: tempItem.redYn,
    uptYn: tempItem.uptYn,
    crtYn: tempItem.crtYn,
    delYn: tempItem.delYn,
  }
  if (!isOneDepth) {
    delete item.acvIcon
    delete item.hovIcon
    delete item.dftIcon
  }
  if (tempItem.subNavs && tempItem.subNavs.length > 0) item = { ...item, subNavs: tempItem.subNavs }

  return item
}

const convertMenuApiToJson = (apiNavi: MenuApiItem[]): MenuItemType[] => {
  const result = []
  const groupItems = _groupBy(apiNavi, 'parentsMnuNum')
  const depth1 = groupItems[1] || []
  const isSubItems = Object.keys(groupItems).length > 1

  const addSubItems = (item: MenuItemType) => {
    const subItems = groupItems[item.mnuNum]

    if (!subItems) return

    item.subNavs = subItems.map(convertMenuNotation)
    item.subNavs.forEach(addSubItems)
  }

  if (isSubItems) depth1.forEach(addSubItems)
  result.push(...depth1.map(convertMenuNotation))

  return result
}

export const getGnbMenuList = async (isAdmin: boolean) => convertMenuApiToJson(await getGnbMenu(isAdmin))

export const getLnbMenuList = async (isAdmin: boolean) => convertMenuApiToJson(await getLnbMenu(isAdmin))
