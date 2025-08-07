import { existedEmailAtom, newCoEmailAtom } from '@store/client/signup'
import { useAtom } from 'jotai'
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react'
import { BaseInput, DetailTable, InputDec, InputGroup } from 'ui'

/**
 * 화면: JO.2.1 이메일 주소 입력 및 확인
 * 경로: /signup
 * 조건: newco 회원가입 직접 가입 1번째 단게
 */

interface InputEmailProps {
  isDisabled: Dispatch<SetStateAction<boolean>>
  recaptchaError: boolean
}

const EnterEmail = (props: InputEmailProps) => {
  const { isDisabled, recaptchaError } = props

  const [email, setEmail] = useAtom(newCoEmailAtom)
  const [existedEmail, isExistedEmail] = useAtom(existedEmailAtom) // 이메일 기 가입 여부

  /**
   * handleInput: 입력한 이메일 값 변화에 따른 다음 버튼 상태 변화를 이끄는 함수.
   * - 입력한 것이 없는 경우: 다음 버튼 비활성화.
   * - 입력한 것이 있는 경우: 다음 버튼 활성화
   * @param value: 이메일 입력 값
   */
  const handleInput = (value: string) => {
    // 입력한 값이 없는 경우, 다음 step으로 가기 위한 버튼 비활성화할 것.
    if (!value) {
      isDisabled(true)
      isExistedEmail(false)
    }
    // 입력한 값이 존재하는 경우, Next 버튼 활성화
    else {
      isDisabled(false)
    }
    setEmail(value)
  }

  // 이메일 길이가 0이 아닌 경우 next 활성화 -> previous를 눌렀을 경우를 대비
  useEffect(() => {
    if (email.length !== 0) {
      isDisabled(false)
    }
  }, [])

  return (
    <>
      <div className="cont_title_box mb_0">
        <p className="title1">Enter Email</p>
        <p className="body2 typo500">Please enter the Email to log in.</p>
      </div>

      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: '180px' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
        }
      >
        {/* 이메일 입력 */}
        <tr>
          <th className="va_top pt_19">Email</th>
          <td>
            <InputGroup>
              {/* defaultValue는 다음 단계에서 Previous를 클릭할 경우, 입력했던 정보를 노출시키기 위함. */}
              <BaseInput
                size="lg"
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleInput(event.target.value)}
                placeholder="kim@newco.co.kr"
                value={email}
                error={existedEmail}
              />
              {existedEmail ? (
                <InputDec msg="This Email has already signed up. Please enter another Email." error />
              ) : (
                <InputDec msg="Please enter the Email address with your corporate domain." />
              )}
            </InputGroup>
          </td>
        </tr>

        {/* recaptcha */}
        <tr>
          <th className="vt">reCAPTCHA verification</th>
          <td>
            <p id="signup"></p>
            {recaptchaError && <InputDec msg="reCAPTCHA Permission denied to access property." error />}
          </td>
        </tr>
      </DetailTable>
    </>
  )
}

export default EnterEmail
