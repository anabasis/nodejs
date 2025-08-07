import {
  addAdminRole,
  deleteAdminRole,
  getAdminRoleAuthority,
  getAdminRoleConditionList,
  getAdminRoleDetailInfo,
  getAdminRoleMember,
  getHQMember,
  updateAdminRole,
  updateAdminRoleMember,
} from '@api/role'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AdminRoleInfoType, AdminRoleListReturnType, AdminRoleMemberReturnType, AdminRoleMemberType, AdminRoleMenuAuthorityType } from '@type/role/adminRole'

/* ------------useQuery--------------- */

// 어드민 역할 목록 조회
export const useAdminRoleList = ({ searchFilterParams, currentPage }) => {
  const { data: adminRoleList, isSuccess } = useQuery<AdminRoleListReturnType>(['userRoleList', searchFilterParams, currentPage], () =>
    getAdminRoleConditionList({ searchFilterParams, currentPage })
  )

  return { adminRoleList, isSuccess }
}

// 사용자 역할 상세 정보 조회
export const useAdminRoleDetailInfo = (adminRoleNumber: string) => {
  const response = useQuery<AdminRoleInfoType>(['adminRoleDetail', adminRoleNumber], () => getAdminRoleDetailInfo(adminRoleNumber), {})

  if (response.isSuccess) {
    return response.data
  }
  return {
    adminRoleNumber: 0,
    adminRoleCode: '-',
    adminRoleName: '-',
    modifyDate: '',
  }
}

// 사용자 역할 메뉴 권한 정보 조회
export const useAdminRoleAuthority = (adminRoleNumber: string) => {
  const response = useQuery<{ authorityAdminRoleGnbList: AdminRoleMenuAuthorityType[]; authorityAdminRoleLnbList: AdminRoleMenuAuthorityType[] }>(
    ['adminRoleAuthority', adminRoleNumber],
    () => getAdminRoleAuthority(adminRoleNumber),
    {}
  )

  if (response.isSuccess) {
    return response.data
  }
  return {
    authorityAdminRoleGnbList: [],
    authorityAdminRoleLnbList: [],
  }
}

// 어드민 역할 인원 조회
export const useAdminRoleMember = (adminRoleNumber: string, page: number, size: number) => {
  const { data: adminRoleMemberList, isSuccess } = useQuery<AdminRoleMemberReturnType>(
    ['adminRoleMember', adminRoleNumber, page],
    () => getAdminRoleMember(adminRoleNumber, page, size),
    {}
  )

  return { adminRoleMemberList, isSuccess }
}

// HQ 인원 조회
export const useHQmember = (param: { searchType: string; keyword?: string }) => {
  const { data: data, isSuccess } = useQuery<AdminRoleMemberType[]>(['hqMember', param], () => getHQMember(param), {})
  return { data, isSuccess }
}

/* ------------useMutation--------------- */
// admin role 추가
export const useAdminRoleAdd = () => {
  return useMutation({ mutationFn: addAdminRole })
}

// admin role 저장
export const useAdminRoleUpdate = () => {
  return useMutation({ mutationFn: updateAdminRole })
}

// admin role 저장
export const useAdminRoleDelete = () => {
  return useMutation({ mutationFn: deleteAdminRole })
}

// 해당 admin role 사용자 추가
export const useAdminRoleMemberUpdate = () => {
  return useMutation({ mutationFn: updateAdminRoleMember })
}
