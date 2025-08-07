'use client'

/**
 * 화면: LG1.1.1 로그인_문의하기
 * 경로: /login/inquiry
 * 기능: 로그인 화면에서 Inquiry를 클릭하였을 때 넘어오는 화면으로 운영자에게 해당 문의 내용을 보내는 화면
 */

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import InquiryContent from '@components/login/InquiryContnet'
import { LoginLayout } from 'ui'

const Inquiry = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env['NEXT_PUBLIC_RECAPTCHA_SITE_KEY']}
      language="en"
      container={{
        element: 'verification',
        parameters: {
          badge: 'inline',
        },
      }}
    >
      <LoginLayout>
        <InquiryContent />
      </LoginLayout>
    </GoogleReCaptchaProvider>
  )
}

export default Inquiry
