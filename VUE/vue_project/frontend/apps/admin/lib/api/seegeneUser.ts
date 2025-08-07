import { apiAdmin } from 'library/util'

const seegeneUrl = '/user/sg-hq'

interface InviteParam {
  emailId: string
  userRolId: string
  admRolIds: string
}

// TODO. param 변환 공통화 할 것. if api param이 같을 경우

/* ------------GET METHOD--------------- */

// 성공
export const getSeegeneRegisteredList = async ({ searchFilterParams, currentPage }) => {
  let param = {
    periodFromDate: searchFilterParams.startDate,
    periodToDate: searchFilterParams.endDate,
    userRoleList: searchFilterParams.userRole,
    adminRoleList: searchFilterParams.adminRole,
    searchType: searchFilterParams.searchType,
    searchKeyword: searchFilterParams.keyword,
    page: currentPage,
    size: searchFilterParams.size,
  }

  const { data } = await apiAdmin.get(`${seegeneUrl}/registered/list`, { params: param })

  return data
}

// 성공
export const getSeegeneInProgressList = async ({ searchFilterParams, currentPage }) => {
  let param = {
    periodFromDate: searchFilterParams.startDate,
    periodToDate: searchFilterParams.endDate,
    searchType: searchFilterParams.searchType,
    searchKeyword: searchFilterParams.keyword,
    page: currentPage,
    size: searchFilterParams.size,
  }

  const { data } = await apiAdmin.get(`${seegeneUrl}/un-registered/list`, {
    params: param,
  })

  return data
}

// 성공
export const getSeegeneInInvitationList = async ({ searchFilterParams, currentPage }) => {
  let param = {
    periodFromDate: searchFilterParams.startDate,
    periodToDate: searchFilterParams.endDate,
    searchType: searchFilterParams.searchType,
    searchKeyword: searchFilterParams.keyword,
    page: currentPage,
    size: searchFilterParams.size,
  }

  const { data } = await apiAdmin.get(`${seegeneUrl}/invite/list`, {
    params: param,
  })

  return data
}

// 성공
export const getSeegeneUserDetailInfo = async (uid: string) => {
  let param = {
    usrUid: uid,
  }

  const { data } = await apiAdmin.get(`${seegeneUrl}/registered/detail`, {
    params: param,
  })

  return data
}

// 성공
export const getRoleChangeRequest = async (uid: string) => {
  let param = {
    usrUid: uid,
  }

  const { data } = await apiAdmin.get(`${seegeneUrl}/role-req/list`, {
    params: param,
  })

  return data
}

// 성공
export const getSeegeneProjectList = async (uid: string, currentPage: number, rowSize: number) => {
  let param = {
    userUid: uid,
    page: currentPage,
    size: rowSize,
  }

  const { data } = await apiAdmin.get(`${seegeneUrl}/project/list`, { params: param })
  return data
}

/* ------------POST METHOD--------------- */

// 성공
export const inviteSeegeneUser = async (params: InviteParam) => {
  const data = await apiAdmin.post(`${seegeneUrl}/invite`, params)
  return data
}

// 승인 - 성공, 거절 - 성공
export const processUserRoleRequestSeegeneUser = async (params) => {
  const data = await apiAdmin.post(`${seegeneUrl}/user-role/request`, params)
  return data
}

// 승인 - 성공, 거절 - 성공
export const processAdminRoleRequestSeegeneUser = async (params) => {
  const data = await apiAdmin.post(`${seegeneUrl}/admin-role/request2`, params)
  return data
}

// 승인 - 성공 거절 - 성공
export const registerOrNotSeegeneUser = async (params) => {
  const data = await apiAdmin.post(`${seegeneUrl}/register`, params)
  return data
}

// 성공
export const resendInvitationSeegeneUser = async (params: { uid: string; email: string }) => {
  let param = {
    userInvtUid: params.uid,
    emailId: params.email,
  }
  const data = await apiAdmin.post(`${seegeneUrl}/invite/resend`, param)
  return data
}

// 성공
export const cancelInvitationSeegeneUser = async (params: { uid: string; email: string }) => {
  let param = {
    userInvtUid: params.uid,
    emailId: params.email,
  }

  const data = await apiAdmin.post(`${seegeneUrl}/invite/cancel`, param)
  return data
}

// 성공
export const withdrawSeegeneUser = async (params) => {
  const data = await apiAdmin.post(`${seegeneUrl}/delete?usrUid=${params.usrUid}&wdrlResnCd=${params.wdrlResnCd}`)
  return data
}
