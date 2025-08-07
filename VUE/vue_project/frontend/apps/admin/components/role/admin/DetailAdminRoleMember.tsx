import { Badge, BoardTable, ButtonMui, Icons, NoData, Pagenation } from 'ui'
import { ModalType, ToastType, useMenu, useModal, usePageNation, useToastPopup } from 'library'
import { AdminRoleMemberType } from '@type/role/adminRole'
import { useAdminRoleMember } from '@store/server/useAdminRoleQuery'
import ChangeAdminRole from '../popup/ChangeAdminRole'
import { useEffect, useState } from 'react'
import AddAdmin from '../popup/AddAdmin'
import { useAtom } from 'jotai'
import { adminRoleMemberSaveSusccessAtom } from '@store/client/role'
import { usePathname } from 'next/navigation'

/**
 * 어드민 역할 상세 화면 중 멤버 리스트 화면
 */

interface DetailAdminRoleMemberProps {
  roleNumber: string
}

const rowSize = 20

const DetailAdminRoleMember = (props: DetailAdminRoleMemberProps) => {
  const { roleNumber } = props

  const { currentPage, onPageChange } = usePageNation()
  const { adminRoleMemberList, isSuccess } = useAdminRoleMember(roleNumber, currentPage, rowSize)

  const [changeList, setChangeList] = useState<AdminRoleMemberType[]>([]) // 해당 역할의 선택된 멤버 리스트. 초기값은 기존 멤버 리스트()

  const [adminRoleMemberSaveSuccess, isAdminRoleMemberSaveSuccess] = useAtom(adminRoleMemberSaveSusccessAtom)

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { toastOpen } = useToastPopup()
  const { modalOpen } = useModal()

  /**
   * AdminRoleMemberAddSuccessToast: 사용자 역할 멤버 추가 성공 toast popup
   */
  const AdminRoleMemberAddSuccessToast: ToastType = {
    icon: 'success',
    content: 'Successfully added.',
  }

  /**
   * addUserModal: 인원 추가 popup
   * - 역할 레벨에 맞는 인원들만 조회할 것이기에 props로 준다.
   */
  const addAdminModal: ModalType = {
    deleteKey: 'addAdmin',
    title: 'Add user',
    textTitle: 'Please add a new member for the role.',
    linetitle: true,
    maxWidth: 'xl',
    content: (
      <AddAdmin purpose="e" roleNumber={roleNumber} userData={changeList} adminRoleMemberList={adminRoleMemberList?.content} setUserData={setChangeList} />
    ),
  }

  /**
   * handleChangeRoleModal: 역할 변경 modal
   * - member의 정보를 출력하고 새로운 역할 정보를 받아야 하므로 member를 props로 한다
   * - 기존의 리스트에서 해당 멤버 삭제
   * @param member 해당 멤버
   */
  const handleChangeRoleModal = (member: AdminRoleMemberType) => {
    const changeRoleModal: ModalType = {
      deleteKey: 'changeRole',
      title: 'Change role',
      textTitle: 'Please check the information and change the role.',
      linetitle: true,
      content: <ChangeAdminRole user={member} roleNumber={roleNumber} />,
    }
    modalOpen(changeRoleModal)
  }

  // 어드민 역할 회원 변경 성공 시 toast popup 제공
  useEffect(() => {
    if (adminRoleMemberSaveSuccess) {
      toastOpen(AdminRoleMemberAddSuccessToast)
      isAdminRoleMemberSaveSuccess(false)
    }
  }, [adminRoleMemberSaveSuccess])

  return (
    <>
      <div className="cont_title_box">
        <div className="align top">
          <div className="lft block">
            <p className="title1">
              Member Setting
              <Badge uiType="solid" color="blue" style="count" size="md" className="ml_10">
                {adminRoleMemberList?.totalElements || 0}
              </Badge>
            </p>
            <p className="body2 typo500">Please add member suited to their roles.</p>
          </div>
          <ButtonMui color="black" disabled={getPathInfo(pathname).uptYn !== 'Y'} onClick={() => modalOpen(addAdminModal)}>
            Add User
          </ButtonMui>
        </div>
      </div>
      <BoardTable>
        <colgroup>
          <col style={{ width: '14%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '9%' }} />
          <col style={{ width: '11%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Job</th>
            <th>Job Title</th>
            <th>User Role</th>
            <th>Admin Role</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {isSuccess && adminRoleMemberList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={8}>
                <NoData text="There are no registered member. Please add." />
              </td>
            </tr>
          ) : (
            adminRoleMemberList?.content?.map((member: AdminRoleMemberType, index: number) => (
              <tr key={index}>
                <td>{member.usrNm}</td>
                <td>{member.emlId}</td>
                <td>{member.orgnNm || '-'}</td>
                <td>{member.jobNm || '-'}</td>
                <td>{member.jobTitl || '-'}</td>
                <td>{member.usrRolNm || '-'}</td>
                <td>{member.admRoleNm || '-'}</td>
                <td>
                  {/* btn status on_bullet */}
                  <button className="btn status" disabled={getPathInfo(pathname).uptYn !== 'Y'} onClick={() => handleChangeRoleModal(member)}>
                    <Icons.Change />
                    <span>Change Role</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation currentPage={currentPage} onPageChange={onPageChange} totalCount={adminRoleMemberList?.totalElements || 0} pageSize={rowSize} />
    </>
  )
}

export default DetailAdminRoleMember
