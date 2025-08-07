'use client'

/**
 * 화면: 사용자 역할_역할 상세
 */

import { ContentBox, BaseTab, Breadcrumb, ButtonMui } from 'ui'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAlert, AlertType, useToastPopup, ToastType, useParamsData, useMenu } from 'library'
import DeleteUserRole from '@components/role/popup/DeleteUserRole'
import UserRoleGnbBoard from '@components/role/user/UserRoleGnbBoard'
import UserRoleLnbBoard from '@components/role/user/UserRoleLnbBoard'
import DetailUserRoleMember from '@components/role/user/DetailUserRoleMember'
import { useAtom } from 'jotai'
import { userRoleDeleteFailAtom } from '@store/client/role'
import UserRoleInformation from '@components/role/user/UserRoleInformation'
import { userRoleDetailPageTitle } from '@constant/pageTitleList'
import { useUserRoleAuthority, useUserRoleDetailInfo } from '@store/server/useUserRoleQuery'
import { getUserRoleMember } from '@api/role'

const rowSize = 20

const UserRoleDetail = () => {
  const searchParams = useSearchParams()
  const roleNumber = searchParams.get('num') // role number
  const [tabIndex, setTabIndex] = useState(0) // tab index
  const [totalMember, setTotalMember] = useState(0) // total member

  const [userRoleDeleteFail, isUserRoleDeleteFail] = useAtom(userRoleDeleteFailAtom) // 사용자 역할 삭제 실패 여부 - 삭제 팝업에서 삭제 처리 시도

  const roleInfo = useUserRoleDetailInfo(roleNumber) // user role 기본 정보
  const roleAuthority = useUserRoleAuthority(roleNumber) // user role 메뉴 권한

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { resetParams } = useParamsData()

  // tab에 따른 컴포넌트
  const tabData = [
    {
      tabName: 'Role Information',
      content: (
        <>
          <UserRoleInformation purpose="d" roleNumber={roleNumber} roleInfo={roleInfo} />
          <UserRoleGnbBoard roleAuthority={roleAuthority.authorityUserGnbDtoList} />
          <UserRoleLnbBoard purpose="d" roleAuthority={roleAuthority.authorityUserLnbDtoList} />
        </>
      ),
    },
    { tabName: 'Member Setting', content: <DetailUserRoleMember roleInfo={roleInfo} roleNumber={roleNumber} /> },
  ]

  const { alertOpen } = useAlert()
  const { toastOpen } = useToastPopup()

  /**
   * UserRoleDeleteFailToast: 사용자 역할 삭제 실패 toast popup.
   */
  const UserRoleDeleteFailToast: ToastType = {
    icon: 'error',
    autoHideDuration: 3000,
    content: 'Delete failed',
  }

  /**
   * deleteUserRoleAlert: 역할 삭제 alert
   */
  const deleteUserRoleAlert: AlertType = {
    icon: 'info',
    title: 'Delete role',
    textTitle: `When deleting a role, all information will be deleted and cannot be recovered.
    There are currently ${totalMember} ${roleInfo.userRoleName} roles,
    please select a new role belong to them and delete role.`,
    content: <DeleteUserRole roleInfo={roleInfo} />,
  }

  // 사용자 역할 삭제 실패하면 토스트 팝업 제공
  useEffect(() => {
    if (userRoleDeleteFail) {
      toastOpen(UserRoleDeleteFailToast)
      isUserRoleDeleteFail(false)
    }
  }, [userRoleDeleteFail, isUserRoleDeleteFail])

  // 메뉴 권한 및 기본 정보 수정 화면에서 사용할 정보 atom에 저장
  // 삭제 시 해당 역할의 총 인원을 표시해야하므로 조회
  useEffect(() => {
    const init = () => {
      localStorage.setItem('title', roleInfo.userRoleName)
      getUserRoleMember(roleNumber, 0, rowSize).then((data) => {
        setTotalMember(data.totalElements)
      })
    }
    init()
  }, [])

  // 조회하기 위해 사용한 param reset
  useEffect(() => {
    return () => {
      resetParams()
      localStorage.removeItem('userRoleInfo')
      localStorage.removeItem('userRoleGnbAuthority')
      localStorage.removeItem('userRoleLnbAuthority')
      localStorage.removeItem('title')
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={userRoleDetailPageTitle} />
            <h1 className="headline1">{roleInfo.userRoleName}</h1>
          </div>
          <div className="rgt">
            {/* delete button */}
            <ButtonMui
              size="large"
              color="primary"
              icon="DeleteIcon"
              disabled={getPathInfo(pathname).delYn !== 'Y'}
              onClick={() => alertOpen(deleteUserRoleAlert)}
            >
              Delete
            </ButtonMui>
          </div>
        </ContentBox>
        {/* tab */}
        <BaseTab tabData={tabData} value={tabIndex} onChange={({ oldIndex, newIndex }) => setTabIndex(newIndex)} />
      </div>

      <ContentBox>{tabData[tabIndex].content}</ContentBox>
    </>
  )
}

export default UserRoleDetail
