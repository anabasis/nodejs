import {
  ResponseType,
  ProjectListType,
  ProjectFilterType,
  ProjectPaginationType,
  ProjectBasicInfoType,
  ProjectAdditionalInfoType,
  ProcessHistoryType,
  PlanningDocumentType,
  OligoDesignRequestType,
  MemberType,
  MyCorporateMemberType,
  ProcessType,
  RequestsToProjectType,
  RequestJoinConfirmType,
  OtherCorporateMemberType,
  ProjectMemberDetailType,
  OligoDesignDocumentType,
  AddDocumentType,
  DocumentDetailType,
  NoteListType,
  AuthorityResponseType,
} from '@type/project/projectType'
import { api, apiIsc } from 'library/util'

export const getProcessList = async () => {
  return await api.get<{ id: string; prcsNm: string; sortNum: number }[]>('/project/process/list')
}

export const getProjectList = async (filterInfo: ProjectFilterType, currentPage: number) => {
  const filter = Object.keys(filterInfo)
    .filter((key) => filterInfo[key] !== '' && filterInfo[key] !== 'all' && !['displayStartDate', 'displayEndDate'].includes(key))
    .map((key) => `${key}=${filterInfo[key]}`)
    .join('&')

  return await api.get<ResponseType<ProjectListType>>(`/project/list?${encodeURI(`${filter}&page=${currentPage}&sort=id,desc`)}`)
}

export const getCountryList = async () => {
  return await api.get<
    {
      countryCd: string
      korCountryNm: string
      engCountryNm: string
      nativeCountryNm: string
      usrCountryNm: string
    }[]
  >(`/common/country-list`)
}

export const getProjectInfo = async (projectId) => {
  return await api.get<ProjectBasicInfoType>(`/project/${projectId}/project-info`)
}

export const getProjectInfoAdditionalInfo = async (projectId) => {
  return await api.get<ProjectAdditionalInfoType>(`/project/${projectId}/project-additional-info`)
}

export const getProjectHistoryList = async (projectId) => {
  return await api.get<ProcessHistoryType[]>(`/project/${projectId}/history/list`)
}

export const getProjectProcessState = async (projectId, processCode) => {
  return await api.get<{
    stageProgress: string
  }>(`/project/${projectId}/${processCode}/detail`)
}

export const getProjectMemberList = async (projectId) => {
  return await api.get<MemberType[]>(`/project/project-member/list?id=${projectId}`)
}

export const getPlanningDetailInfo = async (proejctId) => {
  return await api.get<{
    productType: string
    dataType: string
  }>(`/project/${proejctId}/planning/detail`)
}

export const getPlanningDocumentList = async (
  projectId,
  filterInfo: { projectPlanningDocumentStatusTab: string; projectPlanningDocumentTypeTab: string; keyword: string },
  paginationInfo: ProjectPaginationType
) => {
  const filter = Object.keys(filterInfo)
    .filter((key) => filterInfo[key] !== '' && filterInfo[key] !== 'all')
    .map((key) => `${key}=${filterInfo[key]}`)
    .join('&')
  return await api.get<ResponseType<PlanningDocumentType>>(
    `/project/${projectId}/planning/document/list?page=${paginationInfo.currentPage}&size=${paginationInfo.pageSize}${filter !== '' ? `&${filter}` : ''}`
  )
}

export const deleteDocument = async (fileNum: number) => {
  return await api.post(`/project/document/${fileNum}/delete`)
}

export const getMyCorporateMember = async (keyword: string) => {
  return await api.get<MyCorporateMemberType[]>(
    `/project/my-corporation-member/list${keyword === '' || keyword === undefined ? '' : `?usrNm=${keyword}&emlId=${keyword}`}`
  )
}

export const addProject = async (projectInfo) => {
  return await api.post(`/project/add`, projectInfo)
}

export const editProject = async (projectInfo) => {
  return await api.post(`/project/${projectInfo.id}/modify`, projectInfo)
}

export const deleteProject = async (id) => {
  return await api.post(`/project/${id}/delete`)
}

export const editProjectPlanning = async (planningInfo: { id: number; projectPlanningDataTab: string; projectPlanningProductTab: string }) => {
  return await api.post(`/project/${planningInfo.id}/planning/modify`)
}

export const getOligoDesignRequestList = async (projectInfo: ProjectBasicInfoType, filterInfo, pagination) => {
  const filter = Object.keys(filterInfo)
    .filter((key) => filterInfo[key] !== '' && filterInfo[key] !== 'all')
    .map((key) => `${key}=${filterInfo[key]}`)
    .join('&')
  return await apiIsc.get<ResponseType<OligoDesignRequestType>>(
    `/request-info/list?prjNum=${projectInfo.id}&page=${pagination.currentPage}&size=${pagination.pageSize}${filter === '' ? '' : `&${filter}`}`
  )
}

