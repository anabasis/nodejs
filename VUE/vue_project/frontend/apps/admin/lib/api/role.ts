import { AdminRoleAddedType, AdminRoleModifiedCompleteType, AdminRoleModifiedMemberType } from '@type/role/adminRole'
import { UserRoleModifiedCompleteType, UserRoleModifiedMemberType } from '@type/role/userRole'
import { apiAdmin } from 'library'

const userUrl = '/authority/role'
const adminUrl = '/authority/admin/role'

/*------------------------------Get API (사용자 역할)---------------------------------*/

// 사용자 역할 목록 조회
export const getUserRoleConditionList = async ({ searchFilterParams, propParams, currentPage }) => {
  let param = {
    periodFromDate: searchFilterParams.startDate,
    periodToDate: searchFilterParams.endDate,
    corpLevel: propParams.corpLevel,
    roleLevel: propParams.roleLevel,
    page: currentPage,
    size: searchFilterParams.size,
  }

  const { data } = await apiAdmin.get(`${userUrl}/list`, {
    params: param,
  })
  return data
}

// 사용자 역할 정보 상세 조회
export const getUserRoleDetailInfo = async (userRoleNumber: string) => {
  const { data } = await apiAdmin.get(`${userUrl}/${userRoleNumber}/info`)
  return data
}

// 사용자 역할 정보 상세 초기 메뉴 조회
export const getUserRoleAuthorityInit = async () => {
  const { data } = await apiAdmin.get(`${userUrl}/menu/init`)
  return data
}

// 사용자 역할 메뉴 권한 정보 조회
export const getUserRoleAuthority = async (userRoleNumber: string) => {
  const { data } = await apiAdmin.get(`${userUrl}/menu/${userRoleNumber}/detail`)
  return data
}

// 사용자 역할 인원 조회
export const getUserRoleMember = async (userRoleNumber: string, page: number, size: number) => {
  const param = {
    page: page,
    size: size,
  }
  const { data } = await apiAdmin.get(`${userUrl}/users/${userRoleNumber}/detail`, { params: param })
  return data
}

// 기업 레벨과 역할 레벨에 해당하는 사용자들의 인원 조회
export const getLevelUserList = async ({ params, corporateLevel }) => {
  let param = {
    corpLvCode: corporateLevel,
    searchType: params.searchType,
    searchText: params.keyword,
  }

  const { data } = await apiAdmin.get(`${userUrl}/users/list`, {
    params: param,
  })
  return data
}

/*------------------------------Post API (사용자 역할)---------------------------------*/
// 역할 추가
export const addUserRole = async (param: UserRoleModifiedCompleteType) => {
  const data = await apiAdmin.post(`${userUrl}/add`, param)
  return data
}

// 역할 수정
export const updateUserRole = async (params: { roleNumber: number; data: UserRoleModifiedCompleteType }) => {
  const response = await apiAdmin.post(`${userUrl}/detail/${params.roleNumber}/modify`, params.data)
  return response
}

// 역할 변경 멤버 수정
export const updateUserRoleMember = async (params: { data: UserRoleModifiedMemberType[]; roleNumber: string }) => {
  let param = {
    usrUidList: params.data,
  }

  const response = await apiAdmin.post(`${userUrl}/detail/${params.roleNumber}/user/modify`, param)
  return response
}

// 역할 삭제
export const deleteUserRole = async (params: { roleNumber: number; changeRole: number }) => {
  let param = {
    changeUsrRolNumber: params.changeRole,
  }
  const response = await apiAdmin.post(`${userUrl}/detail/${params.roleNumber}/delete`, param)
  return response
}

/*------------------------------Get API (어드민 역할)---------------------------------*/
// 어드민 역할 전체 목록 조회
export const getAdminRoleConditionList = async ({ searchFilterParams, currentPage }) => {
  let param = {
    periodFromDate: searchFilterParams.startDate,
    periodToDate: searchFilterParams.endDate,
    page: currentPage,
    size: searchFilterParams.size,
  }

  const { data } = await apiAdmin.get(`${adminUrl}/list`, {
    params: param,
  })
  return data
}

// 어드민 역할 정보 상세 조회
export const getAdminRoleDetailInfo = async (adminRoleNumber: string) => {
  const { data } = await apiAdmin.get(`${adminUrl}/${adminRoleNumber}/info`)
  return data
}

// 어드민 역할 메뉴 권한 정보 조히
export const getAdminRoleAuthority = async (adminRoleNumber: string) => {
  const { data } = await apiAdmin.get(`${adminUrl}/menu/${adminRoleNumber}/detail`)
  return data
}

// 어드민 역할 정보 상세 초기 메뉴 조회
export const getAdminRoleAuthorityInit = async () => {
  const { data } = await apiAdmin.get(`${adminUrl}/menu/init`)
  return data
}

// 어드민 역할 인원 조회
export const getAdminRoleMember = async (adminRoleNubmer: string, page: number, size: number) => {
  let param = {
    page: page,
    size: size,
  }
  const { data } = await apiAdmin.get(`${adminUrl}/users/${adminRoleNubmer}/detail`, {
    params: param,
  })

  return data
}

// 해당 어드민이 가지고 있는 admin role 조회
export const getMemberAdminRoles = async (adminRoleNumber: string, uid: string) => {
  const { data } = await apiAdmin.get(`${adminUrl}/users/${adminRoleNumber}/${uid}/detail`)
  return data
}

// HQ 인원 조회
export const getHQMember = async (params: { searchType: string; keyword?: string }) => {
  let param = {
    searchType: params.searchType,
    searchText: params.keyword,
  }

  const { data } = await apiAdmin.get(`${adminUrl}/users/list`, {
    params: param,
  })
  return data
}

/*------------------------------Post API (어드민 역할)---------------------------------*/
// 역할 추가
export const addAdminRole = async (param: AdminRoleAddedType) => {
  const data = await apiAdmin.post(`${adminUrl}/add`, param)
  return data
}

// 역할 수정
export const updateAdminRole = async (params: { roleNumber: number; data: AdminRoleModifiedCompleteType }) => {
  const response = await apiAdmin.post(`${adminUrl}/detail/${params.roleNumber}/modify`, params.data)
  return response
}

// 역할 변경 멤버 수정
export const updateAdminRoleMember = async (params: { data: AdminRoleModifiedMemberType[]; roleNumber: string }) => {
  let param = {
    usrUidList: params.data,
  }

  const response = await apiAdmin.post(`${adminUrl}/detail/${params.roleNumber}/user/modify`, param)
  return response
}

// 역할 삭제
export const deleteAdminRole = async (roleNumber: string) => {
  const response = await apiAdmin.post(`${adminUrl}/${roleNumber}/delete`)
  return response
}
