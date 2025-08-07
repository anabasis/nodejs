import { useToastPopup } from 'library'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BaseInput, ButtonMui, DetailTable, InputDec, InputGroup, MultiInput } from 'ui'
import AuthTimer from '../AuthTimer'
import { sendCodeToEmail, verifyCode } from '@api/login'
import { codeMatchAtom, emailAtom } from '@store/client/login'
import { useAtom } from 'jotai'
import { SendCodeToastList } from '@constant/login'

/**
 * 화면: LG2.1 로그인_비밀번호 재설정, LG3.2 휴면 계정 해제_ 휴면 계정 해제 신청
 * 변경 화면 ID ::  LG.2 로그인_비밀번호 재설정, LG.5 휴면 계정 해제_휴면 계정 해제 신청
 * 기능: 이메일 인증코드를 보내어 인증코드 일치 여부를 확인
 */

interface EmailAuthProps {
  code: string
  setCode: Dispatch<SetStateAction<string>>
  idtfVerfCode: string
  title?: string
  desc?: string
}

const EmailAuthentification = (props: EmailAuthProps) => {
  const { idtfVerfCode, code, setCode } = props
  const [sendDisabled, isSendDisabled] = useState(true) // 인증번호 전송 버튼 비활성화 여부
  const [authDisabled, isAuthDisabled] = useState(true) // 인증 버튼 비활성화 여부
  const [codeMatchError, isCodeMatchError] = useState(false) // 인증코드 일치 에러 상태 노출 여부
  const [timeError, isTimeError] = useState(false) // 인증코드 입력 시간 에러 상태 노출 여부
  const [activeTimer, isActiveTimer] = useState(false) // 인증코드 입력 시간 타이머 활성화 여부
  const [emailDisabled, isEmailDisabled] = useState(false) // email input 비활성화 함수
  const [sendCount, setSendCount] = useState(0) // 인증코드 전송 횟수

  const [email, setEmail] = useAtom(emailAtom) // 인증받을 이메일
  const [codeMatch, isCodeMatch] = useAtom(codeMatchAtom) // 인증코드 일치 여부

  const { toastOpen } = useToastPopup()

  /**
   * handleEmail: 이메일 input에 입력할 시 동작하는 함수
   * - 이메일 state에 저장
   * - 이메일에 1자라도 입력하면 인증번호 발송 및 재발송 버튼 활성화
   * @param input: 이메일 input 값
   */
  const handleEmail = (input: string) => {
    setEmail(input)
    if (input.length > 0) {
      isSendDisabled(false)
    } else {
      isSendDisabled(true)
    }
  }

  /**
   * sendCode: 'Send Code' 버튼을 클릭할 시 동작하는 함수. 인증번호 전송 횟수에 따라 동작이 다름
   * 공통
   * - 인증번호 최초 전송인 경우
   *  - 인증번호 전송 API 호출
   *  - '인증코드 발송' 문구 -> '재전송' 문구
   *  - 인증번호 입력 시간 노출 및 카운트 시작
   *  - 전송 토스트 팝업 노출
   *
   * - 인증번호 재전송(2회 이하)인 경우
   *  - 인증번호 전송 API 호출
   *  - 오류 문구 미노출
   *  - 인증번호 입력 시간 카운트 시작
   *  - 재전송 토스트 팝업 노출
   *
   * - 인증번호 전송 횟수 초과인 경우
   *  - 재전송 불가 토스트 팝업 노출
   */
  const sendCode = async () => {
    if (sendCount >= 2) {
      toastOpen(SendCodeToastList[2])
    } else {
      let data = {
        emailId: email,
        idtfVerfCode: idtfVerfCode,
      }
      if (idtfVerfCode === 'IDV03') {
        data['authType'] = 'eml'
      }
      sendCodeToEmail(data, navigator.language) // 인증번호 보내기 API
        .then(() => {
          sendCount === 0 ? toastOpen(SendCodeToastList[0]) : toastOpen(SendCodeToastList[1])
          setSendCount(sendCount + 1)
          isSendDisabled(true)
          isCodeMatchError(false)
          isTimeError(false)
          isActiveTimer(true)
        })
    }
  }

  /**
   * handleCode: 인증코드 input 입력 시 동작하는 함수
   * - 입력한 인증코드 state 저장
   * - 6자리를 입력할 경우 인증버튼 활성화. 아닌 경우 비활성화
   * @param input: 인증코드 input 값
   */
  const handleCode = (input: string) => {
    setCode(input)
    if (input.length === 6) {
      isAuthDisabled(false)
    } else {
      isAuthDisabled(true)
    }
  }

  /**
   * matchCode: 'Verify' 버튼을 클릭하였을 때 동작하는 함수
   * 공통
   * 1. 인증번호 입력 시간 정지
   *
   * 인증번호가 일치할 경우
   * 1. 에러 문구 미노출
   * 2. 인증이 되었으므로 다음 버튼 활성화
   * 3. 인증 버튼 비활성화
   * 4. 인증번호 전송 버튼 비활성화
   * 5. 이메일 input 비활성화(필요할 수도?)
   *
   * 인증번호가 불일치할 경우
   * 1. 인증번호 불일치 에러 문구 노출
   */
  const matchCode = () => {
    isTimeError(false)
    let data = {
      emailId: email,
      idtfVerfCode: idtfVerfCode,
      authKey: code,
    }
    verifyCode(data) // 인증번호 검증 API
      .then((res) => {
        if (res.statusCode === 202104) {
          isCodeMatchError(true)
          return
        }
        if (!timeError) {
          isEmailDisabled(true)
          isCodeMatchError(false)
          isCodeMatch(true)
          isActiveTimer(false)
          isSendDisabled(true)
          isAuthDisabled(true)
        }
      })
  }

  // 타임 에러 나면 재전송 버튼 활성화
  useEffect(() => {
    if (timeError) {
      isSendDisabled(false)
    }
  }, [timeError])

  return (
    <>
      <div className="cont_title_box mb_0 pd_0">
        {/* <p className="title1">Email Authentification</p> */}
        {/* bug id - 24463 :: 비밀번로 재설정과 휴면해제 타이틀과 서브 desc가 다르게 들어가서 버그 등록됨  */}
        <p className="title1">{props.title}</p>
        <p className="body2">{props.desc}</p>
      </div>
      <DetailTable
        className="pt_0 mt_30"
        colgroup={
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '75%' }} />
          </colgroup>
        }
      >
        <tr>
          <th className="va_top pt_18">Email</th>
          <td>
            <InputGroup>
              <BaseInput
                size="lg"
                placeholder="Please enter your Email."
                value={email}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleEmail(event.target.value)}
              >
                <ButtonMui className="grid1_5" type="contained" size="medium" color="black" uiType="etc" disabled={sendDisabled} onClick={() => sendCode()}>
                  {sendCount === 0 ? `Send Code` : `Re-send`}
                </ButtonMui>
              </BaseInput>
              <InputDec msg="The authentification code can resend up to 2 times." />
            </InputGroup>
          </td>
        </tr>

        <tr>
          <th className="va_top pt_18">Authentification code</th>
          <td>
            <InputGroup>
              <div className="align start">
                <MultiInput
                  size="lg"
                  placeholder="Please enter 6 digit code."
                  error={codeMatchError || timeError}
                  maxLength={6}
                  disabled={codeMatch}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleCode(event.target.value)}
                >
                  <span className="navy200" hidden={codeMatch || sendCount === 0}>
                    {/* 타이머 */}
                    <AuthTimer activeTimer={activeTimer} isActiveTimer={isActiveTimer} isTimeError={isTimeError} />
                  </span>
                </MultiInput>
                {/* 검증 button */}
                <ButtonMui className="grid1_5" type="contained" size="medium" color="black" uiType="etc" disabled={authDisabled} onClick={() => matchCode()}>
                  Verify
                </ButtonMui>
              </div>
              {codeMatch && <InputDec msg={`Authentication Complete`} success />}
              {codeMatchError && <InputDec msg={`Code error - Please enter code again.`} error />}
              {timeError && <InputDec msg="The validity period has expired. Please click Re-send to try again." error />}
            </InputGroup>
          </td>
        </tr>
      </DetailTable>
    </>
  )
}

export default EmailAuthentification
