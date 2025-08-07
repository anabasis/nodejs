import { TooltipHover } from 'ui/mui'
import { ReactNode } from 'react'
import { InputLabel } from 'ui/components'

interface IInputItem {
  labelText: string
  colSpan?: number
  children: ReactNode
  tooltipMessage?: string
  required?: boolean
}

export default function InputItem({ labelText, colSpan, children, tooltipMessage, required }: IInputItem) {
  return (
    <>
      <th>
        <InputLabel labelText={labelText} required={required}>
          {tooltipMessage ? <TooltipHover placements={'top-start'}>{tooltipMessage}</TooltipHover> : ''}
        </InputLabel>
      </th>
      <td colSpan={colSpan ? colSpan : 0}>{children}</td>
    </>
  )
}
