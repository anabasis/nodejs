'use client'

import { verifyRecaptcha } from '@api/external'
import { sendInquiry } from '@api/login'
import { ChangeEvent, useEffect, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { BaseInput, ButtonMui, ContentBox, DetailTable, Icons, InputDec, InputGroup, RadioBox, SelectMui, TextArea } from 'ui'
import { AlertType, useAlert } from 'library'
import { InquriyEmail, InquriySelectOption, RecaptchaStdScore } from '@constant/login'

const InquiryContent = () => {
  const [nextDisabled, isNextDisabled] = useState(true) // Done 버튼의 비활성화 여부
  const [accountType, setAccountType] = useState('')
  const [inquiryType, setInquiryType] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [email, setEmail] = useState('')
  const [recaptchaError, isRecaptchaError] = useState(false)

  const { executeRecaptcha } = useGoogleReCaptcha()

  const { alertOpen, alertClose } = useAlert()

  /**
   * inquirySendSuccessAlert: 문의 등록 완료 alert
   */
  const inquirySendSuccessAlert: AlertType = {
    isLogin: true,
    icon: 'success',
    title: 'Inquiry registration complete',
    textTitle: 'Your inquiry has been successfully registered.',
    content: (
      <div className="align center mt_30">
        <ButtonMui size="xlarge" onClick={() => window.authKc.doLogin('/')}>
          Go To Log-in
        </ButtonMui>
      </div>
    ),
  }

  /**
   * inquirySendFailAlert: 문의 등록 실패 alert
   */
  const inquirySendFailAlert: AlertType = {
    icon: 'warning',
    title: 'Inquiry registration failed',
    textTitle: 'Inquiry registration failed because an error occurred. Please try again.',
    content: (
      <div className="align center mt_30">
        <ButtonMui size="large" onClick={() => alertClose()}>
          OK
        </ButtonMui>
      </div>
    ),
  }

  /**
   * Cancel 버튼을 클릭하였을 때 동작하는 함수
   * - 이전 화면인 로그인 화면으로 넘어간다. 이 때 이전의 NewCo인지 Seegene인지도 기억해야 한다.
   */
  const handlePrevious = () => {
    if (localStorage.getItem('aTkn')) {
      window.authKc.doLogout('/')
    } else {
      window.authKc.doLogin('/')
    }
  }

  /**
   * Done 버튼을 클릭하였을 때 동작하는 함수
   * - 운영자에게 메일을 보내는 API 호출
   * - 문의하기 완료 후 toast popup 노출
   */
  const handleSend = () => {
    isRecaptchaError(false)

    let inquriyInputs = {
      accountType: accountType,
      inquiryType: inquiryType,
      inquirySubject: subject,
      inquiryContent: content,
      emailId: email,
    }

    // recaptcha 토큰 발급
    executeRecaptcha('inquiry').then((token) => {
      // recaptcha 토큰 검증
      verifyRecaptcha(token)
        .then((res) => {
          if (res.score <= RecaptchaStdScore) {
            isRecaptchaError(true)
            return
          }
          // 문의하기 API
          sendInquiry(inquriyInputs, navigator.language)
            .then(() => {
              alertOpen(inquirySendSuccessAlert)
            })
            .catch(() => {
              alertOpen(inquirySendFailAlert)
            })
        })
        .catch(() => {
          isRecaptchaError(true)
          return
        })
        .catch(() => {
          isRecaptchaError(true)
          return
        })
    })
  }

  /**
   * 한 항목이라도 입력하지 않으면 다음 버튼 비활성화
   */
  useEffect(() => {
    if (!accountType || !inquiryType || !subject || !content || !email) {
      isNextDisabled(true)
    } else {
      isNextDisabled(false)
    }
  }, [accountType, inquiryType, subject, content, email])

  useEffect(() => {
    history.pushState(null, null, location.href)
    addEventListener('popstate', handlePrevious)

    return () => {
      removeEventListener('popstate', handlePrevious)
    }
  }, [])

  return (
    <>
      <ContentBox type="auto">
        <div className="align start">
          <Icons.LoginLogo width={357} height={40} fill="#657496" />
          <h1 className="headline1 ml_16">Inquiry</h1>
        </div>
      </ContentBox>
      <ContentBox>
        <div className="cont_title_box mb_0">
          <p className="title1">Inquiry</p>
          <p className="body2 typo500">
            Please fill out your inquiry in as much detail as possible. If the information you entered is incorrect troubleshooting can be difficult. <br />
            In addition, it is not possible to inquire about other users accounts only to inquire about your own.
          </p>
        </div>
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '180px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
          }
        >
          <tr>
            <th className="vt">Account type</th>
            <td className="align start">
              {/* 계정 유형 */}
              <div style={{ paddingRight: '20px' }}>
                <RadioBox
                  id="seegene"
                  name="account"
                  text="Seegene"
                  value="Seegene"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setAccountType(event.target.value)}
                />
              </div>
              <div>
                <RadioBox
                  id="newco"
                  name="account"
                  text="Newco"
                  value="NewCo"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setAccountType(event.target.value)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th className="vt">Inquiry category</th>
            {/* 문의하기 유형 */}
            <td>
              <SelectMui
                size="large"
                options={InquriySelectOption}
                placeholder="Please select inquiry category."
                onChange={(event: ChangeEvent<HTMLInputElement>) => setInquiryType(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th className="vt">Subject</th>
            {/* 제목 */}
            <td>
              <BaseInput
                size="lg"
                placeholder="Please enter title."
                maxLength={100}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setSubject(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th className="vt">Content</th>
            {/* 내용 */}
            <td>
              <TextArea
                length={true}
                maxLength={1000}
                size="lg"
                value={content}
                placeholder="Please enter content."
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th className="va_top pt_20">Email</th>
            {/* 이메일 */}
            <td>
              <InputGroup>
                <BaseInput size="lg" placeholder="Please enter your Email" onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} />
                <InputDec msg="Please enter an Email where you can check the answer to your inquiry." />
              </InputGroup>
            </td>
          </tr>
          <tr>
            <th>reCAPTCHA verification</th>
            <td>
              <div id="verification"></div>
              {recaptchaError && <InputDec msg="reCAPTCHA Permission denied to access property." error />}
            </td>
          </tr>
        </DetailTable>
        <div className="cont_bottom_box">
          <div className="align">
            <ButtonMui type="outlined" size="xlarge" onClick={() => handlePrevious()}>
              Cancel
            </ButtonMui>
            <ButtonMui type="contained" size="xlarge" disabled={nextDisabled} onClick={() => handleSend()}>
              Done
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}

export default InquiryContent
