import {
  BookmarkToolType,
  CorporateType,
  CountryType,
  LatelyPageType,
  MyProjectsNewsType,
  NoticeType,
  ProcessType,
  ProductCategoryType,
  PurposeType,
  RegionStatusType,
  ResponseType,
  ToolType,
  UrlType,
} from '@type/dashboard/dashboardType'
import axios from 'axios'
import { api } from 'library/util'

export const getProductCategoryList = (projectStatusCode) => {
  return api.get<ProductCategoryType[]>(`/dashboard/c-level/region-product-category?projectStatusCode=${projectStatusCode}`)
}

export const getPurposeList = (projectStatusCode) => {
  return api.get<PurposeType[]>(`/dashboard/c-level/purpose-status?projectStatusCode=${projectStatusCode}`)
}

export const getRegionStatusList = (projectStatusCode) => {
  return api.get<RegionStatusType[]>(`/dashboard/c-level/region-status?projectStatusCode=${projectStatusCode}`)
}

export const getCorporateList = (projectStatusCode) => {
  return api.get<CorporateType[]>(`/dashboard/c-level/corporate?projectStatusCode=${projectStatusCode}`)
}

export const getProjectCount = (dashBoardCategory) => {
  return api.get<number>(`/dashboard/c-level/project/count?dashBoardCategory=${dashBoardCategory}`)
}

export const getProcessCountList = (dashBoardCategory) => {
  return api.get<ProcessType[]>(`/dashboard/c-level/process/count?dashBoardCategory=${dashBoardCategory}`)
}

export const getTop6Country = (projectStatusCode, groupName) => {
  return api.get<CountryType[]>(`/dashboard/c-level/top6-country?projectStatusCode=${projectStatusCode}&groupName=${groupName}`)
}

//개발자

export const getNoticeList = () => {
  return api.get<NoticeType[]>(`/dashboard/notice`)
}

export const getMyProjectsNewsCount = () => {
  return api.get<number>(`/dashboard/my-projects-news/count`)
}

export const getMyProjectsNewsList = (category: string) => {
  return api.get<MyProjectsNewsType[]>(`/dashboard/my-projects-news/list${category === 'all' ? '' : `?category=${category}`}`)
}

export const getMyBookmarkList = () => {
  return api.get<{ toolResponse: ToolType[]; urlReponse: UrlType[] }[]>(`/dashboard/my-bookmark/list`)
}

export const getLatelyPageList = () => {
  return api.get<LatelyPageType[]>(`/dashboard/lately-page/list`)
}

export const getBookmarkToolList = () => {
  return api.get<BookmarkToolType[]>(`/dashboard/bookmark-tool/list`)
}

export const modifyBookmarkTool = (data: { toolId: number; favTp: string }[]) => {
  return api.post(`/dashboard/bookmark-tool/modify`, data)
}

export const modifyBookmarkUrl = (data: { favTp: string; urlName: string; url: string }[]) => {
  return api.post(`/dashboard/bookmark-url/modify`, data)
}

export const modifyBookmark = (data) => {
  return axios.all([modifyBookmarkTool(data.tool), modifyBookmarkUrl(data.url)])
}
