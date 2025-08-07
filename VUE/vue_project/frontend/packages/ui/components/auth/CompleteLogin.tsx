'use client'

import { useEffect, Suspense } from 'react'
import { AlertType, api, useAlert } from 'library'
import CheckAccess from './CheckAccess'
import { TypeUserInfo } from './WrapAuth'
import { ButtonMui } from '@ui/mui'

// 정상 로그인 유저의 히스토리 추가
const addUserLoginHistory = () => {
  api.post('/login/login-history').then((res) => {
    if (res?.status === 200) sessionStorage.removeItem('firstLogin')
  })
}

// 비밀번호 90일 이후로 수정
const userPwdPeriod = async () => {
  const res = await api.post(`/login/user-pwd-period`)
  return res.status === 200 ? true : false
}

const CompleteLogin = ({ children, userInfo }: { children: React.ReactNode; userInfo: TypeUserInfo }) => {
  const { alertOpen, alertClose } = useAlert()

  const PasswordNinetyDaysAlert: AlertType = {
    isLogin: true,
    title: 'Password change notification',
    textTitle: `You have not changed password in 90days. 
    Please change password periodically to protect your personal 
    information. If you want to change now, please click 'Change' 
    If you want to change 90 days later, please click '90 days later'`,
    content: (
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => window.location.replace('/login/password-reset')}>
          Change
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          onClick={async () => {
            if (await userPwdPeriod()) alertClose()
          }}
        >
          90days Later
        </ButtonMui>
      </div>
    ),
  }

  const checkAlertStatus = () => {
    // userInfo?.isPwdUpdate !== 'N' && alertOpen(PasswordNinetyDaysAlert)

    const reqUri = sessionStorage.getItem('reqUri')

    if (userInfo?.isPwdUpdate !== 'N') {
      alertOpen(PasswordNinetyDaysAlert)
    } else if (reqUri) {
      sessionStorage.removeItem('reqUri')
      location.href = reqUri
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('firstLogin') === 'true') addUserLoginHistory() // 정상 로그인시 로그인 이력을 쌓는다.
    checkAlertStatus()
  }, [])

  return (
    <>
      {/* 로그인 완료 시 처리 컴포넌트 */}
      {/* 90일 alert */}
      {/* {userInfo?.isPwdUpdate !== 'N' && alertOpen(PasswordNinetyDaysAlert)} */}
      {/* 약관 동의 */}
      {/* {userInfo?.isTermsAgr !== 'N' && } */}
      {children}

      <Suspense fallback={null}>
        <CheckAccess />
      </Suspense>
    </>
  )
}

export default CompleteLogin
