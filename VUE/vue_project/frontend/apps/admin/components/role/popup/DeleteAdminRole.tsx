import { ButtonMui } from 'ui'
import { useAlert } from 'library'
import { useAtom } from 'jotai'
import { adminRoleDeleteSuccessAtom } from '@store/client/role'
import { useRouter } from 'next/navigation'
import { useAdminRoleDelete } from '@store/server/useAdminRoleQuery'
import { Dispatch, SetStateAction } from 'react'

interface DeleteAdminRoleProps {
  roleNumber: string
  isAdminRoleDeleteFail: Dispatch<SetStateAction<boolean>>
}

const DeleteAdminRole = (props: DeleteAdminRoleProps) => {
  const { roleNumber, isAdminRoleDeleteFail } = props

  const [adminRoleDeleteSuccess, isAdminRoleDeleteSuccess] = useAtom(adminRoleDeleteSuccessAtom) // 어드민 역할 삭제 성공 여부

  const mutateAdminRoleDelete = useAdminRoleDelete()

  const route = useRouter()

  const { alertClose } = useAlert()

  /**
   * handleDelete: Delete 버튼 클릭 시 동작하는 함수
   * - 해당 어드민 역할 삭제
   * - 어드민 역할 화면으로 이동
   */
  const handleDelete = () => {
    mutateAdminRoleDelete.mutate(roleNumber, {
      onSuccess: () => {
        isAdminRoleDeleteSuccess(true)
        alertClose()
        route.push('../')
      },
      onError: () => {
        isAdminRoleDeleteFail(true)
        return
      },
    })
  }

  return (
    <div className="align center mt_20">
      <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
        Cancel
      </ButtonMui>
      <ButtonMui size="xlarge" isLoading={mutateAdminRoleDelete.isLoading} onClick={() => handleDelete()}>
        Delete
      </ButtonMui>
    </div>
  )
}

export default DeleteAdminRole
