import { apiAdmin } from 'library/util'

/* ------------GET Method--------------- */

/*   알림 목록 조회  */
export const getNotificationList = async ({ searchFilterParams, currentPage }) => {
  const param = {
    ...searchFilterParams,
    page: currentPage,
  }
  const response = await apiAdmin.get('/notification/list', {
    params: param,
  })
  return response.data
}

/*   알림 상세 조회  */
export const getNotificationDetail = async ({ notiId }) => {
  return await apiAdmin.get(`/notification/${notiId}/detail`)
}

/* ------------POST Method--------------- */

/*   알림 추가  */
export const addNotification = async ({ data }) => {
  return await apiAdmin.post(`/notification/add`, data)
}

/*   알림 수정  */
export const modifyNotification = async ({ notiId, params }) => {
  return await apiAdmin.post(`/notification/${notiId}/update`, params)
}

/*   알림 삭제  */
export const deleteNotification = async ({ notiId }) => {
  return await apiAdmin.post(`/notification/${notiId}/delete`)
}
