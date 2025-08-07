/**
 * 화면: 사용자 역할_역할 삭제 팝업
 */

import { ButtonMui, SelectChangeEvent, SelectMui, DetailTable } from 'ui'
import { useMemo, useState } from 'react'
import { useAlert } from 'library'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { userRoleDeleteFailAtom, userRoleDeleteSuccessAtom } from '@store/client/role'
import { useUserRoleData } from '@store/server/useCommonQuery'
import { UserRoleInfoType } from '@type/role/userRole'
import { useUserRoleDelete } from '@store/server/useUserRoleQuery'

interface DeleteUserRoleProps {
  roleInfo: UserRoleInfoType
}

const DeleteUserRole = (props: DeleteUserRoleProps) => {
  const { roleInfo } = props
  const [selectedRole, setSelectedRole] = useState('')
  const [userRoleDeleteSuccess, isUserRoleDeleteSuccess] = useAtom(userRoleDeleteSuccessAtom) // 사용자 역할 삭제 성공 여부. 역할 화면에 삭제 toast가 노출되므로 props drilling 방지 목적으로 jotai 사용
  const [userRoleDeleteFail, isUserRoleDeleteFail] = useAtom(userRoleDeleteFailAtom) // 사용자 역할 삭제 실패 여부 - 삭제 팝업에서 삭제 처리 시도

  // 선택한 변경 역할이 있는 경우에만 삭제 버튼 활성화
  const disabledButton = useMemo(() => {
    return !selectedRole.length
  }, [selectedRole])

  const route = useRouter()
  const mutateUserRoleDelete = useUserRoleDelete()

  const userRoleList = useUserRoleData()
    .filter((item) => item.roleLv === roleInfo.roleLvCode && item.corpLv === roleInfo.corpLvCode)
    .filter((item) => item.id !== roleInfo.userRoleNumber)
    .map((item) => ({ ...item, value: item.value.toString() }))

  const { alertClose } = useAlert()

  /**
   * handleDelete: Delete 버튼을 클릭하면 동작하는 함수
   * - 삭제 성공 toast 노출
   * - 사용자 역할 화면으로 이동
   * - alert 닫기
   */
  const handleDelete = () => {
    mutateUserRoleDelete.mutate(
      { roleNumber: roleInfo.userRoleNumber, changeRole: Number(selectedRole) },
      {
        onSuccess: () => {
          isUserRoleDeleteSuccess(true)
          alertClose()
          route.push('/role/user')
        },
        onError: () => {
          isUserRoleDeleteFail(true)
        },
      }
    )
  }

  return (
    <>
      <hr className="mt_20" />
      <DetailTable
        colgroup={
          <colgroup>
            <col width="30%" />
            <col width="70%" />
          </colgroup>
        }
      >
        <tr>
          <th>User role</th>
          <td className="pr_0">
            <SelectMui
              // 선택 리스트에는 현재 역할을 제외하고 노출
              options={userRoleList}
              size="full"
              placeholder="Please select a user role."
              onChange={(event: SelectChangeEvent) => setSelectedRole(event.target.value)}
            />
          </td>
        </tr>
      </DetailTable>
      <div className="align center mt_20">
        <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          disabled={disabledButton || mutateUserRoleDelete.isLoading}
          isLoading={mutateUserRoleDelete.isLoading}
          onClick={() => handleDelete()}
        >
          Delete
        </ButtonMui>
      </div>
    </>
  )
}

export default DeleteUserRole
