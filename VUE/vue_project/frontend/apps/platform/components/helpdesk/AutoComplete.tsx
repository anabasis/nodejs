//작업자 : 김병기

import { TextField, Autocomplete, Chip } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'
import styles from 'ui/styles/mui/_select.module.scss'
import { Icons } from 'ui/components'
// import DeleteIcon from '@mui/icons-material/Delete'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface AutocompleteProps {
  /**
   *  데이터 리스트 [{label: string}]
   */
  option: { label: string; title: string }[]
  /**
   *  disabled: true/false
   */

  chagneAutoData?: (data: any) => void
  disabled?: boolean
}
const AutoComplete = ({ option, disabled, chagneAutoData }: AutocompleteProps) => {
  const [userId, setUserId] = useState<string[]>([])
  const [optionData, setOptionData] = useState([...option])
  const [test, setTest] = useState([...option])

  const classesAuto = {
    root: styles.select,
    inputRoot: styles.input_box,
    input: styles.input,
    popper: styles.option_wrapper,
    paper: styles.options,
  }

  return (
    <>
      {test?.length > 0 && (
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.label === value.label}
          id="tags-outlined"
          multiple
          disableCloseOnSelect
          value={option.filter((el) => userId.includes(el.label))}
          onChange={(event: any, newValue) => {
            setUserId(newValue.map((el) => el.label))
            chagneAutoData && chagneAutoData(newValue)
          }}
          classes={classesAuto}
          className={`${styles.select} ${styles.autocomplete} ${styles.chips} ${disabled ? styles.disabled : ''}`}
          options={test}
          disabled={disabled || false}
          getOptionLabel={(option) => option.title}
          popupIcon={null}
          clearIcon={null}
          renderTags={(tagValue: any, getTagProps) =>
            tagValue.map((option: any, index: any) => (
              <Chip
                deleteIcon={
                  <i>
                    <Icons.XIcon width={12} height={10} fill="#354165" />
                  </i>
                }
                label={option.label}
                {...getTagProps({ index })}
                key={index}
                color="primary"
              />
            ))
          }
          renderInput={(params) => <TextField {...params} />}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.label}>
              <Checkbox key={option.label} icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.title}
              {option.label}
            </li>
          )}
        />
      )}
    </>
  )
}

export default AutoComplete
