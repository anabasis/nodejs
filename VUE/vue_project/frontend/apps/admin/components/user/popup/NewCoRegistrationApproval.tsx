/**
 * 가입 승인 popup content
 */

import { ButtonMui, SelectChangeEvent, SelectMui, DetailTable } from 'ui'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useModal } from 'library'
import { changeTimeLocal } from 'library'
import { useQueryClient } from '@tanstack/react-query'
import { NewCoProgressUser } from '@type/user/user'
import { useApproveNewCoRegistrationMutate, useNewCoUserRoleData } from '@store/server/useNewCoUserQuery'
import { useTranslation } from 'library/i18n/client'

interface ApprovalProps {
  user: NewCoProgressUser // 유저 정보
  isApproval: Dispatch<SetStateAction<boolean>> // 승인 여부
}

const NewCoRegistrationApproval = (props: ApprovalProps) => {
  const { user, isApproval } = props
  const { t } = useTranslation('platform')
  const [userRole, setUserRole] = useState('') // user rol

  // Approval 버튼 활성화 여부, user role 선택해야 Approve 버튼 활성화
  const disabledButton = useMemo(() => {
    return !userRole
  }, [userRole])

  const { modalClose } = useModal()

  const queryClient = useQueryClient()
  const newCoUserRoleList = useNewCoUserRoleData()
  const mutateApproveRegistration = useApproveNewCoRegistrationMutate()

  /**
   * handleApprove: Approve 버튼 클릭 시 동작하는 함수
   * - 가입 승인 API 호출
   */
  const handleApprove = () => {
    let param = {
      userUid: user.userUid,
      userRolId: userRole,
      approvalResult: 'APV',
    }
    mutateApproveRegistration.mutate(param, {
      onSuccess: () => {
        isApproval(true)
        queryClient.invalidateQueries(['newCoPrgressList'])
        modalClose('approvalNewCoRegistration')
      },
    })
  }

  return (
    <>
      <div className="bg_box">
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
          }
        >
          {/* 유저 정보 */}
          <tr>
            <th className="navy300">{t('CwmC')}</th>
            <td className="navy600">{user.fullName}</td>
          </tr>
          <tr>
            <th className="navy300">{t('yMUt')}</th>
            <td className="navy600">{user.emailId}</td>
          </tr>
          <tr>
            <th className="navy300">{t('TPEV')}</th>
            <td className="navy600">{user.organization || '-'}</td>
          </tr>
          <tr>
            <th className="navy300">{t('uDYy')}</th>
            <td className="navy600">{user.jobTitle || '-'}</td>
          </tr>
          <tr>
            <th className="navy300">{t('aJqe')}</th>
            <td className="navy600">{changeTimeLocal({ time: user.createDate, type: 'yyyy-MM-dd' })}</td>
          </tr>
        </DetailTable>
      </div>
      <div className="ptb_20 plr_24">
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
          }
        >
          {/* user role */}
          <tr>
            <th>{t('WObJ')}</th>
            <td>
              <SelectMui
                value={userRole}
                options={newCoUserRoleList}
                size="large"
                placeholder={t('kfjt')}
                onChange={(event: SelectChangeEvent<string>) => setUserRole(event.target.value)}
              />
            </td>
          </tr>
        </DetailTable>
      </div>
      <div className="align center mt_30">
        <ButtonMui size="xlarge" type="outlined" onClick={() => modalClose('approvalRegistration')}>
          {t('hgxO')}
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          disabled={disabledButton || mutateApproveRegistration.isLoading}
          isLoading={mutateApproveRegistration.isLoading}
          onClick={() => handleApprove()}
        >
          {t('wKcC')}
        </ButtonMui>
      </div>
    </>
  )
}

export default NewCoRegistrationApproval
