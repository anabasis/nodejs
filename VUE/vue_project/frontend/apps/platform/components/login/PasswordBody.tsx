import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { ButtonMui, ContentBox } from 'ui'
import { AlertType, encodeSHA256, useAlert } from 'library'
import EmailAuthentification from './password-reset/EmailAuthentification'
import PasswordResetWithRecaptcha from './password-reset/PasswordResetWithRecaptcha'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PasswordResetStepper, RecaptchaStdScore, idtfVerfCodeList } from '@constant/login'
import { verifyRecaptcha } from '@api/external'
import { modifyPassword } from '@api/login'
import { useAtom } from 'jotai'
import { checkPasswordAtom, checkPasswordErrorAtom, codeMatchAtom, emailAtom, passwordAtom, passwordErrorAtom } from '@store/client/login'

interface PasswordBodyProps {
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
}

const PasswordBody = (props: PasswordBodyProps) => {
  const { currentStep, setCurrentStep } = props
  const [nextDisabled, isNextDisabled] = useState(true) // 다음 버튼 비활성화 여부
  const [recaptchaError, isRecaptchaError] = useState(false)
  const [code, setCode] = useState('') // 입력한 인증코드

  const [email, setEmail] = useAtom(emailAtom) // 인증받을 이메일
  const [password, setPassword] = useAtom(passwordAtom) // 재설정할 비밀번호
  const [checkPassword, setCheckPassword] = useAtom(checkPasswordAtom) // 비밀번호 확인
  const [passwordError, setPasswordError] = useAtom(passwordErrorAtom) // 비밀번호 오류 노출 여부
  const [checkPasswordError, setCheckPasswordError] = useAtom(checkPasswordErrorAtom) // 비밀번호 확인 오류 노출 여부
  const [codeMatch, isCodeMatch] = useAtom(codeMatchAtom) // 인증코드 일치 여부

  const { executeRecaptcha } = useGoogleReCaptcha()

  const { alertOpen } = useAlert()

  /**
   * alert 정보 -> 비밀번호 재설정까지 완료하면 노출
   * 완료 후 로그인으로 이동
   */
  const confirmPasswordReset: AlertType = {
    isLogin: true,
    icon: 'success',
    title: 'Password reset complete',
    textTitle: 'Please log in with the reset password.',
    content: (
      <div className="align center mt_30">
        {/* 로그인으로 이동 */}
        <ButtonMui
          type="contained"
          size="xlarge"
          onClick={() => {
            resetAtom()
            window.authKc.doLogout('/')
          }}
        >
          Go To Log-in
        </ButtonMui>
      </div>
    ),
  }

  /**
   * resetAtom: atom value 초기화
   */
  const resetAtom = () => {
    setEmail('')
    setPassword('')
    setCheckPassword('')
    setPasswordError(false)
    setCheckPasswordError(false)
    setCurrentStep(0)
  }

  /**
   * getComponent: 내용에 해당하는 컴포넌트 가져오는 함수.
   * 1. 이메일 인증
   * 2. 비밀번호 재설정
   * @returns 가져올 컴포넌트
   */
  const getComponent = () => {
    if (currentStep === 0) {
      return (
        <EmailAuthentification
          title="Email Authentification"
          desc="Please verify the Email to reset your password."
          idtfVerfCode={idtfVerfCodeList[2]}
          code={code}
          setCode={setCode}
        />
      )
    }
    return <PasswordResetWithRecaptcha recaptchaError={recaptchaError} />
  }

  /**
   * handlePrevious: 이전 버튼을 클릭하면 동작하는 함수
   * - 첫 번째 step : 로그인 화면으로 넘어간다.
   * - 두 번째 step : 이전 step으로 넘어간다. 이 때 step head의 표시를 변경한다.
   */
  const handlePrevious = () => {
    if (currentStep === 0) {
      window.authKc.doLogin('/')
    } else {
      PasswordResetStepper[currentStep].active = false
      PasswordResetStepper[currentStep - 1].completed = false
      setCurrentStep(currentStep - 1)
    }
  }

  /**
   * handleNext: 다음 버튼을 클릭하면 동작하는 함수
   * - 첫 번째 step : 다음 step으로 넘어간다. 이 때 step head의 표시를 변경한다.
   * - 두 번째 step : 해당 이메일에 비밀번호를 재설정하는 api 호출 후 alert를 노출시킨다.
   */
  const handleNext = () => {
    if (currentStep === PasswordResetStepper.length - 1) {
      isRecaptchaError(false)

      let data = {
        emailId: email,
        password: encodeSHA256(password),
      }

      // recaptcha 토큰 발급
      executeRecaptcha('reset')
        .then((token) => {
          // recaptcha 토큰 검증
          verifyRecaptcha(token)
            .then((res) => {
              if (res.score <= RecaptchaStdScore) {
                isRecaptchaError(true)
                return
              }
              // 비밀번호 재설정 API
              modifyPassword(data).then(() => alertOpen(confirmPasswordReset))
            })
            .catch(() => isRecaptchaError(true))
        })
        .catch(() => isRecaptchaError(true))
    } else {
      PasswordResetStepper[currentStep].completed = true
      PasswordResetStepper[currentStep + 1].active = true
      isCodeMatch(false)
      setCurrentStep(currentStep + 1)
      isNextDisabled(true)
    }
  }

  // 이메일 인증이 완료된 경우 다음 버튼 활성화
  useEffect(() => {
    if (codeMatch) {
      isNextDisabled(false)
    } else {
      isNextDisabled(true)
    }
  }, [codeMatch, isNextDisabled])

  // 비밀번호와 비밀번호 확인이 일치할 경우 다음 버튼 활성화
  useEffect(() => {
    if (!passwordError && !checkPasswordError && password !== '' && checkPassword !== '') {
      isNextDisabled(false)
    } else {
      isNextDisabled(true)
    }
  }, [passwordError, checkPasswordError, password, checkPassword, isNextDisabled])

  useEffect(() => {
    history.pushState(null, null, location.href)
    addEventListener('popstate', handlePrevious)

    return () => {
      removeEventListener('popstate', handlePrevious)
    }
  }, [])

  return (
    <ContentBox>
      {getComponent()}
      <div className="cont_bottom_box">
        <div className="align">
          <ButtonMui type="outlined" size="xlarge" onClick={() => handlePrevious()}>
            Previous
          </ButtonMui>
          <ButtonMui type="contained" size="xlarge" disabled={nextDisabled} onClick={() => handleNext()}>
            {currentStep === PasswordResetStepper.length - 1 ? 'Done' : 'Next'}
          </ButtonMui>
        </div>
      </div>
    </ContentBox>
  )
}

export default PasswordBody
