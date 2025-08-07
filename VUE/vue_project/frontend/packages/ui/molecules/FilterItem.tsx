import React from 'react'
import { InputGroup } from '@ui/components/form/InputGroup'
import { InputLabel } from '@ui/components/form/InputLabel'

interface FilterItemProps {
  children: React.ReactNode
  label?: string
  textcolor?: string
  required?: boolean
  labelChildren?: React.ReactNode
}

export const FilterItem = ({ children, label, ...others }: FilterItemProps) => {
  const { textcolor, required, labelChildren } = others
  return (
    <div className="item">
      <InputGroup align="inline">
        <InputLabel labelText={label} textcolor={textcolor || 'light'} required={required} labelChildren={labelChildren} />
        {children}
      </InputGroup>
    </div>
  )
}

export default FilterItem
