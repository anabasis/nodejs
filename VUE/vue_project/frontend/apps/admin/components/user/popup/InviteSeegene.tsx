/**
 * seegene 회원 초대 popup
 */

import { BaseInput, DetailTable, InputDec, InputGroup, ButtonMui, MultiSelectMui, SelectChangeEvent, SelectMui } from 'ui'
import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useModal } from 'library'
import { emailRegex, seegeneRegex } from 'lib/constant/regex'
import { useInviteSeegene, useSeegeneAdminRoleData, useSeegeneUserRoleData } from '@store/server/useSeegeneUserQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'library/i18n/client'

interface InviteSeegeneProps {
  isInvited: Dispatch<SetStateAction<boolean>>
}

const InviteSeegene = (props: InviteSeegeneProps) => {
  const { isInvited } = props
  const { t } = useTranslation('platform')

  const [emailRegexError, isEmailRegexError] = useState(false) // 이메일 정규식 위배 여부
  const [emailSeegeneError, isEmailSeegeneError] = useState(false) // seegene 이메일 정규식 위배 여부
  const [emailDuplicatedError, isEmailDuplicatedError] = useState(false) // 기 가입 이메일 여부
  const [email, setEmail] = useState('') // 이메일 입력
  const [selectedUserRole, setSelectedUserRole] = useState('') // user role
  const [adminList, setAdminList] = useState([]) // admin role

  const queryClient = useQueryClient()
  const seegeneUserRoleList = useSeegeneUserRoleData()
  const seegeneAdminRoleList = useSeegeneAdminRoleData().map((item) => ({ name: item.name, value: item.value.toString() }))
  const mutateInviteSeegene = useInviteSeegene()

  // Invite 버튼 활성화 여부, user role을 선택하고 정규식에 맞게 email을 입력하면 Invite 버튼 활성화
  const disabledButton = useMemo(() => {
    return !selectedUserRole || !email
  }, [email, selectedUserRole])

  const { modalClose } = useModal()

  /**
   * handleEmail: email을 입력 시 동작하는 함수
   * - 이메일 정규식, seegene 이메일인지 확인하여 각 정규식에 위배되는 오류 노출
   * @param input : email
   */
  const handleEmail = (input: string) => {
    setEmail(input)
    if (emailRegex.test(input) || input === '') {
      isEmailRegexError(false)
    } else {
      isEmailDuplicatedError(false)
      isEmailRegexError(true)
      isEmailSeegeneError(false)
      return
    }
    if (seegeneRegex.test(input) || input === '') {
      isEmailSeegeneError(false)
    } else {
      isEmailSeegeneError(true)
      return
    }
  }

  /**
   * handleInvite: Invite 버튼 클릭 시 동작하는 함수
   * - 초대 API 호출
   *    - API 응답 중 이미 있는 이메일인 경우: 오류 표시 노출
   *    - 완료: 모달 닫기 후 페이지에 초대 완료 toast 노출
   */
  const handleInvite = () => {
    if (emailRegexError || emailSeegeneError) return
    let param = {
      emailId: email,
      userRolId: selectedUserRole,
      admRolIds: adminList.length === 0 ? null : adminList.join(','),
    }
    mutateInviteSeegene.mutate(param, {
      onSuccess: (res) => {
        if (res.data.statusCode === 202113 || res.data.statusCode === 202106) {
          isEmailDuplicatedError(true)
          return
        }
        isInvited(true)
        queryClient.invalidateQueries(['seegeneInvitationList'])
        modalClose('invite')
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
          <th className="va_top pt_19">
            <span className="required">{t('yMUt')}</span>
          </th>
          <td>
            <InputGroup>
              <BaseInput
                placeholder={t('mmJQ')}
                error={emailRegexError || emailSeegeneError || emailDuplicatedError}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleEmail(event.target.value)}
              />
              {emailRegexError && <InputDec msg={t('BiSk')} error />}
              {emailSeegeneError && <InputDec msg={t('OTaD')} error />}
              {emailDuplicatedError && <InputDec msg={t('alpM')} error />}
            </InputGroup>
          </td>
        </tr>
        <tr>
          <th>
            <span className="required">{t('WObJ')}</span>
          </th>
          <td>
            <SelectMui
              options={seegeneUserRoleList}
              placeholder={t('kfjt')}
              size="full"
              onChange={(event: SelectChangeEvent<string>) => setSelectedUserRole(event.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>{t('Lyvz')}</th>
          <td>
            <MultiSelectMui
              options={seegeneAdminRoleList}
              value={adminList}
              placeholder={t('RLJC')}
              size="full"
              onChange={(event: SelectChangeEvent<string[]>) => {
                adminList.find((item) => !event.target.value.includes(item)) !== undefined
                  ? setAdminList(adminList.filter((item) => event.target.value.includes(item)))
                  : setAdminList([...adminList, event.target.value.at(-1)])
              }}
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
          disabled={disabledButton || mutateInviteSeegene.isLoading}
          isLoading={mutateInviteSeegene.isLoading}
          onClick={() => handleInvite()}
        >
          Invite
        </ButtonMui>
      </div>
    </>
  )
}

export default InviteSeegene
