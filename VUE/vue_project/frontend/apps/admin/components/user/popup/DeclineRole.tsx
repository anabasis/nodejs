import { ButtonMui } from 'ui'
import { useAlert } from 'library'
import { useQueryClient } from '@tanstack/react-query'
import { useApproveOrNotSeegeneAdminRole, useApproveOrNotSeegeneUserRole } from '@store/server/useSeegeneUserQuery'
import { Dispatch, SetStateAction } from 'react'
import { useDeclineNewCoRole } from '@store/server/useNewCoUserQuery'
import { useTranslation } from 'library/i18n/client'

/**
 * 역할 거절 팝업
 * - newco, seegene 공통인 부분
 */

interface DeclineRoleProps {
  level: string // seegene, newco 구별
  uid: string
  userRoleChange: string
  isRoleChangeDeclined: Dispatch<SetStateAction<boolean>>
  condition?: string // seegene인 경우, user role, admin role 구별
}

const DeclineRole = (props: DeclineRoleProps) => {
  const { level, uid, userRoleChange, isRoleChangeDeclined, condition } = props
  const { t } = useTranslation('platform')
  const { alertClose } = useAlert()

  const queryClient = useQueryClient()
  const mutateApproveOrNotUserRole = useApproveOrNotSeegeneUserRole()
  const mutateApproveOrNotAdminRole = useApproveOrNotSeegeneAdminRole()
  const mutateDeclineUserRole = useDeclineNewCoRole()

  /**
   * handleDecline: 역할 거절 alert에서 Decline 버튼 클릭 시 동작하는 함수
   * - 역할 거절 알림 제공
   * - 역할 거절 후 alert 닫기
   */
  const handleDecline = () => {
    if (level === 'newco') {
      let param = {
        userUid: uid,
        userRolNum: Number(userRoleChange),
      }
      mutateDeclineUserRole.mutate(param, {
        onSuccess: () => {
          isRoleChangeDeclined(true)
          queryClient.invalidateQueries(['newCoDetailData'])
          alertClose()
        },
      })
      return
    }

    if (condition === 'user') {
      let param = {
        usrUid: uid,
        aprvRslCd: 'RJT',
        usrRolId: userRoleChange,
      }
      mutateApproveOrNotUserRole.mutate(param, {
        onSuccess: () => {
          isRoleChangeDeclined(true)
          queryClient.invalidateQueries(['seegeneDetailData'])
          queryClient.invalidateQueries(['seegeneRoleChange'])
          alertClose()
        },
      })
    } else {
      let param = {
        usrUid: uid,
        aprvRslCd: 'RJT',
      }
      mutateApproveOrNotAdminRole.mutate(param, {
        onSuccess: () => {
          isRoleChangeDeclined(true)
          queryClient.invalidateQueries(['seegeneDetailData'])
          queryClient.invalidateQueries(['seegeneRoleChange'])
          alertClose()
        },
      })
    }
  }

  return (
    <div className="align center mt_30">
      <ButtonMui size="xlarge" type="outlined" onClick={() => alertClose()}>
        {t('hgxO')}
      </ButtonMui>
      <ButtonMui
        size="xlarge"
        type="contained"
        isLoading={mutateApproveOrNotUserRole.isLoading || mutateApproveOrNotAdminRole.isLoading}
        onClick={() => handleDecline()}
      >
        {t('guSK')}
      </ButtonMui>
    </div>
  )
}

export default DeclineRole