export const getProjectProcessStatus = async (projectId) => {
  return await api.get<ProcessType[]>(`/project/process/${projectId}/list`)
}

export const putProjectStatus = async ({ id, prjStsCd }: { id: number; prjStsCd: 'ONG' | 'ABR' | 'CMP' }) => {
  return await api.put(`/project/${id}/status`, { prjStsCd })
}

export const editProjectProcessStatus = async ({
  id,
  projectProcess,
  projectProcessProgress,
}: {
  id: number
  projectProcess: string
  projectProcessProgress: string
}) => {
  return await api.post(`/project/${id}/stage/modify`, { projectProcess, projectProcessProgress })
}

export const editPlanningInfo = async ({ id, productType, dataType }: { id: number; productType?: string; dataType?: string }) => {
  return await api.post(`/project/${id}/planning/modify`, { productType, dataType })
}

export const addRequest = async (data: {
  prjNum: number
  prcsCd: string
  appTpCd?: string
  reqNm: string
  reqStsCd?: string
  anlTpCd?: string
  dsignTpCd?: string
  enzmCd?: string
}) => {
  const filter = Object.keys(data)
    .filter((key) => data[key] !== '' && data[key] !== undefined)
    .map((key) => `${key}=${data[key]}`)
    .join('&')
  // return await apiIsc.post(`/request-info/add`, data)
  return await apiIsc.post(`/request-info/add?${filter}`)
}

export const addProjectParticipation = async (data) => {
  return await api.post(`/project/project-participation-demand/add`, data)
}

export const reqProjectParticipation = async (data) => {
  return await api.post<AuthorityResponseType | null>(`/project/project-participation-demand/add`, data)
}

export const editAuthority = async (data) => {
  return await api.post<AuthorityResponseType | null>(`/project/project-authority/add`, data)
}

export const getProejctAuthority = async (projectId, paginationInfo: ProjectPaginationType) => {
  return await api.get<ResponseType<RequestsToProjectType>>(
    `/project/project-authority/list?prjNum=${projectId}&page=${paginationInfo.currentPage}&size=${paginationInfo.pageSize}`
  )
}

export const getProjectParticipationDemandDetail = async (id) => {
  return await api.get<RequestJoinConfirmType>(`/project/project-participation-demand/detail?id=${id}`)
}

export const getProjectAuthorityDetail = async (id) => {
  return await api.get<RequestJoinConfirmType>(`/project/project-authority/detail?id=${id}`)
}

export const editProjectAuthority = async (data) => {
  return await api.post(`/project/project-authority/modify`, data)
}

export const editProjectParticipationDemand = async (data) => {
  return await api.post(`/project/project-participation-demand/modify`, data)
}

export const checkOtherCorporationMember = async (email) => {
  return await api.get<OtherCorporateMemberType>(`/project/other-corporation-member?emlId=${email}`)
}

export const getProjectMemberDetailList = async (id) => {
  return await api.get<ProjectMemberDetailType[]>(`/project/project-member/detail?id=${id}`)
}

export const addDocument = async (documentInfo: AddDocumentType) => {
  return await api.post(`/project/document/add`, documentInfo)
}

export const modifyDocumentStatus = async ({ projectId, fileNum }: { projectId: string; fileNum: string }) => {
  return await api.post(`/project/${projectId}/planning/document/${fileNum}/status/modify`)
}

export const getOligoDesignDocumentList = async (id, paginationInfo, filterInfo) => {
  return await api.get<ResponseType<OligoDesignDocumentType>>(
    `/project/${id}/oligoDesign/document/list?page=${paginationInfo.currentPage}&size=${paginationInfo.pageSize}${
      filterInfo.keyword === '' ? '' : `&keyword=${filterInfo.keyword}`
    }`
  )
}

export const getDocumentDetail = async (documentNum) => {
  return await api.get<DocumentDetailType>(`/project/document/${documentNum}/detail`)
}

export const modifyDocument = async (data: { projectProcessNum: number; oldFileNum: number; newFileNum: number | null; description: string }) => {
  return await api.post(`/project/document/modify`, data)
}

export const addNote = async (data: { prjNum: number; procNum: number; cmtCnt: string }) => {
  return await api.post(`/project/note/add`, data.procNum === 0 ? { prjNum: data.prjNum, cmtCnt: data.cmtCnt } : data)
}

export const getNoteList = async (id) => {
  return await api.get<NoteListType>(`/project/note/${id}/list`)
}

export const copyRequest = async (requestId) => {
  return await apiIsc.post(`/request-info/${requestId}/copy`)
}

export const deleteRequest = async (requestId) => {
  return await apiIsc.post(`/request-info/${requestId}/delete`)
}

export const editFavorite = async ({ requestId, favYn }) => {
  return await apiIsc.post(`/request-info/${requestId}/favorite?fav_yn=${favYn}`)
}

export const vistSend = async (params: { title: string; content: string; pageUrl: string }) => {
  return await api.post(`/external/vist-send`, params)
}
