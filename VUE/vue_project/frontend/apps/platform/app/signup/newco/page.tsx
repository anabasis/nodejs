'use client'

/**
 * newco 회원가입 화면
 */

import { getInviteValid } from '@api/signup'
import NewCoSignUpContent from '@components/signup/NewCoSignUpContent'
import { SignUpNewCoDirectHeader, SignUpNewCoInviteHeader } from '@constant/signUp'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { ContentBox, HeaderStepper, Icons, LoginLayout } from 'ui'

const recaptchaSiteKey = process.env['NEXT_PUBLIC_RECAPTCHA_SITE_KEY']

const SignUp = () => {
  const searchParams = useSearchParams()
  const invite = searchParams.get('invite') === 'true' // 초대 가입 or 직접 가입.
  const email = searchParams.get('email') // 이메일
  const stepContent = invite ? SignUpNewCoInviteHeader : SignUpNewCoDirectHeader // steppper 내용. (Seegene, Newco), (초대 가입, 직접 가입) 기준으로 stepper 내용이 달라짐. constant/signup에 해당 내용 있음.

  const [currentStep, setCurrentStep] = useState(0) // 현재 스텝
  const [key, setKey] = useState(0) // recaptcha rendering trigger
  const [isNewbie, setIsNewbie] = useState(false)

  const route = useRouter()

  // step이 이동할 때마다 recaptcha refresh -> previous를 누를 경우 새로 렌더링하기 위함.
  useEffect(() => {
    if (currentStep === 0) {
      setKey(key + 1)
    }
  }, [currentStep])

  // 초대 링크를 타고 온 경우, 유효한 메일인지 확인하기 위함.
  useEffect(() => {
    if (invite) {
      getInviteValid(email)
        .then((res) => {
          if (res.isJoin || !res.isInvite) {
            window.authKc.doLogin('/')
          } else {
            setIsNewbie(true)
          }
        })
        .catch(() => {
          route.push('/error/404')
        })
    } else {
      setIsNewbie(true)
    }
  }, [])

  return (
    <LoginLayout>
      <GoogleReCaptchaProvider
        reCaptchaKey={recaptchaSiteKey}
        language="en"
        key={key}
        container={{
          element: 'signup',
          parameters: {
            badge: 'inline',
          },
        }}
      >
        {!!isNewbie ? (
          <>
            {/* 헤더 부분 */}
            <ContentBox type="auto">
              <div className="align start mb_20">
                <Icons.LoginLogo width={357} height={40} fill="#657496" />
                <h1 className="headline1 ml_16">Sign Up</h1>
              </div>
              <HeaderStepper color="primary" data={stepContent} />
            </ContentBox>
            <NewCoSignUpContent invite={invite} stepContent={stepContent} currentStep={currentStep} setCurrentStep={setCurrentStep} />
          </>
        ) : null}
      </GoogleReCaptchaProvider>
    </LoginLayout>
  )
}

// 버튼을 해당 page에 작성. handlePrevious를 두고 step에 따라 data 안의 property를 초기화하는 방향으로 할 것.
export default SignUp
