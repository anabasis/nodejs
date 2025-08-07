/**
 * 가입 거절 popup content
 */

import { ButtonMui, TooltipHover, DetailTable, RadioBox } from 'ui'
import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'
import { changeTimeLocal, useModal } from 'library'
import { useQueryClient } from '@tanstack/react-query'
import { NewCoProgressUser } from '@type/user/user'
import { useDenyNewCoRegistrationMutate } from '@store/server/useNewCoUserQuery'
import { useTranslation } from 'library/i18n/client'

interface DenyProps {
  user: NewCoProgressUser // 유저정보
  isDeny: Dispatch<SetStateAction<boolean>> // 거절 여부
}

const NewCoRegistrationDenied = (props: DenyProps) => {
  const { user, isDeny } = props
  const { t } = useTranslation('platform')
  const [reason, setReason] = useState('') // 가입 거절 사유

  // Deny 버튼 활성화 여부, 사유 선택해야 Deny 버튼 활성화
  const disabledButton = useMemo(() => {
    return !reason
  }, [reason])

  const queryClient = useQueryClient()
  const mutateDenyRegistration = useDenyNewCoRegistrationMutate()

  const { modalClose } = useModal()

  /**
   * handleDeny: Deny 버튼 클릭 시 동작하는 함수
   * - 가입 거절 API 호출
   * - 거절 후 모달 닫기
   */
  const handleDeny = () => {
    let param = {
      userUid: user.userUid,
      userRolId: 0,
      approvalResult: reason,
    }
    mutateDenyRegistration.mutate(param, {
      onSuccess: () => {
        isDeny(true)
        queryClient.invalidateQueries(['newCoPrgressList'])
        modalClose('deniedNewCoRegistration')
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
          {/* 거절 사유 */}
          <tr>
            <th>{t('tmsi')}</th>
            <td>
              <div className="radiogroup align start item">
                <div className="item">
                  <RadioBox
                    id="unclear"
                    value="UNC"
                    name="reason"
                    text={t('rnEn')}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setReason(event.target.value)}
                  />
                  <TooltipHover placements="top" className="ml_6">
                    <p>{t('MWYV')}</p>
                    <ul className="pl_20">
                      <li className="dot caption white">{t('ROOT')}</li>
                    </ul>
                  </TooltipHover>
                </div>
                <div className="item">
                  <RadioBox
                    id="unfit"
                    value="UFR"
                    name="reason"
                    text={t('mdzb')}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setReason(event.target.value)}
                  />
                  <TooltipHover placements="top" className="ml_6">
                    <p>{t('MWYV')}</p>
                    <ul className="pl_20">
                      <li className="dot caption white">{t('IAev')}</li>
                    </ul>
                  </TooltipHover>
                </div>
              </div>
            </td>
          </tr>
        </DetailTable>
      </div>
      <div className="align center mt_30">
        <ButtonMui size="xlarge" type="outlined" onClick={() => modalClose('deniedRegistration')}>
          {t('hgxO')}
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          disabled={disabledButton || mutateDenyRegistration.isLoading}
          isLoading={mutateDenyRegistration.isLoading}
          onClick={() => handleDeny()}
        >
          {t('KjaI')}
        </ButtonMui>
      </div>
    </>
  )
}

export default NewCoRegistrationDenied
