import { Badge, BoardTable, ButtonMui, Icons, NoData, Pagenation } from 'ui'
import { ModalType, ToastType, useMenu, useModal, usePageNation, useToastPopup } from 'library'
import { useUserRoleMember } from '@store/server/useUserRoleQuery'
import { UserRoleInfoType, UserRoleMemberType } from '@type/role/userRole'
import ChangeUserRole from '../popup/ChangeUserRole'
import { useEffect } from 'react'
import AddUser from '../popup/AddUser'
import { useAtom } from 'jotai'
import { userRoleMemberSaveSusccessAtom } from '@store/client/role'
import { usePathname } from 'next/navigation'

/**
 * 화면: 사용자 역할_역할 상세_역할 인원
 */

interface DetailUserRoleMemberProps {
  roleInfo: UserRoleInfoType
  roleNumber: string
}

const rowSize = 20

const DetailUserRoleMember = (props: DetailUserRoleMemberProps) => {
  const { roleInfo, roleNumber } = props

  const { currentPage, onPageChange } = usePageNation()
  const { userRoleMemberList, isSuccess } = useUserRoleMember(roleNumber, currentPage, rowSize)

  const [userRoleMemberSaveSuccess, isUserRoleMemberSaveSuccess] = useAtom(userRoleMemberSaveSusccessAtom) // 사용자 역할 회원 변경 성공 여부

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { toastOpen } = useToastPopup()
  const { modalOpen } = useModal()

  /**
   * UserRoleMemberAddSuccessToast: 사용자 역할 멤버 추가 성공 toast popup
   */
  const UserRoleMemberAddSuccessToast: ToastType = {
    icon: 'success',
    content: 'Successfully added.',
  }

  /**
   * addUserModal: 인원 추가 popup
   * - 기업 레벨, 역할 레벨에 맞는 인원들만 조회할 것이기에 props로 준다.
   */
  const addUserModal: ModalType = {
    deleteKey: 'addUser',
    title: 'Add user',
    textTitle: 'Please add a new member for the role.',
    linetitle: true,
    maxWidth: 'xl',
    content: <AddUser purpose="e" corporateLevel={roleInfo?.corpLvCode} roleNumber={roleNumber} />,
  }

  /**
   * handleChangeRoleModal: 역할 변경 modal
   * - member의 정보를 출력하고 새로운 역할 정보를 받아야 하므로 member를 props로 한다
   * - 기존의 리스트에서 해당 멤버 삭제
   * @param member 해당 멤버
   */
  const handleChangeRoleModal = (member: UserRoleMemberType) => {
    member.usrRolNm = roleNumber
    const changeRoleModal: ModalType = {
      deleteKey: 'changeRole',
      title: 'Change role',
      textTitle: 'Please check the information and change the role.',
      linetitle: true,
      content: <ChangeUserRole user={member} roleInfo={roleInfo} />,
    }
    modalOpen(changeRoleModal)
  }

  // 회원 변경 성공 시 toast popup 제공
  useEffect(() => {
    if (userRoleMemberSaveSuccess) {
      toastOpen(UserRoleMemberAddSuccessToast)
      isUserRoleMemberSaveSuccess(false)
    }
  }, [userRoleMemberSaveSuccess])

  return (
    <>
      <div className="cont_title_box">
        <div className="align top">
          <div className="lft block">
            <p className="title1">
              Member Setting
              <Badge uiType="solid" color="blue" style="count" size="md" className="ml_10">
                {userRoleMemberList?.totalElements || 0}
              </Badge>
            </p>
            <p className="body2 typo500">Please add member suited to their roles.</p>
          </div>
          <div className="rgt">
            <ButtonMui color="black" disabled={getPathInfo(pathname).uptYn !== 'Y'} onClick={() => modalOpen(addUserModal)}>
              Add User
            </ButtonMui>
          </div>
        </div>
      </div>
      <BoardTable>
        <colgroup>
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '21%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Job</th>
            <th>Job title</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {isSuccess && userRoleMemberList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={6}>
                <NoData text="There are no registered member. Please add." />
              </td>
            </tr>
          ) : (
            userRoleMemberList?.content?.map((member: UserRoleMemberType, index: number) => (
              <tr key={index}>
                <td>{member.usrNm}</td>
                <td>{member.emlId}</td>
                <td>{member.orgnNm || '-'}</td>
                <td>{member.jobNm || '-'}</td>
                <td>{member.jobTitl || '-'}</td>
                <td>
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
      <Pagenation totalCount={userRoleMemberList?.totalElements || 0} pageSize={rowSize} currentPage={currentPage} onPageChange={onPageChange} />
    </>
  )
}

export default DetailUserRoleMember
