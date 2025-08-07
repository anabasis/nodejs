'use client'

/**
 * 화면: 사용자 역할_역할 상세_역할 수정
 */

import { ContentBox, ContentBoxWrap, ButtonMui, Breadcrumb } from 'ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useToastPopup, ToastType, useAlert, AlertType } from 'library'
import { useAtom } from 'jotai'
import { userRoleGnbAuthorityAtom, userRoleInfoAtom, userRoleLnbAuthorityAtom, userRoleSaveSuccessAtom } from '@store/client/role'
import UserRoleGnbBoard from '@components/role/user/UserRoleGnbBoard'
import UserRoleLnbBoard from '@components/role/user/UserRoleLnbBoard'
import UserRoleInformation from '@components/role/user/UserRoleInformation'
import { userRoleEditTitle } from '@constant/pageTitleList'
import { useUserRoleAuthority, useUserRoleDetailInfo, useUserRoleUpdate } from '@store/server/useUserRoleQuery'
import { cloneDeep } from 'lodash-es'

const UserRoleEdit = () => {
  const searchParams = useSearchParams()
  const roleNumber = searchParams.get('num') // role number
  const title = localStorage.getItem('title')

  const [userRoleSaveFail, isUserRoleSaveFail] = useState(false) // 사용자 역할 수정 실패 여부

  const [userRoleSaveSuccess, isUserRoleSaveSuccess] = useAtom(userRoleSaveSuccessAtom) // 사용자 역할 수정 성공 여부 - 상세 화면에서 성공 toast popup을 띄우기 위해 Jotai 사용
  const [userRoleEditInfo, setUserRoleEditInfo] = useAtom(userRoleInfoAtom)
  const [userRoleEditGnbAuthority, setUserRoleEditGnbAuthority] = useAtom(userRoleGnbAuthorityAtom)
  const [userRoleEditLnbAuthority, setUserRoleEditLnbAuthority] = useAtom(userRoleLnbAuthorityAtom)

  const roleInfo = useUserRoleDetailInfo(roleNumber)
  const roleAuthority = useUserRoleAuthority(roleNumber)
  const mutateUpdateUserRole = useUserRoleUpdate()

  const disabledButton = useMemo(() => {
    let flag = true
    roleAuthority.authorityUserLnbDtoList.forEach((item, index) => {
      if (
        item.readYn !== userRoleEditLnbAuthority[index]?.readYn ||
        item.createYn !== userRoleEditLnbAuthority[index]?.createYn ||
        item.updateYn !== userRoleEditLnbAuthority[index]?.updateYn ||
        item.deleteYn !== userRoleEditLnbAuthority[index]?.deleteYn
      ) {
        flag = false
        return false
      }
    })

    return (
      !userRoleEditInfo.userRoleName ||
      !userRoleEditInfo.usrRolCode ||
      !(roleInfo.userRoleName !== userRoleEditInfo.userRoleName || roleInfo.usrRolCode !== userRoleEditInfo.usrRolCode || !flag)
    )
  }, [userRoleEditInfo, userRoleEditLnbAuthority])

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
          <ButtonMui size="xlarge" onClick={() => route.push(`../../`)}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  // UserRoleSaveFailToast: 사용자 역할 수정 실패 toast popup
  const UserRoleSaveFailToast: ToastType = {
    icon: 'error',
    autoHideDuration: 3000,
    content: 'Save failed.',
  }

  /**
   * handleSave: Save 버튼을 클릭하면 동작하는 함수
   * - 사용자 역할 정보 변경 API 호출
   *    - 성공할 경우 상세화면으로 이동
   *    - 실패할 경우 사용자 역할 수정 실패 toast popup 노출
   */
  const handleSave = () => {
    let sendData = {
      corpLv: userRoleEditInfo.corpLvCode,
      roleLv: userRoleEditInfo.roleLvCode,
      userRolCd: userRoleEditInfo.usrRolCode,
      userRoleName: userRoleEditInfo.userRoleName,
      authorityUserGnbDtoList: userRoleEditGnbAuthority,
      authorityUserLnbDtoList: userRoleEditLnbAuthority,
    }

    mutateUpdateUserRole.mutate(
      { roleNumber: Number(roleNumber), data: sendData },
      {
        onSuccess: () => {
          isUserRoleSaveSuccess(true)
          route.push(`../../`)
        },
        onError: () => {
          isUserRoleSaveFail(true)
        },
      }
    )
  }

  // 사용자 역할 기본 정보 및 메뉴 권한 실패 시 toast popup 제공
  useEffect(() => {
    if (userRoleSaveFail) {
      toastOpen(UserRoleSaveFailToast)
      isUserRoleSaveFail(false)
    }
  }, [userRoleSaveFail])

  // detail 페이지에서 벗어나면 제거하기 때문에 다시 세팅이 필요
  useEffect(() => {
    const init = () => {
      setUserRoleEditInfo(roleInfo)
      setUserRoleEditGnbAuthority(roleAuthority.authorityUserGnbDtoList)
      setUserRoleEditLnbAuthority(cloneDeep(roleAuthority.authorityUserLnbDtoList))
      localStorage.setItem('title', roleInfo.userRoleName)
    }
    init()
  }, [roleInfo, roleAuthority])

  // atomWithStorage를 사용함으로 생긴 localStorage 삭제
  useEffect(() => {
    return () => {
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
            <Breadcrumb pageTitleList={userRoleEditTitle} />
            <h1 className="headline1">{title}</h1>
          </div>
        </ContentBox>
      </div>

      {/* 탭 부분 */}
      <ContentBox>
        <UserRoleInformation purpose="e" roleInfo={userRoleEditInfo} setRoleInfo={setUserRoleEditInfo} />
        <UserRoleGnbBoard roleAuthority={userRoleEditGnbAuthority} />
        <UserRoleLnbBoard purpose="e" roleAuthority={userRoleEditLnbAuthority} setRoleAuthority={setUserRoleEditLnbAuthority} />

        {/*  버튼 부분 */}
        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui size="xlarge" type="outlined" onClick={cancelRole}>
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              isLoading={mutateUpdateUserRole.isLoading}
              disabled={mutateUpdateUserRole.isLoading || disabledButton}
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

export default UserRoleEdit
