//작업자 김수연

import { Select, MenuItem, SelectChangeEvent } from '@mui/material'
import styles from '@ui/styles/mui/_select.module.scss'

import { StatusLabel } from '@ui/components/'

type OptionType = {
  name: string
  value: string
  status?: string
  disabled?: boolean
  hidden?: boolean
  sortNum?: number
  subName?: string
  key?: string
}

export type SelectChangeEventType = SelectChangeEvent

export type onSelectArgType = {
  type?: string
  options: OptionType[]
  nameKey?: string
  valueKey?: string
  /**
   * disabled: true/false
   */
  disabled?: boolean
  /**
   * size: 'xsmall' | 'small' | 'medium' | 'large'
   * default: 'medium'
   * */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'full' | 'auto'

  /**
   * color : isc input 상태에 따른 컬러 클래스
   **/
  color?: string

  /*
   * uiType : 커스텀 UI 스타일
   */
  uiType?: 'no_line' | 'multi' | 'first' | 'last' | 'pure_select' | undefined

  /*
   * className : 글로벌 클래스만 받습니다.
   */

  className?: string

  /*
   * optionType : 옵션 타입 정의
   */

  optionType?: 'default' | 'group' | 'label'

  style?: string
  value?: any
  label?: string
  placeholder?: string
  name?: string
  defaultValue?: string
}

export type SelectProps = onSelectArgType & {
  onChange?: (event: SelectChangeEvent, others?: onSelectArgType) => void
}

export const SelectMui = ({ onChange, ...others }: SelectProps) => {
  const { disabled, options, size, color, value, placeholder, uiType, optionType = 'default', name, className, defaultValue } = others

  const renderValue = placeholder
    ? (selected: string) => {
        if (placeholder) {
          if (!selected) {
            return <em>{placeholder}</em>
          }
          const result = options?.find((item) => item.value === selected)
          return options && result ? result.name : undefined
        }
        return undefined
      }
    : undefined

  return (
    <Select
      onChange={(event) => onChange && onChange(event, others)}
      defaultValue={defaultValue || ''}
      value={value}
      name={name}
      disabled={disabled || false}
      className={`${styles.select} ${disabled ? styles.disabled : ''} ${size ? styles[size] : ''} ${color ? styles[color] : ''} ${
        uiType ? styles[uiType] : ''
      } ${className} select`}
      MenuProps={{
        //12_27 수정 :: 팝오버 위치변경
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        PopoverClasses: { root: `${styles.option_wrapper} option_wrapper` },
        MenuListProps: { classes: { root: styles.options } },
      }}
      inputProps={{
        styles: {
          icon: styles.icon,
        },
      }}
      renderValue={renderValue}
      IconComponent={() => null}
      displayEmpty
    >
      {optionType === 'default' &&
        options &&
        options.map((item, index) => (
          <MenuItem value={item.value} className={`${styles.option} option ${item?.hidden ? 'hidden' : ''}`} key={item.value + index} disabled={item.disabled}>
            {item.name}
            {item.subName && <span className="ml_3">{item.subName}</span>}
          </MenuItem>
        ))}
      {optionType === 'label' &&
        options &&
        options.map((item, index) => (
          <MenuItem value={item.value} className={`${styles.option} option`} key={item.value + index}>
            <StatusLabel status={`${item.status}`} type="circle">
              {item.name}
            </StatusLabel>
          </MenuItem>
        ))}

      {/* group */}
      {optionType === 'group' &&
        options &&
        options.map((item, index) =>
          item.key && item.key === 'group_title' ? (
            <MenuItem key={`${item.name}_${index}`} className={styles.group_name} disabled={true}>
              {item.name}
            </MenuItem>
          ) : item.key === 'hr' ? (
            <MenuItem key={`${item.name}_${index}`} className={styles.group_name} disabled={true}>
              <hr />
            </MenuItem>
          ) : (
            <MenuItem key={`${item.name}_${index}`} className={`${styles.option} option`} value={item.value}>
              <p className="">{item.name}</p>
            </MenuItem>
          )
        )}

      {options?.length === 0 && (
        <MenuItem value="" className={`${styles.option} option ${styles.disabled}`} disabled={true}>
          No item to choose.
        </MenuItem>
      )}
    </Select>
  )
}
