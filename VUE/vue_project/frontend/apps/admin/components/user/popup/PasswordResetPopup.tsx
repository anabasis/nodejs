import { ButtonMui } from 'ui'
import { useAlert } from 'library'
import { Dispatch, SetStateAction } from 'react'
import { useUserPasswordReset } from '@store/server/useNewCoUserQuery'
import { useTranslation } from 'library/i18n/client'

interface PasswordResetPopupProps {
  uid: string
  isPasswordReset: Dispatch<SetStateAction<boolean>>
}

const PasswordResetPopup = (props: PasswordResetPopupProps) => {
  const { uid, isPasswordReset } = props
  const { t } = useTranslation('platform')
  const { alertClose } = useAlert()

  const mutateUserPasswordReset = useUserPasswordReset()

  /**
   * handlePasswordReset: password reset 완료 버튼을 클릭하였을 때 동작하는 함수
   * - 비밀번호 변경 API 호출
   * - 성공 시 토스트 팝업 노출 및 alert close
   */
  const handlePasswordReset = () => {
    mutateUserPasswordReset.mutate(uid, {
      onSuccess: () => {
        isPasswordReset(true)
        alertClose()
      },
    })
  }

  return (
    <div className="align center mt_30">
      <ButtonMui size="xlarge" type="outlined" onClick={() => alertClose()}>
        {t('hgxO')}
      </ButtonMui>
      <ButtonMui size="xlarge" type="contained" isLoading={mutateUserPasswordReset.isLoading} onClick={() => handlePasswordReset()}>
        Reset
      </ButtonMui>
    </div>
  )
}

export default PasswordResetPopup
