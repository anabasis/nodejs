import { groupBy as _groupBy } from 'lodash-es'
import { getCdnFileUrl, changeTimeLocal } from 'library/util'
import { getLnbListbByRoleApi, getMenuBasicInfoApi, getMenuManagementListApi, getMenuRoleInfoApi } from '@api/menumanagement'
import { ManageMenuListType, ManageMenuType, MenuDetailViewType, MenuItemApiRes, MenuItemViewType, MenuListViewType } from '@type/menu/menumanagement'

const convertMenuNotation = (tempItem: MenuItemApiRes): MenuItemViewType => {
  const isOneDepth = tempItem.menuDepth === 1

  let item: MenuItemViewType = {
    menuNum: tempItem.menuNum,
    order: tempItem.menuSortNum,
    depth: tempItem.menuDepth,
    icon: getCdnFileUrl(tempItem.fileInfoResponse),
    menuName: tempItem.tsyMnuMlg,
    menuRoleMap: {
      A: tempItem?.menuRoleMap?.A ?? [],
      B: tempItem?.menuRoleMap?.B ?? [],
    },
    menuUpdateDate: changeTimeLocal({ time: tempItem.menuUpdateDate, type: 'yyyy-MM-dd' }),
  }
  if (!isOneDepth) {
    delete item.icon
  }
  if (tempItem.childrenData && tempItem.childrenData.length > 0) item = { ...item, childrenData: tempItem.childrenData as MenuItemViewType[] }

  return item
}

const convertToManageMenuType = (tempItem: MenuItemApiRes): ManageMenuType => {
  const isOneDepth = tempItem.menuDepth === 1

  let item: ManageMenuType = {
    menuNum: tempItem.menuNum,
    menuSortNum: tempItem.menuSortNum,
    menuName: tempItem.tsyMnuMlg,
    menuParentNum: tempItem.menuNum,
    menuDepth: tempItem.menuDepth,
    icon: tempItem.fileInfoResponse,
  }

  if (!isOneDepth) {
    delete item.icon
  }
  if (tempItem.childrenData && tempItem.childrenData.length > 0) item = { ...item, childrenData: tempItem.childrenData as ManageMenuType[] }

  return item
}

const convertMenuApiToJson = (apiNavi: MenuItemApiRes[]): MenuItemViewType[] => {
  const result: MenuItemViewType[] = []
  const groupItems = _groupBy(apiNavi, 'menuParentNum')
  const depth1 = groupItems[1] || []
  const isSubItems = Object.keys(groupItems).length > 1

  const addSubItems = (item: MenuItemApiRes | MenuItemViewType): MenuItemViewType => {
    const subItems = groupItems[item.menuNum]

    if (!subItems) return

    item.childrenData = subItems.map(convertMenuNotation)
    item.childrenData.forEach(addSubItems)
  }

  if (isSubItems) depth1.forEach(addSubItems)
  result.push(...depth1.map(convertMenuNotation))

  return result
}

const convertMenuApiToManageMenuTypeJson = (apiNavi: MenuItemApiRes[]): ManageMenuType[] => {
  const result: ManageMenuType[] = []
  const groupItems = _groupBy(apiNavi, 'menuParentNum')
  const depth1 = groupItems[1] || []
  const isSubItems = Object.keys(groupItems).length > 1

  const addSubItems = (item: MenuItemApiRes | ManageMenuType): ManageMenuType => {
    const subItems = groupItems[item.menuNum]

    if (!subItems) return

    item.childrenData = subItems.map(convertToManageMenuType)
    item.childrenData.forEach(addSubItems)
  }

  if (isSubItems) depth1.forEach(addSubItems)
  result.push(...depth1.map(convertToManageMenuType))

  return result
}

export const getMenuManagementList = async (isAdmin: boolean): Promise<MenuListViewType> => {
  const menus = await getMenuManagementListApi(isAdmin)
  const gnbList = convertMenuApiToJson(menus.gnbList)
  const lnbList = convertMenuApiToJson(menus.lnbList)

  return { gnbList, lnbList }
}

export const getFilteredLnbMenuList = async (isAdmin: boolean, roleNum): Promise<MenuItemViewType[]> => {
  const lnbMenus = await getLnbListbByRoleApi(isAdmin, roleNum)
  return convertMenuApiToJson(lnbMenus)
}

export const getMenuDetail = async (menuNum: number): Promise<MenuDetailViewType> => {
  // 해당 API가 던져주는 데이터는 메뉴 관리 IBasicInfoData와는 다른 형식의 데이터를 넘겨준다.
  const basicInfoRes = await getMenuBasicInfoApi(menuNum)
  const roleInfoRes = await getMenuRoleInfoApi(menuNum)
  return { basicInfoRes, roleInfoRes }
}
