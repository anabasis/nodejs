/**
 * newco 회원 초대 popup
 */

import { BaseInput, DetailTable, InputDec, InputGroup, ButtonMui, SelectChangeEvent, SelectMui } from 'ui'
import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useModal } from 'library'
import { emailRegex, seegeneRegex } from 'lib/constant/regex'
import { useInviteNewCo, useNewCoUserRoleData } from '@store/server/useNewCoUserQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'library/i18n/client'

interface InviteMemberProps {
  isInvited: Dispatch<SetStateAction<boolean>>
}

const InviteNewco = (props: InviteMemberProps) => {
  const { isInvited } = props
  const { t } = useTranslation('platform')
  const [emailRegexError, isEmailRegexError] = useState(false) // 이메일 정규식 위배 여부
  const [unableEmailError, isUnableEmailError] = useState(false) // 등록 기업 여부
  const [emailDuplicatedError, isEmailDuplicatedError] = useState(false) // 기 가입 이메일 여부
  const [email, setEmail] = useState('') // 이메일 입력
  const [selectedUserRole, setSelectedUserRole] = useState('') // user role

  // user role을 선택하고 정규식에 맞게 email을 입력하면 Invite 버튼 활성화
  const disabledButton = useMemo(() => {
    return !email || !selectedUserRole
  }, [email, selectedUserRole])

  const queryClient = useQueryClient()
  const newCoUserRoleList = useNewCoUserRoleData()
  const mutateInviteNewCo = useInviteNewCo()

  const { modalClose } = useModal()

  /**
   * handleEmail: email을 입력 시 동작하는 함수
   * - 이메일 정규식, seegene 이메일인지 확인하여 각 정규식에 위배되는 오류 노출
   * @param input : email
   */
  const handleEmail = (input: string) => {
    setEmail(input)
    if (emailRegex.test(input) || input === '' || !seegeneRegex.test(input)) {
      isEmailRegexError(false)
    } else {
      isEmailRegexError(true)
      isUnableEmailError(false)
      isEmailDuplicatedError(false)
    }
  }

  /**
   * handleInvite: Invite 버튼 클릭 시 동작하는 함수
   * - 초대 API 호출
   *    - API 응답 중 이미 있는 이메일인 경우: 오류 표시 노출
   *    - 완료: 모달 닫기 후 페이지에 초대 완료 toast 노출
   */
  const handleInvite = () => {
    if (emailRegexError) return
    let param = {
      emailId: email,
      userRolId: selectedUserRole,
    }
    mutateInviteNewCo.mutate(param, {
      onSuccess: (res) => {
        if (res.data.statusCode === 202102 || res.data.statusCode === 202106) {
          isUnableEmailError(false)
          isEmailDuplicatedError(true)
          return
        } else if (res.data.statusCode === 202101) {
          isEmailDuplicatedError(false)
          isUnableEmailError(true)
          return
        }
        isInvited(true)
        queryClient.invalidateQueries(['newCoInvitationList'])
        modalClose('invite')
      },
      onError: () => {
        isEmailDuplicatedError(false)
        isUnableEmailError(true)
        return
      },
    })
  }

  return (
    <>
      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '80%' }} />
          </colgroup>
        }
      >
        <tr>
          <th className="va_top pt_19">{t('yMUt')}</th>
          <td>
            <InputGroup>
              <BaseInput
                placeholder={t('mmJQ')}
                error={emailRegexError || emailDuplicatedError || unableEmailError}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleEmail(event.target.value)}
              />
              {emailRegexError && <InputDec msg={t('BiSk')} error />}
              {emailDuplicatedError && <InputDec msg={t('alpM')} error />}
              {unableEmailError && <InputDec msg="An unregistered corporate domain. Please enter again." error />}
            </InputGroup>
          </td>
        </tr>
        <tr>
          <th>{t('WObJ')}</th>
          <td>
            <SelectMui
              options={newCoUserRoleList}
              placeholder={t('kfjt')}
              size="full"
              onChange={(event: SelectChangeEvent<string>) => setSelectedUserRole(event.target.value)}
            />
          </td>
        </tr>
      </DetailTable>
      <div className="align center mt_30">
        <ButtonMui size="xlarge" type="outlined" onClick={() => modalClose('invite')}>
          {t('hgxO')}
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          disabled={disabledButton || mutateInviteNewCo.isLoading}
          isLoading={mutateInviteNewCo.isLoading}
          onClick={() => handleInvite()}
        >
          Invite
        </ButtonMui>
      </div>
    </>
  )
}

export default InviteNewco
