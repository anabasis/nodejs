import { apiAdmin } from 'library/util'
import {
  CorporateType,
  ProcessListType,
  ProjectDetailType,
  ProjectFilterType,
  ProjectListType,
  ProjectMemberType,
  ProjectProcessType,
  ResponseType,
  UserType,
} from '@type/project/projectType'

export const getProjectList = async (filterInfo: ProjectFilterType, currentPage: number) => {
  const filter = Object.keys(filterInfo)
    .filter((key) => filterInfo[key] !== '' && filterInfo[key] !== 'all' && !['displayStartDate', 'displayEndDate'].includes(key))
    .map((key) => `${key}=${filterInfo[key]}`)
    .join('&')

  return await apiAdmin.get<ResponseType<ProjectListType>>(
    `/projectmanagement/list?${encodeURI(`${filter === '' ? '' : `${filter}&`}page=${currentPage}&sort=id,desc`)}`
  )
}

export const getProcessList = async () => {
  return await apiAdmin.get<ProcessListType[]>(`/projectmanagement/process/list`)
}

export const getProjectInfo = async (projectId) => {
  return await apiAdmin.get<ProjectDetailType>(`/projectmanagement/${projectId}/detail`)
}

export const getProjectMember = async (projectId) => {
  return await apiAdmin.get<ProjectMemberType[]>(`/projectmanagement/${projectId}/detail/member/list`)
}

export const getProejctProcessList = async (projectId) => {
  return await apiAdmin.get<ProjectProcessType[]>(`/projectmanagement/process/${projectId}/list`)
}

export const getCorporateList = async () => {
  return await apiAdmin.get<CorporateType[]>(`/common/corporate/list`)
}

export const getUserList = async (filterInfo: { corpNm: string; userNm: string }) => {
  return await apiAdmin.get<UserType[]>(
    `/common/user/user-list?userStatusCode=NRM${filterInfo.corpNm === 'all' ? '' : `&corpNm=${filterInfo.corpNm}`}${
      filterInfo.userNm === '' ? '' : `&userNm=${filterInfo.userNm}`
    }`
  )
}

export const getProjectProcessList = async (id) => {
  return await apiAdmin.get<ProjectProcessType[]>(`/projectmanagement/process/${id}/list`)
}

export const editProjectInfo = async (projectInfo) => {
  return await apiAdmin.post(`/projectmanagement/detail/member/${projectInfo.id}/modify`, { members: projectInfo.members })
}
