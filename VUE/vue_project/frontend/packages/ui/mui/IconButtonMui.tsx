import { IconButton } from '@mui/material'

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

export const IconButtonMui = ({ children, onClick }: ButtonProps) => {
  return <IconButton onClick={onClick}>{children}</IconButton>
}
