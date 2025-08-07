'use client'

/**
 * 화면: 마이페이지 회원 탈퇴
 * 경로: /mypage/secession
 */

import SecessionCheck from '@components/mypage/SecessionCheck'
import SecessionCode from '@components/mypage/SecessionCode'
import SecessionConfirm from '@components/mypage/popup/secession/confirm'
import { useUser } from 'library'
import { AlertType, useAlert } from 'library/hook/useAlert'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Breadcrumb, ButtonMui, ContentBox } from 'ui'

const pageTitleList = [{ mnuName: 'My Page', mnuUrl: '/mypage/', mnuIcon: '/images/i-mypage.png' }, 'Withdrawal']

const MySecession = () => {
  const router = useRouter()

  const [disabledButton, isDisabledButton] = useState<boolean>(true)
  const [auth, isAuth] = useState<boolean>(false)
  const [checked, isChecked] = useState<boolean>(false)
  const { userInfo } = useUser()
  const { alertOpen, alertClose, alertAllClose } = useAlert()

  const [withdrawalFlag, setWithdrawalFlag] = useState<boolean>(true)

  const email = userInfo?.emlId
  const atMark = email?.indexOf('@')

  const emailMask = () => {
    if (atMark !== -1) {
      const mask = '*'.repeat(atMark)
      const domain = email?.slice(atMark)

      return mask + domain
    }
    return email
  }

  const modalSecessionConfirm: AlertType = {
    icon: 'info',
    title: 'Withdraw confimation',
    isAllClose: true,
    textTitle: (
      <span>
        If you withdrawl, you will not be able to check the <br />
        development projects and documents that have been <br />
        carried out in the system.
      </span>
    ),
    content: <SecessionConfirm open={alertOpen} close={alertClose} setWithdrawalFlag={setWithdrawalFlag} />,
  }

  useEffect(() => {
    if (alertAllClose) {
      if (!withdrawalFlag) {
        //탈퇴 완료
        close()
        window.authKc.doLogout('/')
      } else {
        //탈퇴 취소
        router.replace('/mypage')
      }
    }
  }, [alertAllClose, userInfo])

  const handleSecessionCheck = () => {
    alertOpen(modalSecessionConfirm)
  }

  useEffect(() => {
    if (auth === true && checked === true) isDisabledButton(false)
  }, [isDisabledButton, auth, checked])

  return (
    <>
      {/* 최유희 : 전체적으로 마크업 정리 진행했습니다. 더 필요한 부분 있으면 이야기 주세요. */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Withdrawal</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <article>
          <div className="cont_title_box">
            <p className="title1 typo900">Be sure to check before withdrawing from Seegene OneSystem.</p>
            <p className="body2 typo500">
              Reuse and recovery are not possible, when you withdraw your Seegene OneSystem account ({emailMask()}), <br />
              Please choose carefully as the withdrawn ID cannot be reused or restored by either you or others.
            </p>
          </div>
          <SecessionCheck checked={checked} isChecked={isChecked} />
        </article>

        <article>
          <div className="cont_title_box">
            <p className="title1">Please verify your account.</p>
            <p className="body2 typo500">Please verify yourself by sending the authification code to your Email.</p>
          </div>
          <SecessionCode auth={auth} isAuth={isAuth} checked={checked} />
        </article>

        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui size="xlarge" onClick={() => handleSecessionCheck()} disabled={disabledButton}>
              Withdrawal
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}

export default MySecession
