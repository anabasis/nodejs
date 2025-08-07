'use client'

/**
 * 화면: seegene 회원 관리 페이지 -> 기본: Registration Complete 탭
 */

import InviteSeegene from '@components/user/popup/InviteSeegene'
import SeegeneComplete from '@components/user/seegene/SeegeneComplete'
import SeegeneInProgress from '@components/user/seegene/SeegeneInProgress'
import SeegeneInInvitation from '@components/user/seegene/SeegeneInInvitation'
import { useEffect, useState } from 'react'
import { BaseTab, Breadcrumb, ButtonMui, ContentBox } from 'ui'
import { useToastPopup, ToastType, ModalType, useModal, useMenu } from 'library'
import {
  cancelInvitationAtom,
  progressRequestNameAtom,
  progressRequestStatusAtom,
  resendInvitationAtom,
  selectedSeegeneUserAtom,
  withdrawlAtom,
} from '@store/client/user'
import { seegeneUserPageTitle, tabStatusInfo } from '@constant/pageTitleList'
import { useAtom } from 'jotai'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { useTranslation } from 'library/i18n/client'

const SeegeneUser = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') // 첫 진입 시 탭 이동을 위한 파라미터
  const [tabIndex, setTabIndex] = useState(tabStatusInfo?.[tab] || 0) // tab 관리
  const [invited, isInvited] = useState(false) // 초대 완료 여부 -> toast popup 노출 목적
  const [withdrawl, isWithdrawl] = useAtom(withdrawlAtom) // 탈퇴 여부 상태 -> props drilling 방지와 양방향 데이터 이동 목적.
  const [selectUser, setSelectUser] = useAtom(selectedSeegeneUserAtom) // 클릭한 유저의 정보 -> props drilling 방지와 양방향 데이터 이동 목적
  const [requestName, setRequestName] = useAtom(progressRequestNameAtom) // 클릭한 가입 진행중인 유저 이름
  const [requestStatus, setRequestStatus] = useAtom(progressRequestStatusAtom) // 가입 진행 중에서 클릭한 가입처리
  const [resendInvitation, isResendInvitation] = useAtom(resendInvitationAtom) // 초대 명단에서 초대 메일 재전송 여부
  const [cancelInvitation, isCancelInvitation] = useAtom(cancelInvitationAtom) // 초대 명단에서 초대 취소 여부
  const { resetSearcFilterParams } = useSearchFilter()
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { t } = useTranslation('platform')

  const { modalOpen } = useModal()
  const { toastOpen } = useToastPopup()

  const tabData = [
    { tabName: t('AxvR'), content: <SeegeneComplete /> },
    { tabName: t('GMgt'), content: <SeegeneInProgress /> },
    { tabName: t('jzoR'), content: <SeegeneInInvitation /> },
  ]

  // 초대 modal
  const inviteModal: ModalType = {
    deleteKey: 'invite',
    title: t('kJzC'),
    textTitle: t('WsWt'),
    linetitle: true,
    content: <InviteSeegene isInvited={isInvited} />,
  }

  // 초대 완료 toast
  const inviteSuccessToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: t('xCnj'),
  }

  // 가입 승인 toast popup
  const approvalToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: t('VLXL', { name: requestName }),
  }

  // 가입 거절 toast popup
  const denyToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: t('yQem', { name: requestName }),
  }

  // 초대 메일 재전송 완료 toast
  const resendInivitationToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: t('nxNc'),
  }

  // 초대 메일 취소 완료 toast
  const cancelInivitationToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: t('bjPE'),
  }

  // 회원 탈퇴 완료 toast
  const withdrawlSuccessToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: t('DnlN', { name: selectUser }),
  }

  /**
   * handleChangeTab: 바로가기 동작을 위한 함수
   * - 인덱스에 따라 띄울 탭을 정하는 함수
   * @param newIndex : 바로가기 인덱스
   */
  const handleChangeTab = (newIndex: number) => {
    router.push('/user/seegene')
    setTabIndex(newIndex)
  }

  // 초대 완료 시 초대 완료 toast popup 노출
  useEffect(() => {
    if (invited) {
      toastOpen(inviteSuccessToast)
      isInvited(false)
    }
  }, [invited, isInvited])

  // 가입 처리 여부에 따른 toast popup 노출
  useEffect(() => {
    if (requestStatus === 'approval') {
      toastOpen(approvalToast)
    } else if (requestStatus === 'deny') {
      toastOpen(denyToast)
    }
    setRequestName('')
    setRequestStatus('')
  }, [requestStatus, setRequestName, setRequestStatus])

  // 초대 메일 재전송 완료 toast popup 노출
  useEffect(() => {
    if (resendInvitation) {
      toastOpen(resendInivitationToast)
      isResendInvitation(false)
    }
  }, [resendInvitation, isResendInvitation])

  // 초대 메일 취소 완료 toast popup 노출
  useEffect(() => {
    if (cancelInvitation) {
      toastOpen(cancelInivitationToast)
      isCancelInvitation(false)
    }
  }, [cancelInvitation, isCancelInvitation])

  // 상세 페이지 안의 회원 탈퇴 alert에서 탈퇴 시 toast popup 노출
  useEffect(() => {
    if (withdrawl) {
      toastOpen(withdrawlSuccessToast)
      isWithdrawl(false)
      setSelectUser(null)
    }
  }, [isWithdrawl, withdrawl])

  useEffect(() => {
    sessionStorage.removeItem('uid')
  }, [])

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
            <Breadcrumb pageTitleList={seegeneUserPageTitle} />
            <h1 className="headline1">Seegene HQ User</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              color="primary"
              icon="PlusIcon"
              size="large"
              type="contained"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
              onClick={() => modalOpen(inviteModal)}
            >
              {t('kJzC')}
            </ButtonMui>
          </div>
        </ContentBox>
        <BaseTab tabData={tabData} value={tabIndex} onChange={({ oldIndex, newIndex }) => handleChangeTab(newIndex)} />
      </div>
      <ContentBox>{tabData[tabIndex].content}</ContentBox>
    </>
  )
}

export default SeegeneUser
