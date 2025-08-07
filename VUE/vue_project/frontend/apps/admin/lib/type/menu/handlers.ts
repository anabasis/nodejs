import { FileResType } from 'library/type/common'

export interface IBaisInfoStepHandler {
  handleNavigationLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleMenuDepthChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectBoxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleMenuNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleMenuURLChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleFileChange: (iconType: string, file: FileResType) => void
}
