/**
 * 가입 승인 popup content
 */

import { ButtonMui, MultiSelectMui, SelectChangeEvent, SelectMui, DetailTable } from 'ui'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useModal, changeTimeLocal } from 'library'
import { useRegisterOrNotSeegeneMutate, useSeegeneAdminRoleData, useSeegeneUserRoleData } from '@store/server/useSeegeneUserQuery'
import { useQueryClient } from '@tanstack/react-query'
import { SeegeneProgressUser } from '@type/user/user'
import { useTranslation } from 'library/i18n/client'

interface ApprovalProps {
  user: SeegeneProgressUser // 유저 정보
  isApproval: Dispatch<SetStateAction<boolean>> // 승인 여부
}

const SeegeneRegistrationApproval = (props: ApprovalProps) => {
  const { user, isApproval } = props
  const { t } = useTranslation('platform')
  const [userRole, setUserRole] = useState('') // user role
  const [adminRole, setAdminRole] = useState([]) // admin role

  // Approval 버튼 활성화 여부, user role을 선택해야 Approve 버튼 활성화
  const disabledButton = useMemo(() => {
    return !userRole
  }, [userRole])

  const { modalClose } = useModal()

  const queryClient = useQueryClient()
  const seegeneUserRoleList = useSeegeneUserRoleData()
  const seegeneAdminRoleList = useSeegeneAdminRoleData().map((item) => ({ name: item.name, value: item.value.toString() }))
  const mutateRegisterOrNotSeegene = useRegisterOrNotSeegeneMutate()

  /**
   * handleApprove: Approve 버튼 클릭 시 동작하는 함수
   * - 가입 승인 API 호출
   */
  const handleApprove = () => {
    let param = {
      joinUid: user.userUUID,
      aprvCode: 'APV',
      usrRolNum: userRole,
      admRolNums: adminRole.length === 0 ? null : adminRole.map((item) => Number(item)),
    }

    mutateRegisterOrNotSeegene.mutate(param, {
      onSuccess: () => {
        isApproval(true)
        queryClient.invalidateQueries(['seegeneProgressList'])
        modalClose('approvalSeegeneRegistration')
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
            <td className="navy600">{user.userName}</td>
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
            <td className="navy600">{changeTimeLocal({ time: user.receiptDate, type: 'yyyy-MM-dd' })}</td>
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
            <th>
              <span className="required">{t('WObJ')}</span>
            </th>
            <td>
              <SelectMui
                value={userRole}
                options={seegeneUserRoleList}
                size="large"
                placeholder={t('kfjt')}
                onChange={(event: SelectChangeEvent<string>) => setUserRole(event.target.value)}
              />
            </td>
          </tr>
          {/* admin role */}
          <tr>
            <th>{t('Lyvz')}</th>
            <td>
              <MultiSelectMui
                value={adminRole}
                options={seegeneAdminRoleList}
                size="large"
                placeholder={t('RLJC')}
                onChange={(event: SelectChangeEvent<string[]>) => {
                  adminRole.find((item) => !event.target.value.includes(item)) !== undefined
                    ? setAdminRole(adminRole.filter((item) => event.target.value.includes(item)))
                    : setAdminRole([...adminRole, event.target.value.at(-1)])
                }}
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
          disabled={disabledButton || mutateRegisterOrNotSeegene.isLoading}
          isLoading={mutateRegisterOrNotSeegene.isLoading}
          onClick={() => handleApprove()}
        >
          {t('wKcC')}
        </ButtonMui>
      </div>
    </>
  )
}

export default SeegeneRegistrationApproval
