/**
 * 화면: 사용자 역할_역할 상세_역할 수정_역할 인원_역할 변경.p
 */

import { ButtonMui, SelectChangeEvent, SelectMui, DetailTable } from 'ui'
import { useEffect, useMemo, useState } from 'react'
import { ToastType, useModal, useToastPopup } from 'library'
import { UserRoleInfoType, UserRoleMemberType } from '@type/role/userRole'
import { useUserRoleData } from '@store/server/useCommonQuery'
import { userRoleMemberSaveSusccessAtom } from '@store/client/role'
import { useAtom } from 'jotai'
import { useQueryClient } from '@tanstack/react-query'
import { useUserRoleMemberUpdate } from '@store/server/useUserRoleQuery'

interface ChangeUserRoleProps {
  user: UserRoleMemberType // 현재 멤버
  roleInfo: UserRoleInfoType
}

const ChangeUserRole = (props: ChangeUserRoleProps) => {
  const { user, roleInfo } = props
  const [selectedUserRole, setSelectedUserRole] = useState('') // 선택된 user role
  const [userRoleMemberSaveFail, isUserRoleMemberSaveFail] = useState(false) // 사용자 역할 회원 변경 실패 여부

  const [userRoleMemberSaveSuccess, isUserRoleMemberSaveSuccess] = useAtom(userRoleMemberSaveSusccessAtom) // 사용자 역할 회원 변경 성공 여부

  const queryClient = useQueryClient()
  const mutateUpdateUserRoleMember = useUserRoleMemberUpdate()

  // 사용자 역할 해당 멤버가 가지고 있는 역할을 제외. 맞는 기업 레벨과 역할 레벨의 리스트로만 필터링
  const userRoleList = useUserRoleData()
    .filter((item) => item.roleLv === roleInfo.roleLvCode && item.corpLv === roleInfo.corpLvCode)
    .filter((item) => item.id !== roleInfo.userRoleNumber)
    .map((item) => ({ ...item, value: item.value.toString() }))

  // 저장 버튼 비활성화 여부, 현 멤버에게 새로운 역할을 부여하지 않으면 Save 버튼 비활성화
  const disabledButton = useMemo(() => {
    return !selectedUserRole
  }, [selectedUserRole])

  const { toastOpen } = useToastPopup()
  const { modalClose } = useModal()

  /**
   * UserRoleMemberAddFailToast: 사용자 역할 멤버 추가 실패 toast popup
   */
  const UserRoleMemberAddFailToast: ToastType = {
    icon: 'warning',
    content: 'Add failed.',
  }

  /**
   * handleSave: Save 버튼을 클릭하면 동작하는 함수
   * - 현 멤버의 새로운 역할fh 변경하고 멤버 리스트에서 제외. 즉, 다시 조회
   * - 모달 닫기
   */
  const handleSave = () => {
    let data = {
      usrUid: user.usrUid,
      procTp: 'C',
      modifyUsrRoleNum: Number(selectedUserRole),
    }

    mutateUpdateUserRoleMember.mutate(
      { data: [data], roleNumber: selectedUserRole },
      {
        onSuccess: () => {
          isUserRoleMemberSaveSuccess(true)
          queryClient.invalidateQueries(['userRoleMember'])
          modalClose('changeRole')
        },
        onError: () => {
          isUserRoleMemberSaveFail(true)
        },
      }
    )
  }

  // 멤버 변경 싫패 시 toast popup 제공
  useEffect(() => {
    if (userRoleMemberSaveFail) {
      toastOpen(UserRoleMemberAddFailToast)
      isUserRoleMemberSaveFail(false)
    }
  }, [userRoleMemberSaveFail])

  return (
    <>
      <div className="bg_box">
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
          }
        >
          <tr>
            <th className="navy300">Name</th>
            <td className="navy600">{user.usrNm}</td>
          </tr>
          <tr>
            <th className="navy300">Corporate</th>
            <td className="navy600">{user.corpNm}</td>
          </tr>
          <tr>
            <th className="navy300">Email</th>
            <td className="navy600">{user.emlId}</td>
          </tr>
          <tr>
            <th className="navy300">Organization</th>
            <td className="navy600">{user.orgnNm || '-'}</td>
          </tr>
          <tr>
            <th className="navy300">Job title</th>
            <td className="navy600">{user.jobTitl || '-'}</td>
          </tr>
        </DetailTable>
      </div>

      <div className="ptb_20 pl_24">
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '28%' }} />
              <col style={{ width: '72%' }} />
            </colgroup>
          }
        >
          <tr>
            <th>User role</th>
            <td>
              {/* 사용자 역할 select - None은 왜 있는 거지 */}
              <SelectMui
                value={selectedUserRole}
                options={userRoleList}
                size="full"
                placeholder="Please select a user role."
                onChange={(event: SelectChangeEvent<string>) => setSelectedUserRole(event.target.value)}
              />
            </td>
          </tr>
        </DetailTable>
      </div>

      <div className="align center">
        {/* 모달 닫기 */}
        <ButtonMui size="xlarge" type="outlined" onClick={() => modalClose('changeRole')}>
          Cancel
        </ButtonMui>
        {/* Save */}
        <ButtonMui
          size="xlarge"
          disabled={disabledButton || mutateUpdateUserRoleMember.isLoading}
          isLoading={mutateUpdateUserRoleMember.isLoading}
          onClick={() => handleSave()}
        >
          Save
        </ButtonMui>
      </div>
    </>
  )
}

export default ChangeUserRole
