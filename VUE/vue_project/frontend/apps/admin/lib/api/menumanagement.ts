import { apiAdmin } from 'library/util'
import { MenuBasicInformationResponse, MenuItemApiRes, MenuListApiRes, MenuPosition, MenuPostFormat } from '@type/menu/menumanagement'
import { IAdminRole, IAuthority, IUserRole } from '@type/menu/menuTypes'

export const getMenuManagementListApi = async (isAdmin = false): Promise<MenuListApiRes> => {
  const { data } = await apiAdmin.get(`/menumanagement/menu/list?menuType=${isAdmin ? 'ADMIN' : 'USER'}`)
  let gnbList = data.menuManagementGetGnbDtoResponses ?? []
  let lnbList = data.menuManagementGetLnbDtoResponses ?? []
  return { gnbList, lnbList }
}

export const getUserRoleApi = async (): Promise<IUserRole[]> => {
  const { data } = await apiAdmin.get(`/common/usr-role/list`)
  return data
}

export const getAdminRoleApi = async (): Promise<IAdminRole[]> => {
  const { data } = await apiAdmin.get(`/common/adm-role/list`)
  return data
}

export const getLnbListbByRoleApi = async (isAdmin = false, roleNum: string): Promise<MenuItemApiRes[]> => {
  if (!!roleNum) {
    const { data } = await apiAdmin.get(`/menumanagement/menu/role/list?menuType=${isAdmin ? 'ADMIN' : 'USER'}&roleNum=${roleNum}`)
    return data.menuManagementGetLnbDtoResponses ?? []
  }
  return []
}

export const getMenuBasicInfoApi = async (menuNum: number): Promise<MenuBasicInformationResponse> => {
  const { data } = await apiAdmin.get(`/menumanagement/menu/${menuNum}/info/basic`)
  return data
}

export const getMenuRoleInfoApi = async (menuNum: number): Promise<IAuthority[]> => {
  const { data } = await apiAdmin.get(`/menumanagement/menu/${menuNum}/info/role`)
  return data
}

export const addMenu = async (newMenu: MenuPostFormat) => {
  return await apiAdmin.post(`/menumanagement/menu/info/add`, newMenu)
}

export const deleteMenu = async (menuNum: number) => {
  return await apiAdmin.post(`/menumanagement/menu/${menuNum}/delete`)
}

export const modifyMenu = async ({ menuNum, newMenu }: { menuNum: number; newMenu: MenuPostFormat }) => {
  return await apiAdmin.post(`/menumanagement/menu/${menuNum}/modify`, newMenu)
}

export const modifyMenuArrangement = async ({ isAdmin, menuPositionList }: { isAdmin: boolean; menuPositionList: MenuPosition[] }) => {
  const menuTypeForPost: string = isAdmin ? 'MAD' : 'MDV'
  const menuPositionPostObject = { menuPositionDtoRequest: menuPositionList }
  return await apiAdmin.post(`/menumanagement/menu/${menuTypeForPost}/modify-position`, menuPositionPostObject)
}
