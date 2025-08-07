'use client'

/**
 * 화면: 어드민 역할_역할 상세_역할 수정
 */

import { Breadcrumb, ButtonMui, ContentBox, ContentBoxWrap } from 'ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useToastPopup, ToastType, useAlert, AlertType } from 'library'
import { useAtom } from 'jotai'
import { adminRoleGnbAuthorityAtom, adminRoleInfoAtom, adminRoleLnbAuthorityAtom, adminRoleSaveSuccessAtom } from '@store/client/role'
import AdminRoleGnbBoard from '@components/role/admin/AdminRoleGnbBoard'
import AdminRoleLnbBoard from '@components/role/admin/AdminRoleLnbBoard'
import AdminRoleInformation from '@components/role/admin/AdminRoleInformation'
import { adminRoleEditTitle } from '@constant/pageTitleList'
import { useAdminRoleAuthority, useAdminRoleDetailInfo, useAdminRoleUpdate } from '@store/server/useAdminRoleQuery'
import { cloneDeep } from 'lodash-es'

const AdminRoleEdit = () => {
  const searchParams = useSearchParams()
  const roleNumber = searchParams.get('num') // role number
  const title = localStorage.getItem('title') // title 고정

  const [adminRoleSaveFail, isAdminRoleSaveFail] = useState(false)

  const [adminRoleSaveSuccess, isAdminRoleSaveSuccess] = useAtom(adminRoleSaveSuccessAtom) // 어드민 역할 수정 성공 여부 - 상세 화면에서 성공 toast popup을 띄우기 위해 Jotai 사용
  const [adminRoleEditInfo, setAdminRoleEditInfo] = useAtom(adminRoleInfoAtom) // 역할 기본정보
  const [adminRoleEditGnbAuthority, setAdminRoleEditGnbAuthority] = useAtom(adminRoleGnbAuthorityAtom) // gnb 권한
  const [adminRoleEditLnbAuthority, setAdminRoleEditLnbAuthority] = useAtom(adminRoleLnbAuthorityAtom) // lnb 권한

  const roleInfo = useAdminRoleDetailInfo(roleNumber) // 역할 기본정보 API
  const roleAuthority = useAdminRoleAuthority(roleNumber) // 역할 권한 API
  const mutateUpdateAdminRole = useAdminRoleUpdate()

  const disabledButton = useMemo(() => {
    let flag = true
    roleAuthority.authorityAdminRoleLnbList.forEach((item, index) => {
      if (
        item.readYn !== adminRoleEditLnbAuthority[index]?.readYn ||
        item.createYn !== adminRoleEditLnbAuthority[index]?.createYn ||
        item.updateYn !== adminRoleEditLnbAuthority[index]?.updateYn ||
        item.deleteYn !== adminRoleEditLnbAuthority[index]?.deleteYn
      ) {
        flag = false
        return false
      }
    })

    return (
      !adminRoleEditInfo.adminRoleName ||
      !adminRoleEditInfo.adminRoleCode ||
      !(roleInfo.adminRoleCode !== adminRoleEditInfo.adminRoleCode || roleInfo.adminRoleName !== adminRoleEditInfo.adminRoleName || !flag)
    )
  }, [adminRoleEditInfo, adminRoleEditLnbAuthority])

  const route = useRouter()

  const { alertOpen, alertClose } = useAlert()
  const { toastOpen } = useToastPopup()

  const cancelRole = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => route.replace(`../../`)}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  // AdminRoleSaveFail: 어드민 역할 수정 실패 toast popup
  const AdminRoleSaveFailToast: ToastType = {
    icon: 'error',
    autoHideDuration: 3000,
    content: 'Save failed.',
  }

  /**
   * handleSave: Save 버튼을 클릭하면 동작하는 함수
   * - 어드민 역할 정보 변경 API 호출
   *    - 성공할 경우 상세화면으로 이동
   *    - 실패할 경우 어드민 역할 수정 실패 toast popup 노출
   */
  const handleSave = () => {
    let sendData = {
      adminRoleCode: adminRoleEditInfo.adminRoleCode,
      adminRoleName: adminRoleEditInfo.adminRoleName,
      authorityAdminRoleGnbList: adminRoleEditGnbAuthority,
      authorityAdminRoleLnbList: adminRoleEditLnbAuthority,
    }

    mutateUpdateAdminRole.mutate(
      { roleNumber: Number(roleNumber), data: sendData },
      {
        onSuccess: () => {
          isAdminRoleSaveSuccess(true)
          route.push(`../../`)
        },
        onError: () => {
          isAdminRoleSaveFail(true)
        },
      }
    )
  }

  // 어드민 역할 기본 정보 및 메뉴 권한 실패 시 toast popup 제공
  useEffect(() => {
    if (adminRoleSaveFail) {
      toastOpen(AdminRoleSaveFailToast)
      isAdminRoleSaveFail(true)
    }
  }, [adminRoleSaveFail])

  // detail 페이지에서 벗어나면 제거하기 때문에 다시 세팅이 필요
  useEffect(() => {
    const init = () => {
      setAdminRoleEditInfo(roleInfo)
      setAdminRoleEditGnbAuthority(roleAuthority.authorityAdminRoleGnbList)
      setAdminRoleEditLnbAuthority(cloneDeep(roleAuthority.authorityAdminRoleLnbList))
      localStorage.setItem('title', roleInfo.adminRoleName)
    }
    init()
  }, [roleInfo, roleAuthority])

  // atomWithStorage를 사용함으로 생긴 localStorage 삭제
  useEffect(() => {
    return () => {
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
            <Breadcrumb pageTitleList={adminRoleEditTitle} />
            <h1 className="headline1">{title}</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <AdminRoleInformation purpose="e" roleInfo={adminRoleEditInfo} setRoleInfo={setAdminRoleEditInfo} />
        <AdminRoleGnbBoard roleAuthority={adminRoleEditGnbAuthority} />
        <AdminRoleLnbBoard purpose="e" roleAuthority={adminRoleEditLnbAuthority} setRoleAuthority={setAdminRoleEditLnbAuthority} />

        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui size="xlarge" type="outlined" onClick={cancelRole}>
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              isLoading={mutateUpdateAdminRole.isLoading}
              disabled={mutateUpdateAdminRole.isLoading || disabledButton}
              onClick={() => handleSave()}
            >
              Save
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}

export default AdminRoleEdit
