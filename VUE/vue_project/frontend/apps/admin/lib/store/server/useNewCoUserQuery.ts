import { getCountryCodeList, getUserRoleList } from '@api/common'
import {
  changeUserRole,
  declineUserRole,
  getNewCoInvitationList,
  getNewCoProgressList,
  getNewCoProjectList,
  getNewCoRegisteredList,
  getNewCoUserDetailInfo,
  inviteCancelNewCoUser,
  inviteNewCoUser,
  inviteResendNewCoUser,
  passwordReset,
  registerNewCoUser,
  rejectNewCoUser,
  withdrawNewCoUser,
} from '@api/newCoUser'
import { useQuery, useMutation } from '@tanstack/react-query'
import { CountryCodeCommonType, UserRoleCommonType } from '@type/common/common'
import {
  NewCoCompleteListReturnType,
  NewCoDetailInfo,
  NewCoInvitationListReturnType,
  NewCoProgressListReturnType,
  NewCoUserProjectListReturnType,
} from '@type/user/user'

const initNewCoDetailData = {
  userUid: '-',
  fullName: '-',
  emailId: '-',
  corporationName: '-',
  organization: '-',
  jobName: '-',
  createDate: '2023-01-01 00:00:00',
  lastAccessDate: '2023-01-01 00:00:00',
  usrRolName: '-',
  usrRolId: 0,
  jobTile: '-',
  roleRequestYn: 'N',
  roleRequest: 0,
  fileInfoResponse: {
    fileNumber: 0,
    fileName: '-',
    displayFileName: '-',
    fileExtension: '-',
    filePath: '-',
    fileSize: 0,
    storageTypeCode: '-',
    tableName: '-',
    preSignedUrl: '-',
  },
  userStatusCode: '-',
}

/* ------------useQuery--------------- */

export const useCountryCodeData = () => {
  const response = useQuery<CountryCodeCommonType[]>(['countryList'], () => getCountryCodeList(), {})

  if (!response.isSuccess) {
    return []
  }
  return response.data.map((item) => ({ name: item.engCountryNm, value: item.countryCd }))
}

export const useNewCoUserRoleData = () => {
  const response = useQuery<UserRoleCommonType[]>(['newCoUserRoleList'], () => getUserRoleList(), {})

  if (!response.isSuccess) {
    return []
  }

  let list = response.data.filter((value) => value.corpLv === 'LV2')
  return list.map((value) => ({ ...value, value: value.id.toString() }))
}

export const useNewCoCompleteData = ({ params, currentPage }) => {
  const { data: completeList, isSuccess } = useQuery<NewCoCompleteListReturnType>(
    ['newCoCompleteList', params, currentPage],
    () => getNewCoRegisteredList({ params, currentPage }),
    {}
  )

  return { completeList, isSuccess }
}

export const useNewCoPrgressData = ({ params, currentPage }) => {
  const { data: progressList, isSuccess } = useQuery<NewCoProgressListReturnType>(
    ['newCoPrgressList', params, currentPage],
    () => getNewCoProgressList({ params, currentPage }),
    {
      retry: false,
    }
  )

  return { progressList, isSuccess }
}

export const useNewCoInvitationData = ({ searchFilterParams, currentPage }) => {
  const { data: invitationList, isSuccess } = useQuery<NewCoInvitationListReturnType>(
    ['newCoInvitationList', searchFilterParams, currentPage],
    () => getNewCoInvitationList({ searchFilterParams, currentPage }),
    {}
  )

  return { invitationList, isSuccess }
}

export const useNewCoDetailData = (uid: string) => {
  const response = useQuery<NewCoDetailInfo>(['newCoDetailData', uid], () => getNewCoUserDetailInfo(uid), {})
  if (response.isSuccess) {
    return response.data
  }
  return initNewCoDetailData
}

export const useNewCoProjectListData = (uid: string, currentPage: number, rowSize: number) => {
  const { data: projectList, isSuccess } = useQuery<NewCoUserProjectListReturnType>(
    ['newCoProjectList', uid, currentPage],
    () => getNewCoProjectList(uid, currentPage, rowSize),
    {}
  )

  return { projectList, isSuccess }
}

/* ------------useMutation--------------- */

// 해당 seegene 회원의 초대 재전송
export const useResendNewCoInvitationMutate = () => {
  return useMutation({ mutationFn: inviteResendNewCoUser })
}

// 해당 newco 회원 가입 승인
export const useApproveNewCoRegistrationMutate = () => {
  return useMutation({ mutationFn: registerNewCoUser })
}

// 해당 newco 회원 가입 거절
export const useDenyNewCoRegistrationMutate = () => {
  return useMutation({ mutationFn: rejectNewCoUser })
}

// 해당 seegene 회원의 초대 취소
export const useCancelNewCoInvitationMutate = () => {
  return useMutation({ mutationFn: inviteCancelNewCoUser })
}

// newco 회원 초대
export const useInviteNewCo = () => {
  return useMutation({ mutationFn: inviteNewCoUser })
}

// newco 회원 탈퇴
export const useWithdrawNewCo = () => {
  return useMutation({ mutationFn: withdrawNewCoUser })
}

// newco 회원 비밀번호 변경
export const useUserPasswordReset = () => {
  return useMutation({ mutationFn: passwordReset })
}

// newco 회원 user role 변경 승인
export const useApproveNewCoUserRole = () => {
  return useMutation({ mutationFn: changeUserRole })
}

// newco 회원 user role 변경 거절
export const useDeclineNewCoRole = () => {
  return useMutation({ mutationFn: declineUserRole })
}
