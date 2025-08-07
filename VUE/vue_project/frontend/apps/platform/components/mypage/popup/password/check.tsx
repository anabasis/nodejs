'use client'

/**
 * 화면: 비밀번호 확인 팝업
 */

import { MyInfoType } from '@type/mypage/myInfoType'
import { api, encodeSHA256, useModal } from 'library'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useState } from 'react'
import { ButtonMui, DetailTable, InputDec, InputGroup, PasswordInput } from 'ui'

const testPassword = 'P@ssW0rd'
type ProfileResponse = {
  userInfo: MyInfoType
}

const CheckPassword = (props: ProfileResponse) => {
  const { modalClose } = useModal()

  const { userInfo } = props

  const [disabledButton, isDisabledButton] = useState<boolean>(true)
  const [incorrectPwd, isIncorrectPwd] = useState<boolean>(false)
  const [input, setInput] = useState('')

  const resetPwdForm = () => {
    setInput('')
  }

  const route = useRouter()

  const handleConfirmButton = useCallback(
    (id) => {
      setInput(id)
      if (id.length > 0) isDisabledButton(false)
      else isDisabledButton(true)
    },
    [isDisabledButton, setInput]
  )

  const handleMatch = useCallback(() => {
    api.post(`/mypage/myinfo/password`, { loginPwd: encodeSHA256(input) }).then((response) => {
      if (response.data === 'Y') {
        modalClose('1')
        route.push(`/mypage/modification`)
      } else {
        resetPwdForm()
        isDisabledButton(true)
        isIncorrectPwd(true)
      }
    })
  }, [input, route, resetPwdForm])

  return (
    <>
      <DetailTable
        colgroup={
          <>
            <colgroup>
              <col style={{ width: '180px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
          </>
        }
      >
        <tr>
          <th>Email</th>
          <td className="pl_0 pr_20">
            <span className="body1">{userInfo?.emlId}</span>
          </td>
        </tr>
        <tr>
          <th className="va_top pt_22">Password</th>
          <td className="pl_0 pr_20">
            {incorrectPwd ? (
              <InputGroup>
                <PasswordInput
                  size="full"
                  placeholder="Please enter password."
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleConfirmButton(event.target.value)}
                  error
                />
                <InputDec msg="Incorrect password, please enter again." error />
              </InputGroup>
            ) : (
              <InputGroup>
                <PasswordInput
                  size="full"
                  placeholder="Please enter password."
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleConfirmButton(event.target.value)}
                />
              </InputGroup>
            )}
          </td>
        </tr>
      </DetailTable>
      {/* 최유희 : 팝업 내 버튼 마크업 수정 */}
      <div className="align center mt_58">
        <ButtonMui size="xlarge" type="outlined" onClick={() => modalClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={() => handleMatch()} disabled={disabledButton}>
          OK
        </ButtonMui>
      </div>
    </>
  )
}

export default CheckPassword
