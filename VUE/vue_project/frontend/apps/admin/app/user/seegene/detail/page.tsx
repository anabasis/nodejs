'use client'

/**
 * 화면: seegene 유저 상세 페이지
 */

import { ButtonMui, Breadcrumb, ContentBox } from 'ui'
import { AlertType, ToastType, useAlert, useMenu, useToastPopup } from 'library'
import { useAtom } from 'jotai'
import { selectedSeegeneRoleChangeAtom, selectedSeegeneUserAtom } from '@store/client/user'
import { useEffect, useState } from 'react'
import { seegeneUserDetailPageTitle } from '@constant/pageTitleList'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import WithdrawlReason from '@components/user/popup/WithdrawlReason'
import SeegeneDetailProjectTable from '@components/user/seegene/table/SeegeneDetailProjectTable'
import SeegeneDetailUserInfoTable from '@components/user/seegene/table/SeegeneDetailUserInfoTable'
import SeegeneDetailRoleTable from '@components/user/seegene/table/SeegeneDetailRoleTable'
import { useSeegeneDetatilData, useSeegeneRoleChangeRequest } from '@store/server/useSeegeneUserQuery'
import { useLoginHistoryListData } from '@store/server/useCommonQuery'
import { useTranslation } from 'library/i18n/client'

const SeegeneDetail = () => {
  const { t } = useTranslation('platform')
  const searchParams = useSearchParams()
  const [user, setUser] = useAtom(selectedSeegeneUserAtom)
  const [roleChange, setRoleChange] = useAtom(selectedSeegeneRoleChangeAtom)

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const [roleChangeSuccess, isRoleChangeSuccess] = useState(false)
  const [roleChangeDeclined, isRoleChangeDeclined] = useState(false)
  const [cancelWithdraw, isCancelWithdraw] = useState(false)

  const uid = searchParams.get('no')
  const no = sessionStorage.getItem('no')

  const data = useSeegeneDetatilData(uid)
  const reqData = useSeegeneRoleChangeRequest(uid)
  const history = useLoginHistoryListData(uid)

  const route = useRouter()

  const { alertOpen, alertClose } = useAlert()
  const { toastOpen } = useToastPopup()

  // withdrawlAlert: 회원 탈퇴 alert
  const withdrawlAlert: AlertType = {
    icon: 'info',
    title: t('DWII'),
    textTitle: t('EToP', { name: data.userName }),
    content: <WithdrawlReason path={'seegene'} uid={uid} isCancelWithdraw={isCancelWithdraw} />,
  }

  // cancelWithdrawAlert: 회원 탈퇴 불가 alert
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
   * handleWithdrawl: 탈퇴 버튼 클릭 시 동작하는 함수
   * - 탈퇴할 사용자에 대한 state 저장
   * - 탈퇴 alert 열기
   */
  const handleWithdrawl = () => {
    setUser(data.userName)
    alertOpen(withdrawlAlert)
  }

  // 역할 요청 데이터 초기 렌더링
  useEffect(() => {
    const setting = () => {
      setRoleChange(reqData)
    }
    setting()
  }, [reqData])

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
  }, [roleChangeDeclined])

  useEffect(() => {
    if (cancelWithdraw) {
      alertOpen(cancelWithdrawAlert)
      isCancelWithdraw(false)
    }
  }, [cancelWithdraw])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={seegeneUserDetailPageTitle} />
            <h1 className="headline1">{data.userName}</h1>
          </div>
          <div className="rgt">
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
        {/* 유저 개인정보 */}
        <article>
          <div className="cont_title_box">
            <p className="title1">{t('rJgS')}</p>
          </div>
          <SeegeneDetailUserInfoTable no={no} data={data} history={history} />
        </article>

        {/* 역할 정보 */}
        <article>
          <div className="cont_title_box">
            <p className="title1">{t('Qykg')}</p>
          </div>
          <SeegeneDetailRoleTable uid={uid} isRoleChangeSuccess={isRoleChangeSuccess} isRoleChangeDeclined={isRoleChangeDeclined} data={data} />
        </article>

        {/* 프로젝트 영역 */}
        <SeegeneDetailProjectTable uid={uid} />
      </ContentBox>
    </>
  )
}

export default SeegeneDetail
