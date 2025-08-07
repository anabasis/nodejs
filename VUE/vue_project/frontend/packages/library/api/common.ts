import { api, apiAdmin, MenuApiItem } from '../util'
import { ToolItem, NotificationItem, GuideItem } from '../type/common'

// WISDOM GNB
export const getGnbMenu = async (isAdmin = false): Promise<MenuApiItem[]> => {
  const { data } = !isAdmin ? await api.get('/common/side-bar/usr/gnb/list') : await apiAdmin.get('/common/side-bar/adm/gnb/list')
  return data
}

// WISDOM LNB & menu authority
export const getLnbMenu = async (isAdmin = false): Promise<MenuApiItem[]> => {
  const { data } = !isAdmin ? await api.get('/common/side-bar/usr/lnb/list') : await apiAdmin.get('/common/side-bar/adm/lnb/list')
  return data
}

// WISDOM Tools popup
export const getToolsList = async (): Promise<ToolItem[]> => {
  const { data } = await api.get('/tools/support-tools/list')
  return data
}

// WISDOM Notification popup
export const getNotificationList = async (): Promise<NotificationItem[]> => {
  const { data } = await api.get('/notification/list')
  return data
}

// WISDOM Notification popup update
export const postNotificationList = async () => {
  const { data } = await api.post('/notification/list/update')
  return data
}

// WISDOM Detail Guides
export const getDetailGuides = async (path: string): Promise<GuideItem[]> => {
  const { data } = await api.get(`/external/guidemanagement/list?parameterValue=${path}`)
  return data
}
