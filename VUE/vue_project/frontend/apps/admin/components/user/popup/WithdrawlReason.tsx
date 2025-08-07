/**
 * 회원 탈퇴 alert의 content
 */

import { ButtonMui, SelectMui, DetailTable } from 'ui'
import { ChangeEvent, Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useAlert } from 'library/hook/useAlert'
import { useRouter } from 'next/navigation'
import { withdrawlAtom } from '@store/client/user'
import { useAtom } from 'jotai'
import { useWithdrawSeegene } from '@store/server/useSeegeneUserQuery'
import { useWithdrawNewCo } from '@store/server/useNewCoUserQuery'
import { useTranslation } from 'library/i18n/client'

interface WithdrawlReasonProps {
  uid: string
  path: string // seegene, newco 회원 판단 -> 상세 페이지 경로가 된다.
  isCancelWithdraw: Dispatch<SetStateAction<boolean>>
}

const WithdrawlReason = (props: WithdrawlReasonProps) => {
  const { path, uid, isCancelWithdraw } = props
  const { t } = useTranslation('platform')
  const [reason, setReason] = useState('') // 탈퇴 사유
  const [withdrawl, isWithdrawl] = useAtom(withdrawlAtom) // 회원 리스트 complete 화면에서 toastpopup을 띄우기 위한 boolean

  const reasonList = [
    { name: t('qxLh'), value: 'WD01' },
    { name: t('priE'), value: 'WD02' },
    { name: t('SLTG'), value: 'WD03' },
    { name: t('pjTd'), value: 'WD99' },
  ]

  // Withdrawl 버튼 활성화 여부, 사유를 선택해야 Withdrawl 버튼 활성화
  const disabledButton = useMemo(() => {
    return !reason
  }, [reason])

  const mutateWithdrawSeegene = useWithdrawSeegene()
  const mutateWithdrawNewCo = useWithdrawNewCo()

  const route = useRouter()

  const { alertClose } = useAlert()

  /**
   * handleWithdrawl: Withdrawl 버튼 클릭 시 동작하는 함수
   * - 회원 탈퇴 API 호출
   * - 성공 시 : 회원 관리 complete로 페이지 이동 후 toast popup 노출
   * - 실패 시 : 프로젝트 매니저인 경우 alert을 노출해야함.
   */
  const handleWithdrawl = () => {
    // seegene 회원 탈퇴
    if (path === 'seegene') {
      let param = {
        usrUid: uid,
        wdrlResnCd: reason,
      }

      // 해당 seegene 회원 탈퇴 API
      mutateWithdrawSeegene.mutate(param, {
        onSuccess: (res) => {
          if (res.data.statusCode === 202108) {
            isCancelWithdraw(true)
            alertClose()
            return
          }
          isWithdrawl(true)
          alertClose()
          route.replace(`/user/${path}`)
        },
      })
    }
    // newco 회원 탈퇴
    else {
      let param = {
        userUid: uid,
        withdrawlReasonCode: reason,
        withdrawlReason: reasonList.find((item) => reason === item.value).name,
      }

      // 해당 newco 회원 탈퇴 API
      mutateWithdrawNewCo.mutate(param, {
        onSuccess: (res) => {
          if (res.data.statusCode === 202108) {
            isCancelWithdraw(true)
            alertClose()
            return
          }
          isWithdrawl(true)
          alertClose()
          route.replace(`/user/${path}`)
        },
      })
    }
  }

  return (
    <>
      <hr className="mt_30" />
      <DetailTable
        colgroup={
          <>
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
          </>
        }
      >
        <tr>
          <th>{t('RPFJ')}</th>
          <td>
            <SelectMui
              options={reasonList}
              placeholder="Please select reason."
              size="full"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setReason(event.target.value)}
            />
          </td>
        </tr>
      </DetailTable>
      <div className="align center mt_30">
        <ButtonMui size="xlarge" type="outlined" onClick={() => alertClose()}>
          {t('hgxO')}
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          type="contained"
          disabled={disabledButton || mutateWithdrawSeegene.isLoading || mutateWithdrawNewCo.isLoading}
          isLoading={mutateWithdrawSeegene.isLoading || mutateWithdrawNewCo.isLoading}
          onClick={() => handleWithdrawl()}
        >
          {t('DWII')}
        </ButtonMui>
      </div>
    </>
  )
}

export default WithdrawlReason
