'use client'

/**
 * 화면: 비밀번호 확인 팝업
 */

import { passwordRegex } from '@constant/regex'
import { AdminRole, LoginLogList, MyInfoType, UserRole } from '@type/mypage/myInfoType'
import { AlertType, api, encodeSHA256, useAlert, useModal } from 'library'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { ButtonMui, DetailTable, InputDec, PasswordInput } from 'ui'

type ProfileResponse = {
  userInfo: MyInfoType
  userRole?: UserRole
  adminRole?: AdminRole[]
  loginList?: LoginLogList[]
}

const ChangePassword = (props: ProfileResponse) => {
  const { modalClose } = useModal()
  const { alertOpen, alertAllClose } = useAlert()

  const { userInfo, userRole, adminRole, loginList } = props

  const [disabledButton, isDisabledButton] = useState<boolean>(true)
  const [newPassword, setNewPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [input, setInput] = useState('')

  //current pwd
  const [matchPassword, isMatchPassword] = useState<boolean>(false)
  //new === confirm
  const [newMatchPassword, isNewMatchPassword] = useState<boolean>(false)
  //passwordRegex 정규식 일치
  const [incorrectPwd, isIncorrectPwd] = useState<boolean>(false)

  const resetPwdForm = () => {
    setInput('')
  }

  const route = useRouter()

  const handleConfirmButton = useCallback(
    (id) => {
      setInput(id)
      if (id.length > 0) {
        isDisabledButton(false)
        isMatchPassword(false) //현재비번 에러 -> 수정 시 버튼 활성화
      } else isDisabledButton(true)
    },
    [isDisabledButton, setInput]
  )

  const isEmpty = newPassword.length === 0 || checkPassword.length === 0

  const doChangePassword = () => {
    const alertState: AlertType = {
      icon: 'success',
      title: 'Password change complete',
      isAllClose: true,
      textTitle: 'Please log with new password.',
      content: (
        <div className="align center mt_30">
          <ButtonMui size="xlarge" onClick={() => modalClose()}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  const handleUpdatePassword = useCallback(() => {
    const beforePassword = encodeSHA256(input)
    api.post(`/mypage/myinfo/password`, { loginPwd: beforePassword }).then((response) => {
      //현재 비번 맞음?
      if (response.data === 'Y') {
        //정규식 부합?
        if (passwordRegex.test(newPassword)) {
          //새비번 확인비번 일치?
          if (newPassword === checkPassword) {
            if (!matchPassword && !incorrectPwd && !newMatchPassword) {
              api.post('/mypage/myinfo/password/modify', { loginPwd: beforePassword, newPwd: encodeSHA256(newPassword) }).then((response) => {
                if (response.status === 200) {
                  // toastOpen(toastState)
                  doChangePassword()
                }
              })
            }
          } else {
            isNewMatchPassword(true)
          }
        } else {
          isIncorrectPwd(true)
        }
      } else {
        isMatchPassword(true)
      }
    })
  }, [input, route, isMatchPassword, isIncorrectPwd, isNewMatchPassword, resetPwdForm])

  useEffect(() => {
    if (alertAllClose) modalClose()
  }, [alertAllClose])

  return (
    <>
      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: '180px' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
        }
      >
        <tr>
          <th className="va_top pt_18">Current password</th>
          <td>
            {matchPassword ? (
              <>
                <PasswordInput
                  placeholder="Please enter current password."
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleConfirmButton(event.target.value)}
                  error
                />
                <InputDec msg="Incorrect password, please enter again." error />
              </>
            ) : (
              <PasswordInput
                placeholder="Please enter current password."
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleConfirmButton(event.target.value)}
              />
            )}
          </td>
        </tr>
        <tr>
          <th className="va_top pt_18">New password</th>
          <td>
            {incorrectPwd ? (
              <>
                <PasswordInput
                  placeholder="Please enter new password."
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setNewPassword(event.target.value)
                    isIncorrectPwd(false)
                  }}
                  error
                />
                <InputDec msg={`Please enter between 8 to 20 characters including upper/lower case letters, numbers, and special characters.`} error />
              </>
            ) : (
              <PasswordInput
                placeholder="Please enter new password."
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setNewPassword(event.target.value)
                }}
              />
            )}
          </td>
        </tr>
        <tr>
          <th className="va_top pt_18">Confirm password</th>
          <td>
            {newMatchPassword ? (
              <>
                <PasswordInput
                  placeholder="Please enter password again."
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setCheckPassword(event.target.value)
                    isNewMatchPassword(false)
                  }}
                  error
                />
                <InputDec msg="Password not match." error />
              </>
            ) : (
              <PasswordInput
                placeholder="Please enter password again."
                onChange={(event: ChangeEvent<HTMLInputElement>) => setCheckPassword(event.target.value)}
              />
            )}
          </td>
        </tr>
      </DetailTable>

      {/* 최유희 : 팝업 내 버튼 마크업 수정 */}
      <div className="align center mt_30">
        <ButtonMui size="xlarge" type="outlined" onClick={() => modalClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          onClick={() => handleUpdatePassword()}
          disabled={disabledButton || matchPassword || incorrectPwd || newMatchPassword || isEmpty}
        >
          Save
        </ButtonMui>
      </div>
    </>
  )
}

export default ChangePassword
