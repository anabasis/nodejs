import { ProjectBasicInfoType } from '@type/project/projectType'

//프로젝트 Management 또는 프로세스 Management
export const getMGAuth = (projectInfo: ProjectBasicInfoType, processCode: string) => {
  return (
    projectInfo.projectRoleCode === 'PJM' ||
    projectInfo.projectProcessRole.filter((item) => item['processRoleCode'] === 'MGMT' && item.processCodes.includes(processCode)).length > 0
  )
}
//프로세스 Edit
export const getEditAuth = (projectInfo: ProjectBasicInfoType, processCode: string) => {
  return (
    projectInfo.projectRoleCode === 'PJM' ||
    projectInfo.projectProcessRole.filter(
      (item) => (item['processRoleCode'] === 'MGMT' || item['processRoleCode'] === 'EDIT') && item.processCodes.includes(processCode)
    ).length > 0
  )
}
