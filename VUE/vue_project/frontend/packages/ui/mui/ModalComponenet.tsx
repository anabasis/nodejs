// 작업자 : 김병기(공통 수정 : 최유희)
import { IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/mui/_popup.module.scss'
import { useModal, ModalType } from 'library/hook/useModal'

export const ModalComponenet = () => {
  const { modalClose, modalDataState } = useModal()

  // const handleClose = (modal: ModalType) => (modal.onClose ? modal.onClose(modal) : modalClose(modal?.deleteKey, modal?.isAllClose))

  return (
    <>
      {modalDataState &&
        modalDataState.map((modal: ModalType, index: number) => (
          <Dialog
            key={index}
            classes={{ paper: `${styles.modal_box}` }}
            className={`${styles.modal} ${
              styles[
                // 사이즈 추가
                modal.maxWidth === 'xs'
                  ? 'xs'
                  : modal.maxWidth === 's'
                  ? 'sm'
                  : modal.maxWidth === 'm'
                  ? 'md'
                  : modal.maxWidth === 'l'
                  ? 'lg'
                  : modal.maxWidth === 'xl'
                  ? 'xl'
                  : modal.maxWidth === 'hero'
                  ? 'hero'
                  : ''
              ]
            }`}
            fullWidth
            open={modal.isOpen || false}
            onClose={() => modalClose(modal?.deleteKey, modal?.isAllClose)}
          >
            <IconButton className={styles.modal_close} aria-label="close" onClick={() => modalClose(modal?.deleteKey, modal?.isAllClose)}>
              <Icons.CloseIcon width={24} height={24} fill="#C6CDDA" />
            </IconButton>
            <DialogTitle className={`${styles[modal.linetitle ? 'line' : '']}`}>
              {modal.isPrevButton && (
                <IconButton className={styles.modal_back} onClick={() => (modal.onPrev ? modal.onPrev() : modalClose(modal?.deleteKey, modal?.isAllClose))}>
                  <Icons.AngleIcon width={24} height={24} fill="#1A1F23" strokeWidth={1.5} />
                </IconButton>
              )}
              {modal.title}
              {modal.textTitle && <p className={styles.text_title}>{modal.textTitle}</p>}
            </DialogTitle>
            <DialogContent className={`${styles['modal_cont']} ${styles[modal.preview ? 'preview' : '']}`}>{modal.content}</DialogContent>
          </Dialog>
        ))}
    </>
  )
}
