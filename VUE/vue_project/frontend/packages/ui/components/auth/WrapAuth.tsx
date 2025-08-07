'use client'

/**
 * 인증과 역할을 체크하고 하위 컴포넌트를 노출한다.
 * 1. 로그인이 안되어있으면 로그인 페이지로 이동
 * 2. CheckUserStatus component 에서 토큰의 체크 후 각 로직 실행(API 제작 후 로직 지정 예정) : 승인대기, 승인거절, 회원아님, 기업이 제거됨, 회원가입 페이지로 이동NewCo, 약관동의로 이동AD, 휴면, 정지, 90일 비번 미변경, 정상회원 등
 */

import { useEffect, useState } from 'react'
import { debounce as _debounce } from 'lodash-es'
import { api, isBrowser } from 'library/util'
import CheckUserStatus from './CheckUserStatus'
import CompleteLogin from './CompleteLogin'
import Cookies from 'js-cookie'

export type TypeUserInfo = {
  emailId: string
  userUid: string
  corporateNumber?: number
  corporateName?: string
  corporateLvlCode?: string
  userName: string
  profileFileNumber?: number
  userStatusCode?: string
  denyReasonCode?: string
  userCode?: string
  rolLvlCd?: string
  corpStsCd?: string
  isTermsAgr?: string
  isPwdUpdate?: string
}

const isLogin = () => {
  if (isBrowser && window.authKc) {
    // 로그인 체크 후 로그인을 시킨다
    if (!window.authKc.isLogin()) {
      sessionStorage.setItem('firstLogin', 'true')
      window.authKc.doLogin()
    } else {
      const params = new URL(location.href).searchParams
      const requri = params.get('requri')

      if (requri && requri.length > 0) sessionStorage.setItem('reqUri', requri)

      return true
    }
  }
}

export default function WrapAuth({ children, isRoot = false, isAdmin = false }: { children: React.ReactNode; isRoot?: boolean; isAdmin?: boolean }) {
  const [userInfo, setUserInfo] = useState<TypeUserInfo | null>(null)

  const getUserData = _debounce(
    (reTry: number) => {
      api
        .get('/login/login-valid')
        .then((res) => {
          Cookies.set('USER_LANGUAGE', window.authKc.getPToken()?.lang_code)
          if (res?.data) setUserInfo(res.data)
        })
        .catch((err) => {
          if (err?.response.status === 401 && reTry > 0) {
            reTry--
            getUserData(reTry)
          }
        })
    },
    1e3,
    { leading: true }
  )

  useEffect(() => {
    sessionStorage.setItem('isAdmin', isAdmin.toString())
  }, [isAdmin])

  useEffect(() => {
    sessionStorage.setItem('isRoot', isRoot.toString())
  }, [isRoot])

  useEffect(() => {
    window.pageLoading({ mask: false })
    if (!!isLogin()) getUserData(3)
  }, [])

  return userInfo ? (
    userInfo.userStatusCode === 'NRM' && userInfo.isTermsAgr === 'Y' ? (
      <CompleteLogin userInfo={userInfo}>{children}</CompleteLogin>
    ) : (
      <CheckUserStatus userInfo={userInfo} />
    )
  ) : null
}
