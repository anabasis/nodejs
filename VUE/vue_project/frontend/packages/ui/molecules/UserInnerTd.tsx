import { AvatarMui, Badge, EllipsisTypo } from '@ui/index'
import InnerTd from '@ui/molecules/InnerTd'

interface UserInnerTdProps {
  name: string
  src?: string
  guest?: boolean
  required?: boolean
  disabled?: boolean
}

export default function UserInnerTd({ name, src, guest, required, disabled }: UserInnerTdProps) {
  return (
    <InnerTd>
      <AvatarMui type="circular" data={[{ src, alt: name }]} disabled={disabled} />
      <EllipsisTypo className="pl_6">
        {name}
        {required && <span className="required"></span>}
      </EllipsisTypo>
      {guest && <Badge>Guest</Badge>}
    </InnerTd>
  )
}
