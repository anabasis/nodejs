'use client'

/**
 * 화면: 사용자 역할_역할 추가
 */

import { ButtonMui, ContentBox, Breadcrumb, HeaderStepper } from 'ui'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import AddUserMemberSetting from '@components/role/user/AddUserRoleMemberSetting'
import { useToastPopup, ToastType } from 'library/hook/useToastPopup'
import UserRoleInformation from '@components/role/user/UserRoleInformation'
import UserRoleGnbBoard from '@components/role/user/UserRoleGnbBoard'
import UserRoleLnbBoard from '@components/role/user/UserRoleLnbBoard'
import { useAtom } from 'jotai'
import { userRoleAddSuccessAtom } from '@store/client/role'
import { getUserRoleAuthorityInit } from '@api/role'
import { UserRoleInfoType, UserRoleMenuAuthorityType, UserRoleModifiedMemberType } from '@type/role/userRole'
import { userRoleAddTitle } from '@constant/pageTitleList'
import { useAlert, AlertType } from 'library'
import { useUserRoleAdd } from '@store/server/useUserRoleQuery'
/**
 * 화면: 사용자 역할_역할 추가
 */

// 역할 추가 step
const stepper = [
  { title: 'Role Information', active: true, completed: false },
  { title: 'Member Setting', active: false, completed: false },
]

const roleInfoInitData = {
  userRoleName: '',
  corpLvCode: '',
  usrRolCode: '',
  roleLvCode: '',
}

const AddUserRole = () => {
  const [stepIndex, setStepIndex] = useState(0) // step 단계
  const [userRoleAddFail, isUserRoleAddFail] = useState(false)
  const [roleInfo, setRoleInfo] = useState<UserRoleInfoType>(roleInfoInitData) // 저장할 역할 기본 정보
  const [gnbAuth, setGnbAuth] = useState<UserRoleMenuAuthorityType[]>([]) // 저장할 GNB 권한 - API 데이터가 복잡하므로 임시용은 하지 않음
  const [lnbAuth, setLnbAuth] = useState<UserRoleMenuAuthorityType[]>([]) // 저장할 LNB 권한 - API 데이터가 복잡하므로 임시용은 하지 않음
  const [userRoleMemberList, setUserRoleMemberList] = useState<UserRoleModifiedMemberType[]>([]) // 저장할 해당 역할을 가진 멤버 리스트
  const { alertOpen, alertClose } = useAlert()
  const [userRoleAddSuccess, isUserRoleAddSuccess] = useAtom(userRoleAddSuccessAtom) // 사용자 역할 추가 성공 여부 - 상세 화면에서 성공 toast popup을 띄우기 위해 Jotai 사용

  // 버튼 비활성화 여부
  const disabledButton = useMemo(() => {
    return !roleInfo.userRoleName || !roleInfo.roleLvCode || !roleInfo.corpLvCode || !roleInfo.usrRolCode
  }, [roleInfo])

  const route = useRouter()

  const mutateAddUserRole = useUserRoleAdd()

  const { toastOpen } = useToastPopup()

  const cancelRole = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => route.replace('/role/user')}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  /**
   * userRoleAddFailToast: 사용자 역할 추가 실패 toast popup
   */
  const userRoleAddFailToast: ToastType = {
    icon: 'error',
    autoHideDuration: 3000,
    content: 'Add failed.',
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
      stepper[stepIndex].completed = true
      stepper[stepIndex + 1].active = true
      setStepIndex(stepIndex + 1)
    } else {
      let sendData = {
        userRolCd: roleInfo.usrRolCode,
        corpLv: roleInfo.corpLvCode,
        roleLv: roleInfo.roleLvCode,
        userRoleName: roleInfo.userRoleName,
        authorityUserGnbDtoList: gnbAuth,
        authorityUserLnbDtoList: lnbAuth,
        usrUidList: userRoleMemberList,
      }
      mutateAddUserRole.mutate(sendData, {
        onSuccess: () => {
          isUserRoleAddSuccess(true)
          route.push('../') // 성공하면 역할 리스트 화면으로 이동
        },
        onError: () => {
          isUserRoleAddFail(true)
          return
        },
      })
    }
  }

  /**
   * getStepContent: step에 변화가 일어나면 그에 맞는 컴포넌트를 호출하는 함수
   * @returns step에 따른 컴포넌트
   */
  const getStepContent = () => {
    switch (stepIndex) {
      // Role Information 구역. 역할 정보 입력, gnb, lnb 권한 설정
      case 0:
        return (
          <>
            <UserRoleInformation purpose="a" roleInfo={roleInfo} setRoleInfo={setRoleInfo} />
            <UserRoleGnbBoard roleAuthority={gnbAuth} />
            <UserRoleLnbBoard purpose="a" roleAuthority={lnbAuth} setRoleAuthority={setLnbAuth} />
          </>
        )
      // 해당 역할의 멤버 설정
      case 1:
        return <AddUserMemberSetting corpLv={roleInfo.corpLvCode} setUserRoleMemberList={setUserRoleMemberList} />
    }
  }

  // gnb, lnb 초기 세팅
  useEffect(() => {
    getUserRoleAuthorityInit()
      .then((data) => {
        setGnbAuth(data.authorityUserGnbDtoList)
        setLnbAuth(data.authorityUserLnbDtoList)
      })
      .catch(() => {
        setGnbAuth([])
        setLnbAuth([])
      })
  }, [])

  // 역할 추가 실패 시 toast popup 노출
  useEffect(() => {
    if (userRoleAddFail) {
      toastOpen(userRoleAddFailToast)
      isUserRoleAddFail(false)
    }
  }, [userRoleAddFail])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={userRoleAddTitle} />
            <h1 className="headline1">Add User Role</h1>
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
                disabled={disabledButton || mutateAddUserRole.isLoading}
                isLoading={mutateAddUserRole.isLoading}
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

export default AddUserRole
