import { passwordRegex, spaceRegex } from '@constant/regex'
import { checkPasswordAtom, checkPasswordErrorAtom, passwordAtom, passwordErrorAtom } from '@store/client/login'
import { useAtom } from 'jotai'
import { ChangeEvent } from 'react'
import { DetailTable, InputDec, InputGroup, PasswordInput } from 'ui'

/**
 * 화면: LG2.2 로그인_비밀번호 재설정_새 비밀번호
 * 기능: 비밀번호를 설정하는 페이지
 */

interface PasswordResetProps {
  recaptchaError: boolean
}

const PasswordResetWithRecaptcha = (props: PasswordResetProps) => {
  const { recaptchaError } = props

  const [password, setPassword] = useAtom(passwordAtom) // 재설정할 비밀번호
  const [checkPassword, setCheckPassword] = useAtom(checkPasswordAtom) // 비밀번호 확인
  const [passwordError, setPasswordError] = useAtom(passwordErrorAtom) // 비밀번호 오류 노출 여부
  const [checkPasswordError, setCheckPasswordError] = useAtom(checkPasswordErrorAtom) // 비밀번호 확인 오류 노출 여부

  /**
   * 비밀번호 input에 입력 시 동작하는 함수
   * 비밀번호 input이 어떻게 되느냐에 따라 비밀번호 및 확인의 오류 문구가 노출된다.
   *    - 비밀번호를 입력한 가운데서 규칙에 맞지않은 경우: 비밀번호 오류
   *    - 비밀번호는 규칙에 맞췄으나 비밀번호 확인은 1자라도 입력되었으나 일치하진 않을 경우: 비밀번호 확인 오류
   * @param input 입력한 비밀번호 값
   */
  const handlePasswordError = (input: string) => {
    setPassword(input)

    if ((passwordRegex.test(input) && !spaceRegex.test(input)) || input === '') {
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }

    if ((checkPassword !== '' && checkPassword === input) || input === '') {
      setCheckPasswordError(false)
    } else if (checkPassword !== '' && checkPassword !== input) {
      setCheckPasswordError(true)
    }
  }

  /**
   * 비밀번호 확인 input에 입력 시 동작하는 함수
   * - state에 저장
   * - 비밀번호 확인 입력 값에 따라 오류 문구가 노출된다.
   *    - 비밀번호 확인 입력 값에 1자라도 적고 비밀번호와 일치하지 않을 경우
   * @param input 입력한 비밀번호 확인 값
   */
  const handleCheckPasswordError = (input: string) => {
    setCheckPassword(input)

    if (input !== '' && password === input) {
      setCheckPasswordError(false)
    } else {
      setCheckPasswordError(true)
    }
  }

  return (
    <>
      <div className="cont_ttitle_box mb_0">
        <p className="title1">Set New Password</p>
        <p className="body2 typo500 mt_8">
          The new password must contain uppercase and lowercase letters, numbers, and special characters includes
          (~!@#$%^&*_-+=`|\()&#123;&#125;[]:;&apos;&quot;&lt;&gt;,.?/).
          <br /> Please enter at least 8 characters and less than 20 characters.
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
        {/* 비밀번호 */}
        <tr>
          <th className="va_top pt_23">New password</th>
          <td>
            <InputGroup>
              <PasswordInput
                id="password"
                placeholder="Please enter new password."
                size="lg"
                error={passwordError}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handlePasswordError(event.target.value)}
              />
              {passwordError && (
                <InputDec msg={`Please enter between 8 and 20 characters including upper/lower case \n letters, numbers, and special characters.`} error />
              )}
            </InputGroup>
          </td>
        </tr>
        {/* 비밀번호 확인 */}
        <tr>
          <th className="va_top pt_23">Confirm password</th>
          <td>
            <InputGroup>
              <PasswordInput
                id="checkPassword"
                placeholder="Please enter new password again."
                size="lg"
                error={checkPasswordError}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleCheckPasswordError(event.target.value)}
              />
              {checkPasswordError && <InputDec msg="Password not match." error />}
            </InputGroup>
          </td>
        </tr>
        {/* Recaptcha */}
        <tr>
          <th>reCAPTCHA verification</th>
          <td className="pl_34">
            <div id="verification" />
            {recaptchaError && <InputDec msg="reCAPTCHA Permission denied to access property." error />}
          </td>
        </tr>
      </DetailTable>
    </>
  )
}

export default PasswordResetWithRecaptcha
