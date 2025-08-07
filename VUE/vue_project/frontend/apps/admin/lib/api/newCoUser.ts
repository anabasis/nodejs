import { apiAdmin } from 'library/util'

const newCoUrl = '/user/new-co'
/* ------------GET METHOD--------------- */

export const getNewCoRegisteredList = async ({ params, currentPage }) => {
  let param = !!params?.userRole
    ? {
        periodFromDate: params.startDate,
        periodToDate: params.endDate,
        cntryCd: params.countryCode,
        usrRolNum: Number(params.userRole),
        searchKeyword: params.searchType,
        keyword: params.keyword,
        page: currentPage,
        size: params.size,
      }
    : {
        periodFromDate: params.startDate,
        periodToDate: params.endDate,
        cntryCd: params.countryCode,
        searchKeyword: params.searchType,
        keyword: params.keyword,
        page: currentPage,
        size: params.size,
      }

  const { data } = await apiAdmin.get(`${newCoUrl}/registered/list`, {
    params: param,
  })

  return data
}

export const getNewCoUserDetailInfo = async (uid: string) => {
  let param = {
    userUid: uid,
  }

  const { data } = await apiAdmin.get(`${newCoUrl}/registered/detail`, {
    params: param,
  })

  return data
}

export const getNewCoProgressList = async ({ params, currentPage }) => {
  let param = {
    periodFromDate: params.startDate,
    periodToDate: params.endDate,
    searchKeyword: params.searchType,
    keyword: params.keyword,
    page: currentPage,
    size: params.size,
  }

  const { data } = await apiAdmin.get(`${newCoUrl}/un-registered/list`, {
    params: param,
  })

  return data
}

export const getNewCoInvitationList = async ({ searchFilterParams, currentPage }) => {
  let param = {
    periodFromDate: searchFilterParams.startDate,
    periodToDate: searchFilterParams.endDate,
    searchKeyword: searchFilterParams.searchType,
    keyword: searchFilterParams.keyword,
    page: currentPage,
    size: searchFilterParams.size,
  }

  const { data } = await apiAdmin.get(`${newCoUrl}/permission/detail`, {
    params: param,
  })

  return data
}

export const getNewCoProjectList = async (uid: string, currentPage: number, rowSize: number) => {
  let param = {
    userUid: uid,
    page: currentPage,
    size: rowSize,
  }

  const { data } = await apiAdmin.get(`${newCoUrl}/participation-project/list`, {
    params: param,
  })

  return data
}

/* ------------POST METHOD--------------- */

// 성공
export const registerNewCoUser = async (params) => {
  const data = await apiAdmin.post(`${newCoUrl}/register`, params)
  return data
}

// 성공
export const rejectNewCoUser = async (params) => {
  const data = await apiAdmin.post(`${newCoUrl}/reject`, params)
  return data
}

// 성공
export const inviteResendNewCoUser = async (params: { uid: string; email: string }) => {
  let param = {
    userInvtUid: params.uid,
    emailId: params.email,
  }
  const data = await apiAdmin.post(`${newCoUrl}/user/invitation`, param)
  return data
}

// 성공
export const inviteCancelNewCoUser = async (params: { uid: string; email: string }) => {
  let param = {
    userInvtUid: params.uid,
    emailId: params.email,
  }
  const data = await apiAdmin.post(`${newCoUrl}/user/invite-Cancel`, param)
  return data
}

// 성공
export const passwordReset = async (uid: string) => {
  const data = await apiAdmin.post(`${newCoUrl}/password/send?userUid=${uid}`)
  return data
}

// 성공
export const withdrawNewCoUser = async (params) => {
  const data = await apiAdmin.post(`${newCoUrl}/user/delete`, params)
  return data
}

// 성공
export const inviteNewCoUser = async (params) => {
  const data = await apiAdmin.post(`${newCoUrl}/invite`, params)
  return data
}

// 성공
export const changeUserRole = async (params) => {
  const data = await apiAdmin.post(`${newCoUrl}/role/modify`, params)
  return data
}

// 성공
export const declineUserRole = async (params) => {
  const data = await apiAdmin.post(`${newCoUrl}/role/reject`, params)
  return data
}
