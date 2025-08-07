import {
  getBookmarkToolList,
  getCorporateList,
  getLatelyPageList,
  getMyBookmarkList,
  getMyProjectsNewsCount,
  getMyProjectsNewsList,
  getNoticeList,
  getProcessCountList,
  getProductCategoryList,
  getProjectCount,
  getPurposeList,
  getRegionStatusList,
  getTop6Country,
  modifyBookmark,
  modifyBookmarkTool,
  modifyBookmarkUrl,
} from '@api/dashboard'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useProductCategoryListData = (projectStatusCode) => {
  return useQuery({
    queryKey: ['dashboard', 'productCategory', `${projectStatusCode}`],
    queryFn: () => getProductCategoryList(projectStatusCode),
    select: (result) => result.data,
  })
}

export const usePurposeListData = (projectStatusCode) => {
  return useQuery({
    queryKey: ['dashboard', 'purpose', `${projectStatusCode}`],
    queryFn: () => getPurposeList(projectStatusCode),
    select: (result) => result.data,
  })
}

export const useResionStatusData = (projectStatusCode) => {
  return useQuery({
    queryKey: ['dashboard', 'regionStatus', `${projectStatusCode}`],
    queryFn: () => getRegionStatusList(projectStatusCode),
    select: (result) => result.data,
  })
}

export const useCorporateData = (projectStatusCode) => {
  return useQuery({
    queryKey: ['dashboard', 'corporate', `${projectStatusCode}`],
    queryFn: () => getCorporateList(projectStatusCode),
    select: (result) => result.data,
  })
}

export const useProjectCountData = (dashBoardCategory) => {
  return useQuery({
    queryKey: ['dashboard', 'projectCount', `${dashBoardCategory}`],
    queryFn: () => getProjectCount(dashBoardCategory),
    select: (result) => result.data,
  })
}

export const useProcessCountData = (dashBoardCategory) => {
  return useQuery({
    queryKey: ['dashboard', 'processCount', `${dashBoardCategory}`],
    queryFn: () => getProcessCountList(dashBoardCategory),
    select: (result) => result.data,
  })
}

export const useTop6CountryData = (projectStatusCode, groupName) => {
  return useQuery({
    queryKey: ['dashboard', 'top6Country', projectStatusCode, groupName],
    queryFn: () => getTop6Country(projectStatusCode, groupName),
    select: (result) => result.data,
  })
}

//개발자
export const useNoticeListData = () => {
  return useQuery({
    queryKey: ['dashboard', 'notice'],
    queryFn: getNoticeList,
    select: (result) => result.data,
  })
}

export const useMyUpdateCount = () => {
  return useQuery({
    queryKey: ['dashboard', 'myProjectNewsCount'],
    queryFn: getMyProjectsNewsCount,
    select: (result) => result.data,
  })
}

export const useMyUpdateList = (category) => {
  return useQuery({
    queryKey: ['dashboard', 'myProjectNews', category],
    queryFn: () => getMyProjectsNewsList(category),
    select: (result) => result.data,
  })
}

export const useMyBookmarkList = () => {
  return useQuery({
    queryKey: ['dashboard', 'myBookmarkList'],
    queryFn: getMyBookmarkList,
    select: (result) => result.data[0],
  })
}

export const useRecentPageList = () => {
  return useQuery({
    queryKey: ['dashboard', 'recentPage'],
    queryFn: getLatelyPageList,
    select: (result) => result.data,
  })
}

export const useToolList = () => {
  return useQuery({
    queryKey: ['dashboard', 'setting', 'tool'],
    queryFn: getBookmarkToolList,
    select: (result) => result.data,
  })
}

export const useBookmarkToolModifyMutation = () => {
  return useMutation({ mutationFn: modifyBookmarkTool })
}

export const useBookmarkUrlodifyMutation = () => {
  return useMutation({ mutationFn: modifyBookmarkUrl })
}

export const useBookmarkMutaion = () => {
  return useMutation({ mutationFn: modifyBookmark })
}
