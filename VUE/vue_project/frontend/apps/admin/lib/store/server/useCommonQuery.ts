import { getUserRoleList, getLoginHistoryList, getAdminRoleList } from '@api/common'
import { useQuery } from '@tanstack/react-query'
import { AdminRoleCommonType, UserRoleCommonType } from '@type/common/common'

// 사용자 역할 전체 리스트 API call
export const useUserRoleData = () => {
  const response = useQuery<UserRoleCommonType[]>(['userRoleList'], () => getUserRoleList(), {})

  if (!response.isSuccess) {
    return []
  }
  return response.data.map((item) => ({ ...item, value: item.id }))
}

// 어드민 역할 전체 리스트 API call
export const useAdminRoleData = () => {
  const response = useQuery<AdminRoleCommonType[]>(['adminRoleList'], () => getAdminRoleList(), {})

  if (!response.isSuccess) {
    return []
  }
  return response.data.map((item) => ({ ...item, name: item.admRolNm, value: item.admRolNum.toString() }))
}

// 로그인 이력 API call
export const useLoginHistoryListData = (uid: string) => {
  const response = useQuery(['loginHistory', uid], () => getLoginHistoryList(uid), {})

  if (response.isSuccess) {
    return response.data
  }
  return []
}
