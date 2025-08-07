import { useNotificationMutation } from '@store/server/useNotificationQuery'
import { useMenu } from 'library'
import { AlertType, useAlert } from 'library/hook/useAlert'
import { usePathname } from 'next/navigation'
import { ButtonMui } from 'ui'

const DeleteNotification = ({ notiId }) => {
  const { alertOpen, alertClose } = useAlert()
  const { deleteNotificationMutate } = useNotificationMutation()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const handleClickDeleteCode = async () => {
    deleteNotificationMutate({ notiId })
  }

  const alertState: AlertType = {
    icon: 'info',
    title: 'Are you sure to delete?',
    textTitle: `If you click the delete button, it cannot be recovered.`,
    content: (
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={() => handleClickDeleteCode()}>
          Delete
        </ButtonMui>
      </div>
    ),
  }
  return (
    <ButtonMui
      color="secondary"
      icon="DeleteIcon"
      onClick={() => {
        alertOpen(alertState)
      }}
      size="large"
      type="contained"
      disabled={getPathInfo(pathname).crtYn !== 'Y'}
    >
      Delete
    </ButtonMui>
  )
}
export default DeleteNotification
