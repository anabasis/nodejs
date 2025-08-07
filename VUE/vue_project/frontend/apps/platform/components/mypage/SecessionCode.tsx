/**
 * 회원 탈퇴 인증 코드
 */

import AuthTimer from '@components/login/AuthTimer'
import { api } from 'library'
import { ToastType, useToastPopup } from 'library/hook/useToastPopup'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { ButtonMui, InputDec, MultiInput } from 'ui'

const testCode = 'ABCDEF'

interface CodeInputFlag {
  auth: boolean
  isAuth: React.Dispatch<React.SetStateAction<boolean>>
  checked: boolean
}

const SecessionCode = (props: CodeInputFlag) => {
  const { auth, isAuth, checked } = props

  const [codeDisableInputFlag, isCodeDisableInputFlag] = useState<boolean>(true)
  const [resendFlag, isResendFlag] = useState<boolean>(false)
  const [authFlag, isAuthFlag] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [authCode, setAuthCode] = useState<string>(testCode) // 인증코드 저장
  //(0/2)
  const [authCount, setAuthCount] = useState(0)

  const { toastOpen } = useToastPopup()
  const [activeTimer, isActiveTimer] = useState(false) // 인증코드 입력 시간 타이머 활성화 여부
  const [timeError, isTimeError] = useState(false) // 인증코드 입력 시간 에러 상태 노출 여부
  const [sendDisabled, isSendDisabled] = useState(true) // 인증번호 전송 버튼 비활성화 여부

  const toastResendState: ToastType = {
    icon: 'success',
    content: 'The authentification code has been resent.',
    autoHideDuration: 3000,
  }

  const toastAuthFailState: ToastType = {
    icon: 'error',
    content: 'The number of the authentification code transmissions has been exceeded. Please refresh or log-in again.',
    autoHideDuration: 3000,
  }

  const handleSendCode = useCallback(() => {
    const toastState: ToastType = {
      icon: 'success',
      content: 'The authentification code has been sent.',
      autoHideDuration: 3000,
    }
    // 이메일로 인증코드 보내는 로직 작성
    isCodeDisableInputFlag(false)
    isSendDisabled(false)
    isActiveTimer(true)
    toastOpen(toastState)
    api.get(`/mypage/withdrawal/code`).then((response) => {
      setAuthCode(response.data.authKey)
    })
  }, [isCodeDisableInputFlag, toastOpen])

  const handleCheckCode = useCallback(() => {
    let input = (document.getElementById('ipt01') as HTMLInputElement).value
    if (input === authCode) {
      isAuthFlag(true)
      isAuth(true)
      isActiveTimer(false)
    } else {
      isResendFlag(true)
      isActiveTimer(false)
      setAuthCount((count) => count + 1)
    }
  }, [isAuthFlag, isResendFlag, isAuth, authCode])

  const handleResendCode = useCallback(() => {
    // 이메일 인증코드 재발송
    toastOpen(toastResendState)
    isTimeError(false)
    isResendFlag(false)
    isActiveTimer(true)
    api.get(`/mypage/withdrawal/code`).then((response) => {
      setAuthCode(response.data.authKey)
    })
  }, [isResendFlag, toastOpen, toastAuthFailState])

  useEffect(() => {
    if (timeError) {
      isSendDisabled(false)
    }
  }, [timeError])

  return (
    <div>
      <div className="align start gap_10">
        <MultiInput
          id="ipt01"
          name="authCodeName"
          disabled={codeDisableInputFlag || authFlag}
          placeholder={codeDisableInputFlag ? 'Please enter 6 digits.' : 'Please enter 6 digits.'}
          error={resendFlag || timeError}
          size="lg"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
          maxLength={6}
        >
          <span className="typo500" hidden={codeDisableInputFlag}>
            {/* 타이머 */}
            <AuthTimer activeTimer={activeTimer} isActiveTimer={isActiveTimer} isTimeError={isTimeError} />
          </span>
        </MultiInput>
        {authFlag ? (
          <ButtonMui disabled type="contained" color="black" size="medium" onClick={() => handleCheckCode()}>
            Verify
          </ButtonMui>
        ) : codeDisableInputFlag ? (
          <ButtonMui disabled={!checked} type="contained" color="black" size="medium" onClick={() => handleSendCode()}>
            Send Code
          </ButtonMui>
        ) : resendFlag ? (
          <ButtonMui
            type="contained"
            color="black"
            size="medium"
            onClick={() => {
              //2번 실패시 토스트 팝업
              if (authCount > 1) {
                toastOpen(toastAuthFailState)
                isActiveTimer(false)
                isResendFlag(true)
              } else {
                handleResendCode()
              }
            }}
          >
            Re-send
          </ButtonMui>
        ) : timeError ? (
          <ButtonMui
            type="contained"
            color="black"
            size="medium"
            onClick={() => {
              //2번 실패시 토스트 팝업
              if (authCount > 1) {
                toastOpen(toastAuthFailState)
                isResendFlag(true)
              } else {
                handleResendCode()
              }
            }}
          >
            Re-send
          </ButtonMui>
        ) : (
          <ButtonMui type="contained" color="black" size="medium" onClick={() => handleCheckCode()}>
            Verify
          </ButtonMui>
        )}
      </div>
      {authFlag && <InputDec msg="Authentification complete." success />}
      {resendFlag && <InputDec msg={`Code error - Please enter code again (${authCount}/2)`} error />}
      {timeError && <InputDec msg="Validity time has expired. Please click resend to proceed again." error />}
      {!authFlag && !resendFlag && !timeError && <InputDec msg={`The authentication code can be sent up to twice(${authCount}/2)`} />}
    </div>
  )
}

export default SecessionCode
