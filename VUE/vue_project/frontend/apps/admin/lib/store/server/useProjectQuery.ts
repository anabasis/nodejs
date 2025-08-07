import { ProjectFilterType } from '@type/project/projectType'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  editProjectInfo,
  getCorporateList,
  getProcessList,
  getProejctProcessList,
  getProjectInfo,
  getProjectList,
  getProjectMember,
  getUserList,
} from '@api/project'

export const useProjectListData = (filterInfo: ProjectFilterType, currentPage: number) => {
  return useQuery({
    queryKey: [
      'project',
      'projectList',
      `sDate${filterInfo.startDate}`,
      `eDate${filterInfo.endDate}`,
      `disease${filterInfo.diseaseCategoryCode}`,
      `purpose${filterInfo.purposeCode}`,
      `process${filterInfo.processCode}`,
      `keyword${filterInfo.keyword}`,
      `${currentPage}`,
    ],
    queryFn: () => getProjectList(filterInfo, currentPage),
    select: (result) => result.data,
  })
}

export const useProcessListData = (isSelectItem = true) => {
  return useQuery({
    queryKey: ['project', 'process'],
    queryFn: getProcessList,
    select: (result) =>
      !!isSelectItem
        ? result.data
        : result.data.map((item) => {
            return { name: item.prcsNm, value: item.id }
          }),
  })
}

export const useProjectInfoData = (projectId) => {
  return useQuery({
    queryKey: ['project', projectId, 'detailInfo'],
    queryFn: () => getProjectInfo(projectId),
    select: (result) => result.data,
    retry: false,
  })
}

export const useProjectMemberListData = (projectId) => {
  return useQuery({
    queryKey: ['project', projectId, 'memberList'],
    queryFn: () => getProjectMember(projectId),
    select: (result) => result.data,
  })
}

export const useProjectProcessListData = (projectId, isSelectItem = true) => {
  return useQuery({
    queryKey: ['project', projectId, 'process'],
    queryFn: () => getProejctProcessList(projectId),
    select: (result) =>
      !!isSelectItem
        ? result.data
        : result.data.map((item) => {
            return { name: item.prcsNm, value: item.prcsCd, sort: item.id }
          }),
  })
}

export const useCorporateListData = (isAddMember = false, isAll = false) => {
  return useQuery({
    queryFn: getCorporateList,
    queryKey: ['project', 'corporate'],
    select: (result) =>
      isAll
        ? [{ name: 'All', value: 'all' }].concat(
            result.data.map((item) => {
              return isAddMember
                ? ({ name: item.corporationName, value: `${item.corporationName}` } as { name: string; value: string })
                : ({ name: item.corporationName, value: `${item.corporationNum}` } as { name: string; value: string })
            })
          )
        : result.data.map((item) => {
            return isAddMember
              ? ({ name: item.corporationName, value: `${item.corporationName}` } as { name: string; value: string })
              : ({ name: item.corporationName, value: `${item.corporationNum}` } as { name: string; value: string })
          }),
  })
}

export const useUserListData = (fileInfo: { corpNm: string; userNm: string }) => {
  return useQuery({
    queryKey: ['project', 'user', fileInfo.corpNm, fileInfo.userNm],
    queryFn: () => getUserList(fileInfo),
    select: (result) => result.data,
  })
}

export const useProjectInfoEditMatation = () => {
  return useMutation({ mutationFn: editProjectInfo })
}
