'use client'

/**
 * 화면: 비밀번호 변경
 * - Provider가 client쪽이기에 page에서 선언.
 * - 내용은 PasswordBody
 */

import PasswordBody from '@components/login/PasswordBody'
import { PasswordResetStepper } from '@constant/login'
import { useEffect, useState } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { ContentBox, HeaderStepper, Icons, LoginLayout } from 'ui'

const siteKey = process.env['NEXT_PUBLIC_RECAPTCHA_SITE_KEY']

const PasswordReset = () => {
  const [currentStep, setCurrentStep] = useState(0) // step
  const [key, setKey] = useState(0) // key: recaptcha 새로고침 trigger

  useEffect(() => {
    if (currentStep === 1) {
      setKey(key + 1)
    }
  }, [currentStep])

  return (
    <LoginLayout>
      <GoogleReCaptchaProvider
        reCaptchaKey={siteKey}
        language="en"
        key={key}
        container={{
          element: 'verification',
          parameters: {
            badge: 'inline',
          },
        }}
      >
        <ContentBox type="auto" className="ptb_20">
          <div className="align start mb_20">
            <Icons.LoginLogo width={357} height={40} fill="#657496" />
            <h1 className="headline1 ml_16">Password Reset</h1>
          </div>
          <HeaderStepper color="primary" data={PasswordResetStepper} />
        </ContentBox>
        <PasswordBody currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </GoogleReCaptchaProvider>
    </LoginLayout>
  )
}

export default PasswordReset
