//작업자 : 김병기

import { TextField, Autocomplete } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Checkbox from '@mui/material/Checkbox'
import { LabelChips, Icons } from '@ui/index'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

import styles from '@ui/styles/mui/_select.module.scss'

interface AutocompleteProps {
  /**
   *  데이터 리스트 [{label: string}]
   */
  option: { label: string; title: string }[]
  /**
   *  disabled: true/false
   */
  disabled?: boolean
}

export const AutocompleteChipsOptMui = ({ option, disabled }: AutocompleteProps) => {
  const classesAuto = {
    root: styles.select,
    inputRoot: styles.input_box,
    input: styles.input,
    popper: styles.option_wrapper,
    paper: styles.options,
  }

  return (
    <Autocomplete
      multiple
      classes={classesAuto}
      className={`${styles.select} ${styles.autocomplete} ${styles.chips} ${disabled ? styles.disabled : ''}`}
      options={option}
      disabled={disabled || false}
      getOptionLabel={(option) => option.label}
      popupIcon={null}
      clearIcon={null}
      disableCloseOnSelect
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <LabelChips key={index} size="small" text={option.title} svg={<Icons.XIcon width={12} height={10} fill="#354165" />} action={true} color="primary">
            {option.label}
          </LabelChips>
        ))
      }
      renderInput={(params) => <TextField {...params} />}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          <>{option.title} </>
          <>{option.label}</>
        </li>
      )}
    />
  )
}
