import { useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import styles from '@ui/styles/mui/_select.module.scss'

interface SelectProps {
  disabled?: boolean
  /**
   * size: 'small' | 'medium' | 'large'
   * default: 'medium'
   * */
  size?: 'small' | 'medium' | 'large' | 'full'
  /**
   * data : 옵션 리스트 데이터
   */
  options?: Array<{ [k: string]: string | number | boolean }>
  nameKey?: string
  valueKey?: string
  value?: string[]
  placeholder?: string
  className?: string
  onChange?: (event: SelectChangeEvent<string[]>) => void
  noItem?: string
}

export function MultiSelectMui({
  disabled,
  options,
  size,
  placeholder,
  className,
  nameKey = 'name',
  valueKey = 'value',
  value = [],
  onChange,
  noItem,
}: SelectProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    if (onChange) {
      onChange(event)
    }
  }

  return (
    <Select
      multiple
      value={value}
      onChange={handleChange}
      IconComponent={() => <></>}
      disabled={disabled}
      displayEmpty
      className={`${styles.select} ${disabled ? styles.disabled : ''} ${size ? styles[size] : ''} 
       
      } ${className} select`}
      MenuProps={{
        PopoverClasses: { root: `${styles.option_wrapper} option_wrapper` },
        MenuListProps: { classes: { root: styles.options } },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      }}
      input={<OutlinedInput label="Tag" />}
      renderValue={(selected: string[]) => {
        if (selected.length === 0 && placeholder) {
          return <em>{placeholder}</em>
        }

        return options
          ? options
              .filter((item) => selected.indexOf(`${item[valueKey]}`) > -1)
              .map((item) => item[nameKey])
              .join(', ') // 공백유지 필요
          : selected.join(', ') // 공백유지 필요
      }}
    >
      {options &&
        options.map((item) => (
          <MenuItem
            key={item[valueKey] as string}
            value={item[valueKey] as string}
            disabled={item['disabled'] as boolean | undefined}
            className={`${styles.option} option ${value.find((selectedItem) => item[valueKey] == selectedItem) !== undefined ? styles.selected : ''}`}
          >
            <i
              className={[styles['ico'], styles[value.find((selectedItem) => item[valueKey] == selectedItem) !== undefined ? 'ico_checked' : '']].join(' ')}
            ></i>
            <span>{`${item[nameKey]}`}</span>
          </MenuItem>
        ))}
      {options?.length === 0 && (
        <MenuItem className={`${styles.option} option`} disabled={true}>
          {noItem ? noItem : 'No item to choose.'}
        </MenuItem>
      )}
    </Select>
  )
}

export type { SelectChangeEvent }
