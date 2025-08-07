import { AdminRoleInfoType, AdminRoleMenuAuthorityType } from '@type/role/adminRole'
import { UserRoleInfoType, UserRoleMenuAuthorityType } from '@type/role/userRole'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const userRoleInfoInitData = {
  userRoleName: '',
  corpLvCode: '',
  usrRolCode: '',
  roleLvCode: '',
}

const adminRoleInfoInitData = {
  adminRoleCode: '',
  adminRoleName: '',
}

/*-------------User Role----------------*/

// 사용자 역할 삭제 성공 여부
export const userRoleDeleteSuccessAtom = atom(false)

// 사용자 역할 수정 성공 여부
export const userRoleSaveSuccessAtom = atom(false)

// 사용자 역할 등록 성공 여부
export const userRoleAddSuccessAtom = atom(false)

// 사용자 역할 삭제 실패 여부
export const userRoleDeleteFailAtom = atom(false)

// 사용자 역할 멤버 변경 성공 여부
export const userRoleMemberSaveSusccessAtom = atom(false)

// 사용자 역할 변경할 기본 정보
export const userRoleInfoAtom = atomWithStorage<UserRoleInfoType>('userRoleInfo', userRoleInfoInitData)

// 사용자 역할 변경할 gnb 권한
export const userRoleGnbAuthorityAtom = atomWithStorage<UserRoleMenuAuthorityType[]>('userRoleGnbAuthority', [])

// 사용자 역할 변경할 lnb 권한
export const userRoleLnbAuthorityAtom = atomWithStorage<UserRoleMenuAuthorityType[]>('userRoleLnbAuthority', [])

/*-------------Admin Role----------------*/

// 어드민 역할 삭제 성공 여부
export const adminRoleDeleteSuccessAtom = atom(false)

// 어드민 역할 수정 성공 여부
export const adminRoleSaveSuccessAtom = atom(false)

// 어드민 역할 등록 성공 여부
export const adminRoleAddSuccessAtom = atom(false)

// 어드민 역할 멤버 변경 성공 여부
export const adminRoleMemberSaveSusccessAtom = atom(false)

// 어드민 역할 변경할 기본 정보
export const adminRoleInfoAtom = atomWithStorage<AdminRoleInfoType>('adminRoleInfo', adminRoleInfoInitData)

// 어드민 역할 변경할 gnb 권한
export const adminRoleGnbAuthorityAtom = atomWithStorage<AdminRoleMenuAuthorityType[]>('adminRoleGnbAuthority', [])

// 어드민 역할 변경할 lnb 권한
export const adminRoleLnbAuthorityAtom = atomWithStorage<AdminRoleMenuAuthorityType[]>('adminRoleLnbAuthority', [])
