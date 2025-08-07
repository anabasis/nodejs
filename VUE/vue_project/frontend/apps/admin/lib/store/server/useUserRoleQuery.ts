import {
  addUserRole,
  deleteUserRole,
  getLevelUserList,
  getUserRoleAuthority,
  getUserRoleConditionList,
  getUserRoleDetailInfo,
  getUserRoleMember,
  updateUserRole,
  updateUserRoleMember,
} from '@api/role'
import { useQuery, useMutation } from '@tanstack/react-query'
import { UserRoleInfoType, UserRoleListReturnType, UserRoleMemberReturnType, UserRoleMemberType, UserRoleMenuAuthorityType } from '@type/role/userRole'

/* ------------useQuery--------------- */

// 사용자 역할 목록 조회
export const useUserRoleList = ({ searchFilterParams, propParams, currentPage }) => {
  const { data: userRoleList, isSuccess } = useQuery<UserRoleListReturnType>(
    ['userRoleList', searchFilterParams, propParams, currentPage],
    () => getUserRoleConditionList({ searchFilterParams, propParams, currentPage }),
    {}
  )

  return { userRoleList, isSuccess }
}

// 사용자 역할 상세 정보 조회
export const useUserRoleDetailInfo = (userRoleNumber: string) => {
  const response = useQuery<UserRoleInfoType>(['userRoleDetail', userRoleNumber], () => getUserRoleDetailInfo(userRoleNumber), {})

  if (response.isSuccess) {
    return response.data
  }
  return {
    userRoleNumber: 0,
    userRoleName: '-',
    corpLvCode: '-',
    usrRolCode: '-',
    roleLvCode: '-',
    modifyDate: '',
  }
}

// 사용자 역할 메뉴 권한 정보 조회
export const useUserRoleAuthority = (userRoleNumber: string) => {
  const response = useQuery<{ authorityUserGnbDtoList: UserRoleMenuAuthorityType[]; authorityUserLnbDtoList: UserRoleMenuAuthorityType[] }>(
    ['userRoleAuthority', userRoleNumber],
    () => getUserRoleAuthority(userRoleNumber),
    {}
  )

  if (response.isSuccess) {
    return response.data
  }
  return {
    authorityUserGnbDtoList: [],
    authorityUserLnbDtoList: [],
  }
}

// 사용자 역할 인원 조회
export const useUserRoleMember = (userRoleNumber: string, page: number, size: number) => {
  const { data: userRoleMemberList, isSuccess } = useQuery<UserRoleMemberReturnType>(
    ['userRoleMember', userRoleNumber, page],
    () => getUserRoleMember(userRoleNumber, page, size),
    {}
  )

  return { userRoleMemberList, isSuccess }
}

export const useLevelMember = ({ params, corporateLevel }) => {
  const { data: data, isSuccess } = useQuery<UserRoleMemberType[]>(
    ['levelUser', params, corporateLevel],
    () => getLevelUserList({ params, corporateLevel }),
    {}
  )
  return { data, isSuccess }
}

/* ------------useMutation--------------- */

// user role 추가
export const useUserRoleAdd = () => {
  return useMutation({ mutationFn: addUserRole })
}

// user role 저장
export const useUserRoleUpdate = () => {
  return useMutation({ mutationFn: updateUserRole })
}

// user role 삭제
export const useUserRoleDelete = () => {
  return useMutation({ mutationFn: deleteUserRole })
}

// 해당 user role 사용자 추가
export const useUserRoleMemberUpdate = () => {
  return useMutation({ mutationFn: updateUserRoleMember })
}
