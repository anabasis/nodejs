'use client'

/**
 * 화면: 어드민 역할
 */

import { ContentBox, Breadcrumb, ButtonMui, FilterItem, DateRangePicker } from 'ui'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AdminRoleBoard from '@components/role/admin/AdminRoleBoard'
import { useToastPopup, ToastType, useMenu } from 'library'
import { useAtom } from 'jotai'
import { adminRoleAddSuccessAtom, adminRoleDeleteSuccessAtom, adminRoleSaveSuccessAtom } from '@store/client/role'
import { adminRolePageTitle } from '@constant/pageTitleList'
import { AdminRoleSearchParamType } from '@type/role/adminRole'
import { useSearchFilter } from '@hook/useSearchFIlter'

const rowSize = 20

const initData = {
  startDate: '',
  endDate: '',
  size: rowSize,
}

const AdminRole = () => {
  const [adminRoleAddSuccess, isAdminRoleAddSuccess] = useAtom(adminRoleAddSuccessAtom) // 어드민 역할 추가 성공 여부 - 추가 화면에서 추가 처리되므로 props drilling 방지
  const [adminRoleSaveSuccess, isAdminRoleSaveSuccess] = useAtom(adminRoleSaveSuccessAtom) // 어드민 역할 수정 성공 여부. 상세 화면에서 수정처리 되므로 props drilling 방지
  const [adminRoleDeleteSuccess, isAdminRoleDeleteSuccess] = useAtom(adminRoleDeleteSuccessAtom) // 어드민 역할 삭제 성공 여부. 역할 상세 화면에 삭제 처리가 되므로 props drilling 방지 목적으로 jotai 사용

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const route = useRouter()

  const { searchFilterParams, isParamsLoading, setChangeSearchParams, resetSearcFilterParams, onResetFilter } =
    useSearchFilter<AdminRoleSearchParamType>(initData)

  const { toastOpen } = useToastPopup()

  /**
   * adminRoleDeleteSuccessToast: 어드민 역할 삭제 성공 toast popup. 상세화면에서 삭제되면 이 화면으로 온다
   */
  const adminRoleDeleteSuccessToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: 'Successfully deleted.',
  }

  /**
   * adminRoleAddSuccessToast: 사용자 역할 추가 성공 toast popup
   */
  const adminRoleAddSuccessToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: 'Successfully added.',
  }

  /**
   * AdminRoleSaveSuccess: 어드민 역할 수정 성공 toast popup
   */
  const adminRoleSaveSuccessToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: 'Successfully saved.',
  }

  // 어드민 역할이 삭제된 경우 toast popup 노출
  useEffect(() => {
    if (adminRoleDeleteSuccess) {
      toastOpen(adminRoleDeleteSuccessToast)
      isAdminRoleDeleteSuccess(false)
    }
  }, [adminRoleDeleteSuccess, isAdminRoleDeleteSuccess])

  // 어드민 역할이 추가된 경우 toast popup 노출
  useEffect(() => {
    if (adminRoleAddSuccess) {
      toastOpen(adminRoleAddSuccessToast)
      isAdminRoleAddSuccess(false)
    }
  }, [adminRoleAddSuccess, isAdminRoleAddSuccess])

  // 어드민 역할 수정 성공하면 토스트 팝업 제공
  useEffect(() => {
    if (adminRoleSaveSuccess) {
      toastOpen(adminRoleSaveSuccessToast)
      isAdminRoleSaveSuccess(false)
    }
  }, [adminRoleSaveSuccess])

  useEffect(() => {
    return () => {
      resetSearcFilterParams()
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={adminRolePageTitle} />
            <h1 className="headline1">Admin Role</h1>
          </div>
          <div className="rgt">
            {/* 어드민 역할 추가 button */}
            <ButtonMui
              icon="PlusIcon"
              type="contained"
              size="large"
              color="primary"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
              onClick={() => route.push('add')}
            >
              Add
            </ButtonMui>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                onChangePickerDate={({ displayEndDate, displayStartDate, startDate, endDate }) =>
                  setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate })
                }
              />
            </FilterItem>
            <ButtonMui
              size="xsmall"
              type="outlined"
              color="gray"
              uiType="reset_btn"
              icon="ResetIcon"
              iconStyle={{ width: 20, height: 20, fill: '#354165' }}
              onClick={() => onResetFilter(initData)}
            />
          </div>
        </div>
        {!isParamsLoading && <AdminRoleBoard />}
      </ContentBox>
    </>
  )
}
export default AdminRole
