import { Badge, BoardTable, ButtonMui, NoData, Pagenation } from 'ui'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useModal, ModalType, useMenu } from 'library'
import { AdminRoleMemberType } from '@type/role/adminRole'
import AddAdmin from '../popup/AddAdmin'
import { usePathname } from 'next/navigation'

/**
 * 화면: 어드민 역할 추가 - 회원 추가 화면
 */

const rowSize = 20

interface AddAdminRoleMemberSettingProps {
  setAdminRoleMemberList: Dispatch<SetStateAction<string[]>>
}

const AddAdminRoleMemberSetting = (props: AddAdminRoleMemberSettingProps) => {
  const { setAdminRoleMemberList } = props

  const [showList, setShowList] = useState<AdminRoleMemberType[]>([]) // 테이블에 표시할 리스트
  const [selectedMemberList, setSelectedMemberList] = useState<AdminRoleMemberType[]>([]) // 추가할 인원 목록 - 추가이므로 빈 값
  const [currentPage, setCurrentPage] = useState(0)

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { modalOpen } = useModal()

  /**
   * addUserModal: 인원 추가 popup
   * - 역할 레벨에 맞는 인원들만 조회할 것이기에 props로 준다. -> 이것도 필요없으면 지울 것
   */
  const addUserModal: ModalType = {
    deleteKey: 'addAdmin',
    title: 'Add user',
    textTitle: 'Please add a new member for the role.',
    linetitle: true,
    maxWidth: 'xl',
    content: <AddAdmin purpose="a" userData={selectedMemberList} setUserData={setSelectedMemberList} />,
  }

  /**
   * fixAndSetList: modal에서 추가할 회원을 선택 완료하였을 때 동작하는 함수
   * - 저장할 리스트에는 회원 전체를 set
   * - 보여줄 리스트는 한 페이지당 20이므로 paging 처리를 위해 slice.
   */
  const fixAndSetList = () => {
    selectedMemberList.sort((a, b) => {
      if (a.usrNm < b.usrNm) return -1
      if (a.usrNm > b.usrNm) return 1
      return 0
    })
    setAdminRoleMemberList(selectedMemberList.map((item) => item.usrUid))
    setShowList(selectedMemberList.slice(0, 20))
  }

  /**
   * onPageChange: 페이지 번호 및 기호를 클릭하였을 때 동작하는 함수
   * - 해당 페이지로 이동 및 보여줄 유저 리스트 set
   * @param num : 페이지 번호
   */
  const onPageChange = (num: number) => {
    setCurrentPage(num)
    setShowList(selectedMemberList.slice(num * 20, (num + 1) * 20))
  }

  // modal에서 선택을 완료하면 해당 리스트를 처리
  useEffect(() => {
    fixAndSetList()
  }, [selectedMemberList])

  return (
    <>
      <div className="cont_title_box">
        <p className="title1">
          Member Setting
          <Badge uiType="solid" color="blue" style="count" className="ml_10">
            {selectedMemberList.length}
          </Badge>
        </p>
        <div className="align">
          <div className="lft">
            <p className="body2 typo500">Please add member suited to their roles.</p>
          </div>
          <div className="rgt">
            {/* 인원 추가 modal 버튼 */}
            <ButtonMui color="black" disabled={getPathInfo(pathname).crtYn !== 'Y'} onClick={() => modalOpen(addUserModal)}>
              Add User
            </ButtonMui>
          </div>
        </div>
      </div>
      <BoardTable>
        <colgroup>
          <col style={{ width: '13%' }} />
          <col style={{ width: '16%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '16%' }} />
          {/* <col style={{ width: '5%' }} /> */}
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
            {/* <th> </th> */}
          </tr>
        </thead>
        <tbody>
          {selectedMemberList.length === 0 ? (
            <tr className="nodata">
              <td colSpan={7}>
                <NoData text="There are no registered member. Please add." className="full" />
              </td>
            </tr>
          ) : (
            showList.map((member, index) => (
              <tr key={index}>
                <td>{member.usrNm}</td>
                <td>{member.emlId}</td>
                <td>{member.orgnNm || '-'}</td>
                <td>{member.jobNm || '-'}</td>
                <td>{member.jobTitl || '-'}</td>
                <td>{member.usrRolNm}</td>
                {/* 파라미터 없음 */}
                <td>{member.adminRoleList.join(', ') || '-'}</td>
                {/* <td>
                  <ButtonMui
                    onClick={() => {
                      setSelectedMemberList(showList.filter((item) => item.emlId !== member.emlId))
                    }}
                    type="outlined"
                    size="xsmall"
                    icon="DeleteIcon"
                    color="white"
                    iconStyle={{ width: 20, height: 20, fill: '#000000' }}
                  ></ButtonMui>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation totalCount={selectedMemberList.length} pageSize={rowSize} currentPage={currentPage} onPageChange={(num: number) => onPageChange(num)} />
    </>
  )
}

export default AddAdminRoleMemberSetting
