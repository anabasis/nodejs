import { ModalType, DeleteKeyType } from '../hook/useModal'

export type ModalContentProps = {
  onClose?: (deleteKey?: DeleteKeyType, isAllClose?: boolean) => void
  onOpen?: ({ ...modalState }: ModalType) => void
}
