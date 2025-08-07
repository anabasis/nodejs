import {
  addDocument,
  addNote,
  addProject,
  addRequest,
  checkOtherCorporationMember,
  copyRequest,
  deleteDocument,
  deleteProject,
  deleteRequest,
  editAuthority,
  editFavorite,
  editPlanningInfo,
  editProject,
  editProjectAuthority,
  editProjectParticipationDemand,
  editProjectProcessStatus,
  getCountryList,
  getDocumentDetail,
  getMyCorporateMember,
  getNoteList,
  getOligoDesignDocumentList,
  getOligoDesignRequestList,
  getPlanningDetailInfo,
  getPlanningDocumentList,
  getProcessList,
  getProejctAuthority,
  getProjectAuthorityDetail,
  getProjectHistoryList,
  getProjectInfo,
  getProjectInfoAdditionalInfo,
  getProjectList,
  getProjectMemberDetailList,
  getProjectMemberList,
  getProjectParticipationDemandDetail,
  getProjectProcessState,
  getProjectProcessStatus,
  modifyDocument,
  modifyDocumentStatus,
  putProjectStatus,
  reqProjectParticipation,
} from '@api/project'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProjectFilterType, ProjectPaginationType, ProjectBasicInfoType, ProcessType } from '@type/project/projectType'
import { mapKeys } from 'lodash-es'

export const useProcessCodeData = (isAll = false) => {
  return useQuery({
    queryKey: ['project', 'processCodeList'],
    queryFn: getProcessList,
    select: (result) => {
      return isAll
        ? [{ value: 'all', name: 'All', sortNum: 0 }].concat(
            result.data.map(
              (item) =>
                mapKeys(item, (val, key) => (key === 'id' ? 'value' : key === 'prcsNm' ? 'name' : key)) as { value: string; name: string; sortNum: number }
            )
          )
        : result.data.map(
            (item) =>
              mapKeys(item, (val, key) => (key === 'id' ? 'value' : key === 'prcsNm' ? 'name' : key)) as { value: string; name: string; sortNum: number }
          )
    },
    staleTime: Infinity,
  })
}

export const useCountryListData = () => {
  return useQuery({
    queryKey: ['project', 'country'],
    queryFn: getCountryList,
    select: (result) => {
      return result.data.map(
        (item) => mapKeys(item, (val, key) => (key === 'countryCd' ? 'value' : key === 'usrCountryNm' ? 'name' : key)) as { value: string; name: string }
      )
    },
  })
}

