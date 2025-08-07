import { getAdminRoleList, getUserRoleList } from '@api/common'
import {
  cancelInvitationSeegeneUser,
  getRoleChangeRequest,
  getSeegeneInInvitationList,
  getSeegeneInProgressList,
  getSeegeneProjectList,
  getSeegeneRegisteredList,
  getSeegeneUserDetailInfo,
  inviteSeegeneUser,
  processAdminRoleRequestSeegeneUser,
  processUserRoleRequestSeegeneUser,
  registerOrNotSeegeneUser,
  resendInvitationSeegeneUser,
  withdrawSeegeneUser,
} from '@api/seegeneUser'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AdminRoleCommonType, UserRoleCommonType } from '@type/common/common'
import {
  SeegeneCompleteListReturnType,
  SeegeneDetailInfo,
  SeegeneInvitationListReturnType,
  SeegeneProgressUserReturnType,
  SeegeneRoleRequestType,
  SeegeneUserProjectListReturnType,
} from '@type/user/user'

const initSeegeneDetailData = {
  userName: '-',
  emailId: '-',
  corporationName: '-',
  departmentName: '-',
  positionName: '-',
  memberRegDate: '',
  lastAccessDate: null,
  lastAccessIp: '-',
  lastAccessCountry: '-',
  userRole: {
    roleName: '-',
    roleId: 0,
  },
  adminRoles: [],
  userRoleReq: '',
  adminRoleReqList: [],
  registerGb: '',
  fileInfoPrvResponse: {
    fileNumber: 0,
    fileName: '/images/no_icon.png',
    displayFileName: '',
    fileExtension: '',
    filePath: 'png',
    fileSize: 0,
    storageTypeCode: '',
    tableName: '',
  },
  userStatusCode: '-',
}

/* ------------useQuery--------------- */

// seegene 회원 가입 완료 회원 리스트 조회
export const useSeegeneCompleteData = ({ searchFilterParams, currentPage }) => {
  const { data: completeList, isSuccess } = useQuery<SeegeneCompleteListReturnType>(
    ['seegeneCompleteList', searchFilterParams, currentPage],
    () => getSeegeneRegisteredList({ searchFilterParams, currentPage }),
    {}
  )

  return { completeList, isSuccess }
}

// seegene 회원 가입 완료 진행 리스트 조회
export const useSeegeneProgressData = ({ searchFilterParams, currentPage }) => {
  const { data: progressList, isSuccess } = useQuery<SeegeneProgressUserReturnType>(
    ['seegeneProgressList', searchFilterParams, currentPage],
    () => getSeegeneInProgressList({ searchFilterParams, currentPage }),
    {}
  )

  return { progressList, isSuccess }
}

// seegene 회원 가입 초대 회원 리스트 조회
export const useSeegeneInvitationData = ({ searchFilterParams, currentPage }) => {
  const { data: invitationList, isSuccess } = useQuery<SeegeneInvitationListReturnType>(
    ['seegeneInvitationList', searchFilterParams, currentPage],
    () => getSeegeneInInvitationList({ searchFilterParams, currentPage }),
    {}
  )

  return { invitationList, isSuccess }
}

// 해당 seegene 회원 상세 조회
export const useSeegeneDetatilData = (uid: string) => {
  const response = useQuery<SeegeneDetailInfo>(['seegeneDetailData', uid], () => getSeegeneUserDetailInfo(uid), {})

  if (response.isSuccess && response.data !== undefined) {
    return response.data
  }
  return initSeegeneDetailData
}

// 해당 seegene 회원 역할 변경 요청 조회
export const useSeegeneRoleChangeRequest = (uid: string) => {
  const response = useQuery<SeegeneRoleRequestType>(['seegeneRoleChange', uid], () => getRoleChangeRequest(uid), {})
  if (response.isSuccess && response.data !== undefined) {
    return response.data
  }
  return {
    userRole: {
      roleId: 0,
      roleName: '',
    },
    adminRoles: [],
    adminRoleReq: null,
  }
}

// 해당 seegene 회원이 선택할 수 있는 user role 리스트 조회
export const useSeegeneUserRoleData = () => {
  const response = useQuery<UserRoleCommonType[]>(['seegeneUserRoleList'], () => getUserRoleList(), {})

  if (!response.isSuccess) {
    return []
  }

  let list = response.data.filter((value) => value.corpLv === 'LV1')
  return list.map((value) => ({ ...value, value: value.id.toString() }))
}

// admin role 리스트 조회
export const useSeegeneAdminRoleData = () => {
  const response = useQuery<AdminRoleCommonType[]>(['adminRoleList'], () => getAdminRoleList(), {})

  if (!response.isSuccess) {
    return []
  }

  return response.data.map((value) => ({ name: value.admRolNm, value: value.admRolNum.toString() }))
}

// 해당 seegene 회원의 프로젝트 리스트 조회
export const useSeegeneProjectListData = (uid: string, currentPage: number, rowSize: number) => {
  const { data: projectList, isSuccess } = useQuery<SeegeneUserProjectListReturnType>(
    ['seegeneProjectList', uid, currentPage],
    () => getSeegeneProjectList(uid, currentPage, rowSize),
    {}
  )

  return { projectList, isSuccess }
}

/* ------------useMutation--------------- */

// seegene 회원 초대
export const useInviteSeegene = () => {
  return useMutation({ mutationFn: inviteSeegeneUser })
}

// 해당 seegene 회원 가입 승인/거절
export const useRegisterOrNotSeegeneMutate = () => {
  return useMutation({ mutationFn: registerOrNotSeegeneUser })
}

// 해당 seegene 회원의 초대 재전송
export const useResendSeegeneInvitationMutate = () => {
  return useMutation({ mutationFn: resendInvitationSeegeneUser })
}

// 해당 seegene 회원의 초대 취소
export const useCancelSeegeneInvitationMutate = () => {
  return useMutation({ mutationFn: cancelInvitationSeegeneUser })
}

// seegene 회원 탈퇴
export const useWithdrawSeegene = () => {
  return useMutation({ mutationFn: withdrawSeegeneUser })
}

// seegene 회원 user role 변경 승인/거절
export const useApproveOrNotSeegeneUserRole = () => {
  return useMutation({ mutationFn: processUserRoleRequestSeegeneUser })
}

// seegene 회원 admin role 변경 승인/거절
export const useApproveOrNotSeegeneAdminRole = () => {
  return useMutation({ mutationFn: processAdminRoleRequestSeegeneUser })
}
