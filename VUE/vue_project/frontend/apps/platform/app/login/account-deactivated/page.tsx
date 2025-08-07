'use client'

import { HeaderStepper, Icons } from 'ui/components'
import { ContentBox, ContentBoxWrap, LoginLayout } from 'ui/layouts'
import { ButtonMui } from 'ui/mui'
import { useAlert, AlertType } from 'library/hook/useAlert'
import { useEffect, useState } from 'react'
import DeactivatedGuide from '@components/login/DeactivatedGuide'
import EmailAuthentification from '@components/login/password-reset/EmailAuthentification'
import { activateAccount, getDeactivatedAccount } from '@api/login'
import { AccountDeactivatedStepper, idtfVerfCodeList } from '@constant/login'
import { codeMatchAtom } from '@store/client/login'
import { useAtom } from 'jotai'

/**
 * 화면: 로그인_휴면해제
 * 기능: step에 따른 컨텐츠 내용 달라짐. 컨텐츠를 제외한 header와 버튼 영역만 이 곳에 작성
 */

interface DetailInfo {
  usrUid: string
  emailId: string
  lastAccessDate: string
  wakeupAccountDate: string
}

const AccountDeactivated = () => {
  const [dateData, setDateData] = useState<DetailInfo>()
  const [code, setCode] = useState('') // 입력한 인증코드
  const [nextDisabled, isNextDisabled] = useState(true) // 다음 버튼 비활성화 여부
  const [codeMatch, isCodeMatch] = useAtom(codeMatchAtom) // 인증코드 일치 여부
  const [currentStep, setCurrentStep] = useState(0) // 현재 step

  const { alertOpen } = useAlert()

  const email = window.authKc.getPToken()?.email

  /**
   * alertAccountActivated: 휴면계정 해제 alert
   * - 버튼 클릭 시 로그인 화면으로 이동
   */
  const alertAccountActivated: AlertType = {
    isLogin: true,
    icon: 'success',
    title: 'Account activation complete',
    textTitle: 'Please click the button below to proceed.',
    content: (
      <div className="align center mt_30">
        <ButtonMui size="xlarge" type="contained" onClick={() => window.authKc.doLogin('/')}>
          OK
        </ButtonMui>
      </div>
    ),
  }

  /**
   * getInitInformation: 해당 이메일에 대한 정보를 가져오는 함수
   */
  const getInitInformation = () => {
    getDeactivatedAccount(email).then((res) => {
      setDateData(res)
    })
  }

  /**
   * getComponent: step에 따른 component 가져오는 함수
   * 1. 휴면해제 가이드
   * 2. 이메일 검증
   * @returns: 컴포넌트
   */
  const getComponent = () => {
    if (currentStep === 0) {
      return <DeactivatedGuide lastAccessDate={dateData?.lastAccessDate} deactivationDate={dateData?.wakeupAccountDate} />
    }
    return (
      <EmailAuthentification
        title="Authentification"
        desc="Please enter information to activate your account."
        idtfVerfCode={idtfVerfCodeList[0]}
        code={code}
        setCode={setCode}
      />
    )
  }

  /**
   * handlePrevious: 이전 버튼을 클릭하면 동작하는 함수
   * - 현재 step이 처음일 경우: 로그인 화면으로 돌아가기
   * - 처음이 아닐 경우: 이전 step으로 돌아가기. step header 변화
   */
  const handlePrevious = () => {
    if (currentStep === 0) {
      window.authKc.doLogout('/')
    } else {
      AccountDeactivatedStepper[currentStep].active = false
      AccountDeactivatedStepper[currentStep - 1].completed = false
      setCurrentStep(currentStep - 1)
    }
  }

  /**
   * handleNext: 다음 버튼을 클릭하면 동작하는 함수
   * - 현재 step이 마지막인 경우: 휴면 해제 alert 노출
   * - 마지막이 아닌 경우:
   *    1. 다음 step.
   *    2. step header 변화.
   *    3. 다음 버튼 비활성화
   */
  const handleNext = () => {
    if (currentStep === AccountDeactivatedStepper.length - 1) {
      let data = {
        emailId: email,
        authKey: code,
        idtfVerfCode: idtfVerfCodeList[0],
      }
      activateAccount(data).then(() => {
        alertOpen(alertAccountActivated)
      })
    } else {
      AccountDeactivatedStepper[currentStep].completed = true
      AccountDeactivatedStepper[currentStep + 1].active = true
      setCurrentStep(currentStep + 1)
      isNextDisabled(true)
    }
  }

  /**
   * 초기 정보를 가져오기 위함
   */
  useEffect(() => {
    getInitInformation()
  }, [email])

  useEffect(() => {
    history.pushState(null, null, location.href)
    addEventListener('popstate', handlePrevious)

    return () => {
      removeEventListener('popstate', handlePrevious)
    }
  }, [])

  /**
   * 다음 버튼 활성화 여부
   * 활성화 조건:
   *    1. 휴면 계정 해제 안내 step: 무조건 활성화
   *    2. 이메일 인증 step: 인증코드 일치 시
   */
  useEffect(() => {
    if (currentStep === 0 || codeMatch) {
      isNextDisabled(false)
    } else {
      isNextDisabled(true)
    }
  }, [codeMatch, isNextDisabled, currentStep])

  return (
    <LoginLayout>
      <ContentBox type="auto">
        <div className="align start mb_20">
          <Icons.LoginLogo width={357} height={40} fill="#657496" />
          <h1 className="headline1 ml_16">Account Deactivated</h1>
        </div>
        <HeaderStepper color="primary" data={AccountDeactivatedStepper} />
      </ContentBox>
      <ContentBox>
        {getComponent()}
        <div className="cont_bottom_box">
          <div className="align">
            <ButtonMui type="outlined" size="xlarge" onClick={() => handlePrevious()}>
              {currentStep === 0 ? 'Cancel' : 'Previous'}
            </ButtonMui>
            <ButtonMui type="contained" size="xlarge" onClick={() => handleNext()} disabled={nextDisabled}>
              {currentStep === AccountDeactivatedStepper.length - 1 ? 'Done' : 'Next'}
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </LoginLayout>
  )
}

export default AccountDeactivated
