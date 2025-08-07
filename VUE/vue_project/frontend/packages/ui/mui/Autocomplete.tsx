import { TextField, Autocomplete } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Checkbox from '@mui/material/Checkbox'
import styles from '@ui/styles/mui/_select.module.scss'

interface AutocompleteProps {
  /**
   *  데이터 리스트 [{label: string}]
   */
  option: { label: string; title?: string; value?: string }[]

  placeholder?: string
  /**
   *  disabled: true/false
   */
  disabled?: boolean
  multiple?: boolean
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export const AutocompleteMui = ({ option, disabled, placeholder, multiple }: AutocompleteProps) => {
  const classesAuto = {
    root: styles.select,
    inputRoot: styles.input_box,
    input: styles.input,
    popper: styles.option_wrapper,
    paper: styles.options,
  }
  return (
    <Autocomplete
      classes={classesAuto}
      className={`${styles.select} ${styles.autocomplete} ${disabled ? styles.disabled : ''}`}
      options={option}
      popupIcon={null}
      clearIcon={null}
      disabled={disabled || false}
      multiple={multiple}
      renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      renderOption={(props, option, { selected }) =>
        multiple ? (
          <li {...props} className={styles.option} value={option.value} key={option.value}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
            <>{option.title && option.title} </>
            <>{option.label}</>
          </li>
        ) : (
          <li {...props} className={styles.option} value={option.value} key={option.value}>
            <>{option.title && option.title} </>
            <>{option.label}</>
          </li>
        )
      }
    />
  )
}
