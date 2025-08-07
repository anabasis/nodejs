import { passwordRegex, spaceRegex } from '@constant/regex'
import { passwordAtom } from '@store/client/signup'
import { SignUpType } from '@type/signup/SignUpType'
import { useAtom } from 'jotai'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DetailTable, InputDec, InputGroup, PasswordInput } from 'ui'

/**
 * 화면: JO.2.4 비밀번호 입력
 * 경로: /signup
 * 조건: newco 회원가입 3번째 단게
 */

interface InputPasswordProps {
  isDisabled: Dispatch<SetStateAction<boolean>>
}

const PasswordSetting = (props: InputPasswordProps) => {
  const { isDisabled } = props

  const [checkPassword, setCheckPassword] = useState('') // 비밀번호 확인
  const [passwordError, setPasswordError] = useState(false) // 비밀번호 오류 노출 여부
  const [checkPasswordError, setCheckPasswordError] = useState(false) // 비밀번호 확인 오류 노출 여부

  const [password, setPassword] = useAtom(passwordAtom) // password

  /**
   * handlePasswordError: 비밀번호 input 입력 시 동작하는 함수
   * 1. 비밀번호를 회원 정보에 임시 저장
   * 2. 비밀번호 조건에 맞지 않을 경우 오류 문구 노출
   * 3. 비밀번호 입력 시 비밀번호 확인과 일치하지 않고 비어있지 않을 경우 비밀번호 확인에 오류 노출
   * @param input: 비밀번호 입력 값
   */
  const handlePasswordError = (input: string) => {
    setPassword(input)

    /* 
    2번 동작 -> 비밀번호 input 오류 미노출: 비밀번호 정규식에 맞는 경우 or 아무것도 입력하지 않은 경우
              비밀번호 input 오류 노출: 비밀번호 정규식에 맞지 않은 경우
    */
    if ((passwordRegex.test(input) && !spaceRegex.test(input)) || input === '') {
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }

    /* 
    3번 동작 -> 비밀번호 확인 input 오류 미노출: 비밀번호 확인이 비밀번호와 일치할 경우 or 아무것도 입력하지 않은 경우
              비밀번호 확인 input 오류 노출: 비밀번호와 불일치 하는 경우
    */
    if ((checkPassword !== '' && checkPassword === input) || input === '') {
      setCheckPasswordError(false)
    } else if (checkPassword !== '' && checkPassword !== input) {
      setCheckPasswordError(true)
    }
  }

  /**
   * handleCheckPasswordError: 비밀번호 확인 input 입력 시 동작하는 함수
   * 1. 비밀번호 확인에 set
   * 2. input이 비어있지 않고 비밀번호와 일치하지 않을 경우 비밀번호 확인에 오류 노출
   * @param input: 비밀번호 확인 입력 값
   */
  const handleCheckPasswordError = (input: string) => {
    setCheckPassword(input)

    // input이 비어있지 않고 비밀번호와 일치하지 않을 경우 비밀번호 확인에 오류 노출
    if (password === input && input !== '') {
      setCheckPasswordError(false)
    } else {
      setCheckPasswordError(true)
    }
  }

  useEffect(() => {
    /**
     * Next 버튼 활성화 조건
     * 1. 비밀번호 input이 비어있지 않을 것
     * 2. 비밀번호 확인 input이 비어있지 않을 것
     * 3. 비밀번호 정규식에 맞을 것
     * 4. 비밀번호 확인이 비밀번호와 일치할 것
     */
    if (!passwordError && !checkPasswordError && password !== '' && checkPassword !== '') {
      isDisabled(false)
    } else {
      isDisabled(true)
    }
  }, [passwordError, checkPasswordError, checkPassword, password, isDisabled])

  return (
    <>
      <div className="cont_title_box mb_0">
        <p className="title1">Password Setting</p>
        <p className="body2 typo500">
          The password must contain uppercase and lowercase letters, numbers, and special characters includes
          (~!@#$%^&*_-+=`|\\()&#123;&#125;[]:;&apos;&quot;&lt;&gt;,.?/). <br />
          Please enter at least 8 characters and less than 20 characters.
        </p>
      </div>

      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '75%' }} />
          </colgroup>
        }
      >
        {/* 비밀번호 input */}
        <tr>
          <th className="va_top pt_18">Password</th>
          <td>
            <div className="grid6_1">
              <PasswordInput
                id="password"
                placeholder="Please enter password."
                size="lg"
                error={passwordError}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handlePasswordError(event.target.value)}
              />
              {passwordError && (
                <InputDec msg={'Please enter between 8 and 20 characters including upper/lower case letters, numbers and special characters.'} error />
              )}
            </div>
          </td>
        </tr>

        {/* 비밀번호 확인 Input */}
        <tr>
          <th className="va_top pt_18">Confirm password</th>
          <td>
            <div className="grid6_1">
              <PasswordInput
                id="checkPassword"
                placeholder="Please enter new password again."
                size="lg"
                error={checkPasswordError}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleCheckPasswordError(event.target.value)}
              />
              {checkPasswordError && <InputDec msg="Password not match." error />}
            </div>
          </td>
        </tr>
      </DetailTable>
    </>
  )
}

export default PasswordSetting
