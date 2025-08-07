// 작업자 : 김병기

// import { useState } from 'react'
import * as React from 'react'
import { Icons } from '@ui/components/Icons'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import styles from '@ui/styles/mui/_popup.module.scss'
import { useToastPopup } from 'library/hook/useToastPopup'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ToastPopup = () => {
  const { toastClose, toastDataState } = useToastPopup()
  const { isOpen, autoHideDuration = 3000, content, icon } = toastDataState

  return (
    <>
      {isOpen && (
        <Snackbar
          className={[styles['toast']].join(' ')}
          classes={{ root: styles['toast_position'] }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isOpen}
          autoHideDuration={autoHideDuration}
          onClose={() => toastClose()}
        >
          <Alert
            iconMapping={{
              success: <Icons.ToastSuccessIcon width={32} height={32} fill="#00B29B" />,
              warning: <Icons.ToastWarningIcon width={32} height={32} fill="#FF5934" />,
              error: <Icons.ToastErrorIcon width={32} height={32} fill="#E1315A" />,
            }}
            classes={{ message: styles['toast_message'], icon: styles['toast_icon'] }}
            className={[styles['toast_alert'], styles[icon === 'warning' ? 'warning' : ''], styles[icon === 'error' ? 'error' : '']].join(' ')}
            severity={icon}
          >
            {content}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}
