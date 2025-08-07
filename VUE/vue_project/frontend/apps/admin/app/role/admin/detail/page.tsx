'use client'

/**
 * 화면: 어드민 역할_역할 상세
 */

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { BaseTab, Breadcrumb, ButtonMui, ContentBox } from 'ui'
import { useToastPopup, ToastType, useAlert, AlertType, useParamsData, useMenu } from 'library'
import { useEffect, useState } from 'react'
import AdminRoleGnbBoard from '@components/role/admin/AdminRoleGnbBoard'
import AdminRoleLnbBoard from '@components/role/admin/AdminRoleLnbBoard'
import DetailAdminRoleMember from '@components/role/admin/DetailAdminRoleMember'
import AdminRoleInformation from '@components/role/admin/AdminRoleInformation'
import { adminRoleDetailPageTitle } from '@constant/pageTitleList'
import { useAdminRoleAuthority, useAdminRoleDetailInfo } from '@store/server/useAdminRoleQuery'
import DeleteAdminRole from '@components/role/popup/DeleteAdminRole'

const AdminRoleDetail = () => {
  const searchParams = useSearchParams()
  const roleNumber = searchParams.get('num') // roleName 경로 파라미터
  const [tabIndex, setTabIndex] = useState(0) // tab index
  const [adminRoleDeleteFail, isAdminRoleDeleteFail] = useState(false) // 어드민 역할 삭제 실패 여부

  const roleInfo = useAdminRoleDetailInfo(roleNumber)
  const roleAuthority = useAdminRoleAuthority(roleNumber)

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { resetParams } = useParamsData()

  // tab에 따른 컴포넌트
  const tabData = [
    {
      tabName: 'Role Information',
      content: (
        <>
          <AdminRoleInformation purpose="d" roleNumber={roleNumber} roleInfo={roleInfo} />
          <AdminRoleGnbBoard roleAuthority={roleAuthority.authorityAdminRoleGnbList} />
          <AdminRoleLnbBoard purpose="d" roleAuthority={roleAuthority.authorityAdminRoleLnbList} />
        </>
      ),
    },
    { tabName: 'Member Setting', content: <DetailAdminRoleMember roleNumber={roleNumber} /> },
  ]

  const route = useRouter()

  const { alertOpen, alertClose } = useAlert()
  const { toastOpen } = useToastPopup()

  /**
   * AdminRoleDeleteFailToast: 어드민 역할 삭제 실패 toast popup.
   */
  const adminRoleDeleteFailToast: ToastType = {
    icon: 'error',
    autoHideDuration: 3000,
    content: 'Delete failed',
  }

  /**
   * deleteAdminRoleAlert: 어드민 역할 삭제 alert popup
   */
  const deleteAdminRoleAlert: AlertType = {
    icon: 'info',
    title: 'Are you sure to delete?',
    textTitle: `If you click the delete button, it cannot be recovered.`,
    content: <DeleteAdminRole roleNumber={roleNumber} isAdminRoleDeleteFail={isAdminRoleDeleteFail} />,
  }

  // 어드민 역할 삭제 실패하면 토스트 팝업 제공
  useEffect(() => {
    if (adminRoleDeleteFail) {
      toastOpen(adminRoleDeleteFailToast)
      isAdminRoleDeleteFail(false)
    }
  }, [adminRoleDeleteFail])

  // 메뉴 권한 및 기본 정보 수정 화면에서 사용할 정보 atom에 저장
  useEffect(() => {
    const init = () => {
      localStorage.setItem('title', roleInfo.adminRoleName)
    }
    init()
  }, [roleInfo, roleAuthority])

  // 조회하기 위해 사용한 param reset
  useEffect(() => {
    return () => {
      resetParams()
      localStorage.removeItem('adminRoleInfo')
      localStorage.removeItem('adminRoleGnbAuthority')
      localStorage.removeItem('adminRoleLnbAuthority')
      localStorage.removeItem('title')
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={adminRoleDetailPageTitle} />
            <h1 className="headline1">{roleInfo.adminRoleName}</h1>
          </div>
          <div className="rgt">
            {/* 삭제 팝업 노출 */}
            <ButtonMui
              size="large"
              color="primary"
              icon="DeleteIcon"
              disabled={getPathInfo(pathname).delYn !== 'Y'}
              onClick={() => alertOpen(deleteAdminRoleAlert)}
            >
              Delete
            </ButtonMui>
          </div>
        </ContentBox>
        <BaseTab tabData={tabData} value={tabIndex} onChange={({ oldIndex, newIndex }) => setTabIndex(newIndex)} />
      </div>
      <ContentBox>{tabData[tabIndex].content}</ContentBox>
    </>
  )
}

export default AdminRoleDetail
