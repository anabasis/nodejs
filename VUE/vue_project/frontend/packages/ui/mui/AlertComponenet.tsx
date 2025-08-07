// 작업자 : 김병기(공통 수정 : 최유희)

import { IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/mui/_popup.module.scss'
import { useAlert, AlertType } from 'library/hook/useAlert'

export const AlertComponenet = () => {
  const { alertDataState, alertClose } = useAlert()
  const { isOpen, maxWidth, content, title, icon, textTitle, isAllClose, isLogin, handleCloseIcon, isDimNotClose }: AlertType = alertDataState
  const iconObj = {
    success: <Icons.SuccessIcon width={50} height={50} fill="#00B29B" />,
    info: <Icons.InfoIcon width={50} height={50} fill="#ECBB3F" />,
    warning: <Icons.ErrorIcon width={50} height={50} fill="#E1315A" />,
  }
  return (
    <>
      {isOpen && (
        <Dialog
          classes={{ paper: styles.dialog_box }}
          className={`${styles.dialog} ${styles[maxWidth === 'xs' ? 'xs' : maxWidth === 's' ? 'sm' : maxWidth === 'm' ? 'md' : '']}`}
          fullWidth
          open={isOpen || false}
          onClose={() => {
            if (!isDimNotClose) alertClose(!!isAllClose)
          }}
        >
          {/* <IconButton className={[styles['dialog_close']].join(' ')} aria-label="close" onClick={() => alertClose(!!isAllClose)}>
            <Icons.CloseIcon width={24} height={24} fill="#C6CDDA" />
          </IconButton> */}

          <IconButton
            className={styles.dialog_close}
            aria-label="close"
            onClick={() => {
              // 로그인 알럿용 이벤트 추가
              if (isLogin) {
                if (title?.toString().startsWith('Approval was') || title?.toString().startsWith('Member') || title?.toString().startsWith('Service')) {
                  window.authKc.doLogout('/')
                } else if (title === 'Password change notification') {
                  return true
                } else {
                  window.authKc.doLogin('/')
                }
                // Handle click when isLogin is true
              } else if (!!handleCloseIcon) {
                handleCloseIcon()
              } else {
                alertClose(!!isAllClose)
              }
            }}
          >
            <Icons.CloseIcon width={24} height={24} fill="#C6CDDA" />
          </IconButton>

          {/* 현재 사용아이콘은 임시 아이콘 입니다. 디자인 가이드 규정에서 삭제 될수 있습니다. */}
          {icon && <div className={styles.dialog_icon}>{iconObj[icon]}</div>}

          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogContent className={styles.dialog_cont}>
            {/* hr 이 들어가는 경우가 있어서...p -> div로 변경 */}
            {textTitle && <div className={styles.text_title}>{textTitle}</div>}
            {content}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
