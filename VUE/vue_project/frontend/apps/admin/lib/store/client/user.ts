import { SeegeneRoleRequestType } from '@type/user/user'
import { atom } from 'jotai'

const initSeegeneRoleChangeData = {
  adminRoles: [],
  userRole: {
    roleName: '',
    roleId: 0,
  },
  adminRoleReq: null,
}

// 회원 탈퇴 여부 toast popup을 위한 atom
export const withdrawlAtom = atom(false)

// 회원 탈퇴 불가 alert을 위한 atom
export const cancelWithdrawAtom = atom(false)

// 초대장 재전송 여부 toast popup을 위한 atom
export const resendInvitationAtom = atom(false)

// 초대장 취소 여부 toast popup을 위한 atom
export const cancelInvitationAtom = atom(false)

export const progressRequestNameAtom = atom('')

export const progressRequestStatusAtom = atom('')

export const selectedSeegeneUserAtom = atom('')

export const selectedSeegeneRoleChangeAtom = atom<SeegeneRoleRequestType>(initSeegeneRoleChangeData)

export const selectedNewcoUserAtom = atom('')
