'use client'

/**
 * 화면: 사용자 역할_역할 추가_역할 인원
 */

import { Badge, BoardTable, ButtonMui, NoData, Pagenation } from 'ui'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useModal, ModalType, useMenu } from 'library'
import { UserRoleMemberType, UserRoleModifiedMemberType } from '@type/role/userRole'
import AddUser from '../popup/AddUser'
import { usePathname } from 'next/navigation'

const rowSize = 20

interface AddUserRoleMemberSettingProps {
  corpLv: string
  setUserRoleMemberList: Dispatch<SetStateAction<UserRoleModifiedMemberType[]>>
}

const AddUserRoleMemberSetting = (props: AddUserRoleMemberSettingProps) => {
  const { corpLv, setUserRoleMemberList } = props

  const [selectedMemberList, setSelectedMemberList] = useState<UserRoleMemberType[]>([]) // 추가할 인원 목록 - 추가이므로 빈 값
  const [showList, setShowList] = useState<UserRoleMemberType[]>([]) // 테이블에 표시할 리스트
  const [currentPage, setCurrentPage] = useState(0) // 페이지 번호

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { modalOpen } = useModal()

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
    content: <AddUser purpose="a" userData={selectedMemberList} setUserData={setSelectedMemberList} corporateLevel={corpLv} />,
  }

  /**
   * fixAndSetList: modal에서 회원을 선택 완료하였을 때 동작하는 함수
   * - 선택된 회원 전체 set
   * - 페이지 당 20개만 보여줘야 하므로 현재 보여줄 회원에 대해서만 slice 하여 set
   */
  const fixAndSetList = () => {
    selectedMemberList.sort()
    selectedMemberList.sort((a, b) => {
      if (a.usrNm < b.usrNm) return -1
      if (a.usrNm > b.usrNm) return 1
      return 0
    })
    let list = selectedMemberList.map((item) => ({ usrUid: item.usrUid, procTp: 'C' }))
    setUserRoleMemberList(list)
    setShowList(selectedMemberList.slice(0, 20))
  }

  /**
   * onPageChange: 페이지 숫자 혹은 기호 선택 시 동작하는 함수
   * - 해당 페이지로 이동
   * - 해당 페이지에 보여줄 회원 set
   * @param num : 페이지 번호
   */
  const onPageChange = (num: number) => {
    setCurrentPage(num)
    setShowList(selectedMemberList.slice(num * 20, (num + 1) * 20))
  }

  // modal에서 회원 선택 완료 시 동작
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
          <col style={{ width: '18%' }} />
          <col style={{ width: '23%' }} />
          <col style={{ width: '21%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
          {/* <col style={{ width: '4%' }} /> */}
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Job</th>
            <th>Job Title</th>
            {/* <th> </th> */}
          </tr>
        </thead>

        <tbody>
          {selectedMemberList.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
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

export default AddUserRoleMemberSetting
