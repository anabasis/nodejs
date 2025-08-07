import { AlertType } from 'library/hook/useAlert'

export interface PopupAction {
  open?: ({ title, content, textTitle, maxWidth }: AlertType) => void
  close?: () => void
  setWithdrawalFlag?: (flag: boolean) => void
}
