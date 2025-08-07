'use client'

import { useAtom } from 'jotai'
import { selectedNewcoUserAtom } from '@store/client/user'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ToastType, useToastPopup, AlertType, useAlert, useMenu } from 'library'
import WithdrawlReason from '@components/user/popup/WithdrawlReason'
import { ButtonMui, ContentBox, Breadcrumb } from 'ui'
import { newCoUserDetailPageTitle } from '@constant/pageTitleList'
import NewCoDetailUserInfoTable from '@components/user/newco/table/NewCoDetailUserInfoTable'
import NewCoDetailRoleTable from '@components/user/newco/table/NewCoDetailRoleTable'
import NewCoDetailProjectTable from '@components/user/newco/table/NewCoDetailProjectTable'
import { useNewCoDetailData } from '@store/server/useNewCoUserQuery'
import { useLoginHistoryListData } from '@store/server/useCommonQuery'
import PasswordResetPopup from '@components/user/popup/PasswordResetPopup'
import { useTranslation } from 'library/i18n/client'

/**
 * 화면: newco 유저 상세 페이지
 */

const NewcoDetail = () => {
  const { t } = useTranslation('platform')
  const searchParams = useSearchParams()
  const uid = searchParams.get('no')
  const no = sessionStorage.getItem('no')

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const [selectedUser, setSelectedUser] = useAtom(selectedNewcoUserAtom)

  const [roleChangeSuccess, isRoleChangeSuccess] = useState(false)
  const [roleChangeDeclined, isRoleChangeDeclined] = useState(false)
  const [cancelWithdraw, isCancelWithdraw] = useState(false)
  const [passwordReset, isPasswordReset] = useState(false)

  const route = useRouter()

  const { alertOpen, alertClose } = useAlert()
  const { toastOpen } = useToastPopup()

  const data = useNewCoDetailData(uid)
  const history = useLoginHistoryListData(uid)

  // 비밀번호 변경을 위한 alert
  const passwordResetAlert: AlertType = {
    icon: 'info',
    title: 'Password reset',
    textTitle: `Are you sure you want to reset ${data.fullName} password?`,
    content: <PasswordResetPopup uid={uid} isPasswordReset={isPasswordReset} />,
  }

  // withdrawlAlert: 회원 탈퇴 alert
  const withdrawlAlert: AlertType = {
    icon: 'info',
    title: t('DWII'),
    textTitle: t('EToP', { name: data.fullName }),
    content: <WithdrawlReason path={'newco'} uid={uid} isCancelWithdraw={isCancelWithdraw} />,
  }

  // cancelWithdrawAlert: 회원 탈퇴 취소 alert - 프로젝트 관리로 이동
  const cancelWithdrawAlert: AlertType = {
    icon: 'warning',
    title: t('IcdX'),
    textTitle: t('hXJU'),
    content: (
      <div className="align center mt_30">
        <ButtonMui size="xlarge" type="outlined" onClick={() => alertClose()}>
          {t('hgxO')}
        </ButtonMui>
        <ButtonMui size="xlarge" type="contained" onClick={() => route.replace('/project')}>
          {t('sanb')}
        </ButtonMui>
      </div>
    ),
  }

  // 비밀번호 재설정 완료 toast popup
  const passwordResetToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: `Password reset has been completed, Email has been automatically sent to ${data.fullName}.`,
  }

  // 역할 변경 성공 toast popup
  const roleChangeSuccessToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: t('RApA'),
  }

  // 역할 변경 실패 toast popup
  const roleChangeDeclinedToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: t('SfIi'),
  }

  /**
   * handleWithdrawl: withdrawl 버튼을 클릭하였을 때 동작하는 함수
   * - alert open
   */
  const handleWithdrawl = () => {
    setSelectedUser(data.fullName)
    alertOpen(withdrawlAlert)
  }

  // 역할 성공 시 toast popup 제공
  useEffect(() => {
    if (roleChangeSuccess) {
      toastOpen(roleChangeSuccessToast)
      isRoleChangeSuccess(false)
    }
  }, [roleChangeSuccess, isRoleChangeSuccess])

  // 역할 거부 시 toast popup 제공
  useEffect(() => {
    if (roleChangeDeclined) {
      toastOpen(roleChangeDeclinedToast)
      isRoleChangeDeclined(false)
    }
  }, [roleChangeDeclined, isRoleChangeDeclined])

  useEffect(() => {
    if (cancelWithdraw) {
      alertOpen(cancelWithdrawAlert)
      isCancelWithdraw(false)
    }
  }, [cancelWithdraw])

  useEffect(() => {
    if (passwordReset) {
      toastOpen(passwordResetToast)
      isPasswordReset(false)
    }
  }, [passwordReset])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={newCoUserDetailPageTitle} />
            <h1 className="headline1">{data.fullName}</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              color="secondary"
              icon="ResetIcon"
              size="large"
              type="contained"
              disabled={getPathInfo(pathname).uptYn !== 'Y'}
              onClick={() => alertOpen(passwordResetAlert)}
            >
              Password Reset
            </ButtonMui>
            <ButtonMui
              color="primary"
              icon="DeleteIcon"
              size="large"
              type="contained"
              disabled={getPathInfo(pathname).delYn !== 'Y' || data.userStatusCode === 'DMT'}
              onClick={() => handleWithdrawl()}
            >
              {t('DWII')}
            </ButtonMui>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        {data && (
          <>
            <article>
              <div className="cont_title_box">
                <p className="title1">{t('rJgS')}</p>
              </div>
              <NewCoDetailUserInfoTable no={no} data={data} history={history} />
            </article>

            {/* 역할 정보 */}
            <article>
              <div className="cont_title_box">
                <p className="title1">{t('Qykg')}</p>
              </div>
              <NewCoDetailRoleTable data={data} isRoleChangeSuccess={isRoleChangeSuccess} isRoleChangeDeclined={isRoleChangeDeclined} />
            </article>
          </>
        )}

        {/* 프로젝트 영역 */}
        <NewCoDetailProjectTable uid={uid} />
      </ContentBox>
    </>
  )
}

export default NewcoDetail
