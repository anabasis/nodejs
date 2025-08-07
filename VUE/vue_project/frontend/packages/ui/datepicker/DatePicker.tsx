/*
    author: 김찬영
    description: 공통 Date picker

    1. Create : 사용하고자 하는 곳에서 DateRangePicker 호출

    2. Read : 초기값은 null로 설정하여 placeholder가 보이게 설정하였다.
    3. Update : 받는 Props는 onChangePickerDate함수이다
    onChangePickerDate함수로 사용하는 컴포넌트에 useState의 값을 업데이트 시켜준다.
    4. Delete : clickOutDefault 함수는 선택되지않았는데 모달창 밖에 범위를 클릭했을때 실행하여
    초기화시켜주는 함수이다.

*/
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { getYear, getMonth } from 'date-fns'
import * as reactDatePicker from 'react-datepicker'
import enUS from 'date-fns/locale/en-US'
import { Icons } from '@ui/components/Icons'
import { changeTimeServer } from 'library/util/time'

reactDatePicker.registerLocale('enUS', enUS)
import { range } from 'lodash-es'

type DatePickerType = {
  onChangePickerDate?: (date: string) => void
  defaultDate?: string | null
  disabled?: boolean
  width?: 'full' | 'large'
  placeholderText?: string
}

const DatePicker = ({ onChangePickerDate, defaultDate = null, disabled, width, placeholderText = 'Select date' }: DatePickerType) => {
  const [openDate, setOpenDate] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate ? new Date(defaultDate) : null)
  const [tempDate, setTempDate] = useState<Date | null>(null)
  const years = range(getYear(new Date()) - 30, getYear(new Date()) + 31, 1) // 수정
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const calendar = useRef<reactDatePicker.default>(null)

  useEffect(() => {
    setSelectedDate(defaultDate ? new Date(defaultDate) : null)
  }, [defaultDate])

  const openDatePicker = () => {
    calendar.current && calendar.current.setOpen(true)
    setOpenDate(true)
  }

  const closeDatePicker = () => {
    if (onChangePickerDate) {
      onChangePickerDate(selectedDate ? changeTimeServer({ time: selectedDate, type: 'yyyy-MM-dd 23:59:59' }) : '')
    }
    if (selectedDate) {
      setTempDate(selectedDate)
    }
    calendar.current && calendar.current.setOpen(false)
    setOpenDate(false)
  }

  const clickOutDefault = () => {
    if (!tempDate) {
      setSelectedDate(defaultDate ? new Date(defaultDate) : tempDate)
      setOpenDate(false)
      return
    }
    setSelectedDate(tempDate)
    onChangePickerDate && onChangePickerDate(tempDate ? changeTimeServer({ time: format(tempDate, 'yyyy-MM-dd 23:59:59') }) : '')
    setOpenDate(false)
  }

  const onChange = (date: Date) => {
    setSelectedDate(date)
  }

  const inputClickOut = () => {
    if (openDate) {
      clickOutDefault()
      calendar?.current?.setOpen(false)
    }
  }

  const CustomInput = (props: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div
        onClick={() => {
          setOpenDate(!openDate)
        }}
      >
        <div
          className={`${'date_picker_wrap'}  ${width ? width : ''} ${openDate ? 'open' : ''} ${selectedDate ? 'dateuse' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={inputClickOut}
        >
          <input readOnly ref={ref} {...props} />
        </div>
      </div>
    )
  }

  return (
    <reactDatePicker.default
      className="date_picker"
      renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
        <div className="date_picker_header">
          <div className="date_picker_header_left">
            <select className="select" value={getYear(date)} onChange={({ target: { value } }) => changeYear(value as any)}>
              {years.map((option: any) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="date_picker_header_right">
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <div style={{ transform: 'rotate(180deg)' }}>
                <Icons.AngleIcon width={24} height={24} fill="#657496" />
              </div>
            </button>

            <select className="select" value={months[getMonth(date)]} onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <Icons.AngleIcon width={24} height={24} fill="#657496" />
            </button>
          </div>
        </div>
      )}
      ref={calendar}
      shouldCloseOnSelect={false}
      onInputClick={() => openDatePicker()}
      selected={selectedDate}
      dateFormat={'yyyy-MM-dd'}
      placeholderText={placeholderText}
      locale={enUS}
      customInput={React.createElement(forwardRef(CustomInput))}
      onClickOutside={clickOutDefault}
      // excludeDateIntervals={bookedData}
      onChange={(date: any) => onChange(date)}
      disabled={disabled}
    >
      <div className="button-container">
        <button className={selectedDate ? 'btn_ctrl active' : 'btn_ctrl btn_ctrl-confirm'} disabled={!selectedDate} onClick={closeDatePicker}>
          Date Selected
        </button>
      </div>
    </reactDatePicker.default>
  )
}

export default DatePicker
