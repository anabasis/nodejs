import { useState, useEffect, ChangeEvent, useRef, FocusEvent } from 'react'
import { Icons } from '@ui/components/Icons'
import styles from '@ui/styles/components/form/_autocomplete.module.scss'

interface AutoCompleteProps {
  placeholder?: string

  options: { label: string; value: string }[]
  selected: { label: string; value: string }[]
  onChangeSelected: (selected: { label: string; value: string }[]) => void // 부모 컴포넌트에서 selected를 업데이트하기 위한 함수
  onBlur?: () => void
  //개발완료후 붙일 props
  //   disabled?: boolean
  size?: 'sm' | 'md' | 'lg' | 'full'
  //   type?: 'text' | 'tag'
  reset?: boolean
  isISC?: boolean
}

export const AutoComplete = ({ options, selected, size, placeholder, onChangeSelected, onBlur, reset, isISC }: AutoCompleteProps) => {
  const [inputValue, setInputValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<{ label: string; value: string }[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [displayOptions, setDisplayOptions] = useState(false)
  const searchInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setFilteredOptions(options)

    // NOTE: options를 동적으로 사용하는 경우 재조회 / 초기화 시 selected항목과 inputvalue 초기화 추가
    if (!options.length) {
      setInputValue('')
      setSelectedOption(null)
    }
  }, [options])

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(value.toLowerCase()))
    setFilteredOptions(filteredOptions)
    setDisplayOptions(true)
  }

  const handleFocus = () => {
    setDisplayOptions(true)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setDisplayOptions(false)
    }, 200)
  }

  const onSelectOption = (index: number) => {
    setSelectedOption(index)
    const selectedOption = filteredOptions[index]
    setInputValue(selectedOption.label)
    setFilteredOptions([])
    setDisplayOptions(false)
  }

  const handleSelectedChange = (
    newSelected: {
      label: string
      value: string
    }[]
  ) => {
    onChangeSelected(newSelected)
  }

  useEffect(() => {
    if (reset && selected[0].label !== '' && inputValue !== '' && selected[0].label !== inputValue) {
      setInputValue('')
      onChangeSelected([{ label: '', value: '' }])
      const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(''.toLowerCase()))
      setFilteredOptions(filteredOptions)
      onBlur ? onBlur() : () => {}
    }
  }, [inputValue])

  // NOTE: Arrow 클릭 시 토글 추가 (state컨트롤 x, input focus, blur로 컨트롤)
  const handleToggleBtn = () => searchInput.current && searchInput.current[displayOptions ? 'blur' : 'focus']()

  return (
    <div className={`${styles.autocomplete} ${size ? styles[size] : ''}`}>
      <div className={styles.renderer} onFocus={handleFocus} onBlur={handleBlur}>
        <input type="text" ref={searchInput} onChange={handleChange} value={inputValue} onFocus={handleFocus} onBlur={handleBlur} placeholder={placeholder} />
        {/* NOTE: Arrow 클릭 시 토글 추가 */}
        <span className={styles.arrow} onClick={handleToggleBtn}>
          <i className={`${styles.ico_angle} ico_angle ${displayOptions ? 'up' : 'down'}`}>
            <Icons.AngleIcon width={16} height={16} fill={displayOptions ? 'var(--blue400)' : 'var(--navy400)'} />
          </i>
        </span>
      </div>
      <OptionsList
        selectedOption={selectedOption}
        onSelectOption={onSelectOption}
        displayOptions={displayOptions}
        options={filteredOptions}
        onChangeSelected={handleSelectedChange}
        selected={selected}
        isISC={isISC}
      />
    </div>
  )
}

interface OptionsListProps {
  options: { label: string; value: string }[]
  selectedOption: number | null
  onSelectOption: (index: number) => void
  displayOptions: boolean
  onChangeSelected: (newSelected: { label: string; value: string }[]) => void
  selected: { label: string; value: string }[]
  isISC?: boolean
}

const OptionsList = ({ options, onSelectOption, displayOptions, selectedOption, onChangeSelected, selected, isISC }: OptionsListProps) => {
  if (!displayOptions) {
    return null // Hide the options list if inputValue is empty or displayOptions is false
  }
  if (options.length === 0) {
    return <div className={`${styles.options} caption${isISC ? ' ' + styles.optionISC : ''}`}>No item to choose.</div>
  }
  return (
    <ul className={`${styles.options}${isISC ? ' ' + styles.optionISC : ''}`}>
      {options &&
        options.map((option, index) => {
          const isSelected = selectedOption === index
          const classname = isSelected ? styles.selected : ''

          const handleClick = () => {
            onSelectOption(index)
            const newSelected = [option]
            onChangeSelected(newSelected)
          }

          return (
            <li key={option.value + index} className={classname} onClick={handleClick}>
              {option.label}
            </li>
          )
        })}
    </ul>
  )
}