export const useProjectListData = (filterInfo: ProjectFilterType, currentPage: number) => {
  return useQuery({
    queryKey: [
      'project',
      'projectList',
      filterInfo.projectTab,
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
    enabled: !!filterInfo.projectTab && filterInfo.projectTab !== '',
  })
}

export const useProjectProcessStatusData = (projectId: string, processCode: string) => {
  return useQuery({
    queryKey: ['proejct', projectId, processCode],
    queryFn: () => getProjectProcessState(projectId, processCode),
    select: (result) => result.data,
  })
}

export const usePlanningDetailData = (projectId) => {
  return useQuery({ queryKey: ['project', projectId, 'planning', 'detail'], queryFn: () => getPlanningDetailInfo(projectId), select: (result) => result.data })
}

export const useProjectInfoData = (projectId) => {
  return useQuery({ queryKey: ['project', projectId, 'basicInfo'], queryFn: () => getProjectInfo(projectId), select: (result) => result.data, retry: false })
}

export const useProjectAdditionalInfoData = (projectId) => {
  return useQuery({
    queryKey: ['project', projectId, 'additionalInfo'],
    queryFn: () => getProjectInfoAdditionalInfo(projectId),
    select: (result) => result.data,
  })
}

export const useProjectMemberData = (projectInfo: ProjectBasicInfoType) => {
  return useQuery({
    queryKey: ['project', projectInfo?.id, 'member'],
    queryFn: () => getProjectMemberList(projectInfo.id),
    select: (result) => result.data,
    enabled: !!projectInfo,
  })
}

export const usePlanningDocumentData = (projectId, filterInfo, paginationInfo) => {
  return useQuery({
    queryKey: [
      'project',
      projectId,
      'planning',
      'document',
      `status${filterInfo.fileStatus}`,
      `type${filterInfo.fileType}`,
      `keyword${filterInfo.keyword}`,
      `${paginationInfo.currentPage}`,
    ],
    queryFn: () => getPlanningDocumentList(projectId, filterInfo, paginationInfo),
    select: (result) => result.data,
  })
}

export const useDeleteDocumentMutation = () => {
  return useMutation({ mutationFn: deleteDocument })
}

export const useProjectHistory = (projectInfo: ProjectBasicInfoType) => {
  return useQuery({
    queryKey: ['project', projectInfo?.id, 'history'],
    queryFn: () => getProjectHistoryList(projectInfo.id),
    select: (result) => result.data,
    enabled: !!projectInfo,
  })
}

export const useProjectMutation = () => {
  return useMutation({ mutationFn: addProject })
}

export const useOligoDesignRequestListData = (projectInfo, filterInfo, pagination) => {
  return useQuery({
    queryKey: [
      'project',
      projectInfo.id,
      'OligoDesignRequest',
      `s${filterInfo.reqStsCd}`,
      `a${filterInfo.appTpCd}`,
      `k${filterInfo.keyword}`,
      `${pagination.currentPage}`,
    ],
    queryFn: () => getOligoDesignRequestList(projectInfo, filterInfo, pagination),
    select: (result) => result.data,
    enabled: !!projectInfo,
  })
}

export const useMyCorporateMemberData = (keywordInfo: { keyword: string; enabled: boolean }) => {
  return useQuery({
    queryKey: ['project', 'myCorMember', `k${keywordInfo.keyword}`],
    queryFn: () => getMyCorporateMember(keywordInfo.keyword),
    select: (result) => result.data,
    enabled: keywordInfo.enabled,
  })
}

export const useProjectProcessData = (projectId, option = true) => {
  return useQuery({
    queryKey: ['project', projectId, 'process'],
    queryFn: () => getProjectProcessStatus(projectId),
    select: (result) =>
      !!option
        ? (result.data as ProcessType[])
        : result.data.map(
            (item) =>
              mapKeys(item, (val, key) => (key === 'prcsCode' ? 'value' : key === 'prcsName' ? 'name' : key)) as {
                value: string
                name: string
                prcsStsCode?: string
              }
          ),
  })
}

export const useProcessStatusMutation = () => {
  return useMutation({ mutationFn: editProjectProcessStatus })
}

export const usePlanningInfoMutation = () => {
  return useMutation({ mutationFn: editPlanningInfo })
}

export const useAddRequestMutation = () => {
  return useMutation({ mutationFn: addRequest })
}

export const useEditProjectMutation = () => {
  return useMutation({ mutationFn: editProject })
}

export const useDeleteProjectMutation = () => {
  return useMutation({ mutationFn: deleteProject })
}

export const useModifyProjectStatusMatation = () => {
  return useMutation({ mutationFn: putProjectStatus })
}

export const useReqProjectParticipationMatation = () => {
  return useMutation({ mutationFn: reqProjectParticipation })
}

export const useEditAuthorityMatation = () => {
  return useMutation({ mutationFn: editAuthority })
}

export const useProjectAuthorityListData = (projectId, paginationInfo) => {
  return useQuery({
    queryKey: ['project', projectId, 'projectAuthority', `${paginationInfo.currentPage}`],
    queryFn: () => getProejctAuthority(projectId, paginationInfo),
    select: (result) => result.data,
  })
}

export const useProjectParticipationConfirmDetailData = (id, type) => {
  return useQuery({
    queryKey: ['project', 'ParticipationConfirmDetail', id],
    queryFn: () => getProjectParticipationDemandDetail(id),
    select: (result) => result.data,
    enabled: type === 'RQJ',
  })
}

export const useProjectAuthorityDetailData = (id, type) => {
  return useQuery({
    queryKey: ['project', 'ProjectAuthoriy', id],
    queryFn: () => getProjectAuthorityDetail(id),
    select: (result) => result.data,
    enabled: type === 'RQC',
  })
}

export const useEditProjectAuthorityMutation = () => {
  return useMutation({ mutationFn: editProjectAuthority })
}

export const useEditProjectParticipationDemandMutation = () => {
  return useMutation({ mutationFn: editProjectParticipationDemand })
}

export const useCheckOtherCorporationMemberMutation = () => {
  return useMutation({ mutationFn: checkOtherCorporationMember })
}

export const useProjectMemberDetailData = (id) => {
  return useQuery({
    queryKey: ['project', id, 'memberDetail'],
    queryFn: () => getProjectMemberDetailList(id),
    select: (result) => result.data,
  })
}

export const useAddDocumentMutation = () => {
  return useMutation({ mutationFn: addDocument })
}

export const usePlanningDocumentStatusMutation = () => {
  return useMutation({ mutationFn: modifyDocumentStatus })
}

export const useOligoDesignDocumentListData = (id, paginationInfo, filterInfo) => {
  return useQuery({
    queryKey: ['project', id, 'OligoDesignDocument', `k${filterInfo.keyword}`, `p${paginationInfo.currentPage}`],
    queryFn: () => getOligoDesignDocumentList(id, paginationInfo, filterInfo),
    select: (result) => result.data,
  })
}

export const useDocumentDetailData = (documentNum) => {
  return useQuery({
    queryKey: ['project', 'document', documentNum],
    queryFn: () => getDocumentDetail(documentNum),
    select: (result) => result.data,
  })
}

export const useDocumentEditMutation = () => {
  return useMutation({ mutationFn: modifyDocument })
}

export const useNoteListData = (id, enabled) => {
  return useQuery({
    queryKey: ['project', id, 'note'],
    queryFn: () => getNoteList(id),
    select: (result) => result.data,
    enabled: enabled,
  })
}

export const useAddNoteMutation = () => {
  return useMutation({ mutationFn: addNote })
}

export const useCopyRequestMutation = () => {
  return useMutation({ mutationFn: copyRequest })
}

export const useDeleteRequestMutation = () => {
  return useMutation({ mutationFn: deleteRequest })
}

export const useEditRequestFavoriteMutation = () => {
  return useMutation({ mutationFn: editFavorite })
}
