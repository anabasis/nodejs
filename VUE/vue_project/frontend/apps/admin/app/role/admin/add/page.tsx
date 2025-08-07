'use client'

import AdminRoleInformation from '@components/role/admin/AdminRoleInformation'
import AddAdminRoleMemberSetting from '@components/role/admin/AddAdminRoleMemberSetting'
import AdminRoleGnbBoard from '@components/role/admin/AdminRoleGnbBoard'
import AdminRoleLnbBoard from '@components/role/admin/AdminRoleLnbBoard'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Breadcrumb, ButtonMui, ContentBox, HeaderStepper } from 'ui'
import { useToastPopup, ToastType, useAlert, AlertType } from 'library'
import { useAtom } from 'jotai'
import { adminRoleAddSuccessAtom } from '@store/client/role'
import { AdminRoleInfoType, AdminRoleMenuAuthorityType } from '@type/role/adminRole'
import { adminRoleAddTitle } from '@constant/pageTitleList'
import { getAdminRoleAuthorityInit } from '@api/role'
import { useAdminRoleAdd } from '@store/server/useAdminRoleQuery'

/**
 * 화면: 어드민 역할_역할 추가
 */

// 역할 추가 step
const stepper = [
  { title: 'Role Information', active: true, completed: false },
  { title: 'Member Setting', active: false, completed: false },
]

const roleInfoInitData = {
  adminRoleName: '',
  adminRoleCode: '',
}

const AddAdminRole = () => {
  const [stepIndex, setStepIndex] = useState(0) // step 단계
  const [roleInfo, setRoleInfo] = useState<AdminRoleInfoType>(roleInfoInitData) // 저장할 역할 기본 정보
  const [gnbAuth, setGnbAuth] = useState<AdminRoleMenuAuthorityType[]>([]) // 저장할 GNB 권한 - API 데이터가 복잡하므로 임시용은 하지 않음
  const [lnbAuth, setLnbAuth] = useState<AdminRoleMenuAuthorityType[]>([]) // 저장할 LNB 권한 - API 데이터가 복잡하므로 임시용은 하지 않음
  const [adminRoleMemberList, setAdminRoleMemberList] = useState<string[]>([]) // 저장할 해당 역할을 가진 멤버 리스트
  const [adminRoleAddFail, isAdminRoleAddFail] = useState(false) // 어드민 역할 추가 실패 여부

  const [adminRoleAddSuccess, isAdminRoleAddSuccess] = useAtom(adminRoleAddSuccessAtom) // 어드민 역할 추가 성공 여부 - 상세 화면에서 성공 toast popup을 띄우기 위해 Jotai 사용

  /**
   * - 버튼 비활성화 여부
   *  각 step마다 비활성화 해제 조건 다름.
   * 1. 역할 기본 정보 입력 후 체크를 하나라도 하면 활성화
   * 2. 원래부터 활성화 - 인원이 없어도 된다.
   */
  const disabledButton = useMemo(() => {
    return !roleInfo.adminRoleCode || !roleInfo.adminRoleName
  }, [roleInfo])

  const route = useRouter()

  const mutateAddAdminRole = useAdminRoleAdd()

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
          <ButtonMui size="xlarge" onClick={() => route.push('../')}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  /**
   * addFail: 사용자 역할 추가 실패 toast popup
   */
  const adminRoleAddFailToast: ToastType = {
    icon: 'error',
    autoHideDuration: 3000,
    content: 'Add failed.',
  }

  /**
   * getStepContent: step에 변화가 일어나면 그에 맞는 컴포넌트를 호출하는 함수
   * @returns step에 따른 컴포넌트
   */
  const getStepContent = () => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <AdminRoleInformation purpose="a" roleInfo={roleInfo} setRoleInfo={setRoleInfo} />
            <AdminRoleGnbBoard roleAuthority={gnbAuth} />
            <AdminRoleLnbBoard purpose="a" roleAuthority={lnbAuth} setRoleAuthority={setLnbAuth} />
          </>
        )
      // 해당 역할의 멤버 설정
      case 1:
        return <AddAdminRoleMemberSetting setAdminRoleMemberList={setAdminRoleMemberList} />
    }
  }

  /**
   * handlePrevious: Previous 버튼을 클릭할 경우 동작하는 함수
   * - 이전의 step으로 이동
   * - 이전 stepper는 완료 표시를 해제
   * - 현재 stepper는 활성화 해제
   */
  const handlePrevious = () => {
    stepper[stepIndex].active = false
    stepper[stepIndex - 1].completed = false
    setStepIndex(stepIndex - 1)
  }

  /**
   * handleNext: Next 혹은 Add 버튼을 클릭하면 동작하는 함수
   * 1. 마지막 step이 아닌 경우
   *    - 다음 step으로 이동
   *    - 현재 stepper는 완료 표시
   *    - 다음 stepper는 활성화
   * 2. 마지막 step인 경우
   *    - 추가할 역할 데이터를 저장하는 API 호출
   *    - 성공하면 추가한 데이터의 상세화면으로 이동
   *    - 실패하면 추가 실패 toast popup 노출
   */
  const handleNext = () => {
    if (stepIndex !== stepper.length - 1) {
      setStepIndex(stepIndex + 1)
      stepper[stepIndex].completed = true
      stepper[stepIndex + 1].active = true
    } else {
      let sendData = {
        adminRoleCode: roleInfo.adminRoleCode,
        adminRoleName: roleInfo.adminRoleName,
        authorityAdminRoleGnbList: gnbAuth,
        authorityAdminRoleLnbList: lnbAuth,
        usrUidList: adminRoleMemberList,
      }

      mutateAddAdminRole.mutate(sendData, {
        onSuccess: () => {
          isAdminRoleAddSuccess(true)
          route.push('../') // 추가된 역할의 상세화면으로 이동
        },
        onError: () => {
          isAdminRoleAddFail(true)
          return
        },
      })
    }
  }

  // gnb, lnb 초기 세팅
  useEffect(() => {
    getAdminRoleAuthorityInit()
      .then((data) => {
        setGnbAuth(data.authorityAdminRoleGnbList)
        setLnbAuth(data.authorityAdminRoleLnbList)
      })
      .catch(() => {
        setGnbAuth([])
        setLnbAuth([])
      })
  }, [])

  // 역할 추가 실패 시 toast popup 노출
  useEffect(() => {
    if (adminRoleAddFail) {
      toastOpen(adminRoleAddFailToast)
      isAdminRoleAddFail(false)
    }
  }, [adminRoleAddFail])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={adminRoleAddTitle} />
            <h1 className="headline1">Add Admin Role</h1>
          </div>
          <div className="rgt">
            <HeaderStepper data={stepper} />
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        {getStepContent()}
        <div className="cont_bottom_box">
          <div className="align">
            <div className="lft">
              {stepIndex !== 0 && (
                <ButtonMui type="outlined" size="xlarge" onClick={() => handlePrevious()}>
                  Previous
                </ButtonMui>
              )}
            </div>
            <div className="rgt">
              <ButtonMui type="outlined" size="xlarge" onClick={cancelRole}>
                Cancel
              </ButtonMui>
              <ButtonMui
                type="contained"
                size="xlarge"
                disabled={disabledButton || mutateAddAdminRole.isLoading}
                isLoading={mutateAddAdminRole.isLoading}
                onClick={() => handleNext()}
              >
                {stepIndex === 0 ? 'Next' : 'Add'}
              </ButtonMui>
            </div>
          </div>
        </div>
      </ContentBox>
    </>
  )
}

export default AddAdminRole
