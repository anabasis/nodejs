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
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { getYear, getMonth } from 'date-fns'
import DatePicker, { registerLocale } from 'react-datepicker'
import enUS from 'date-fns/locale/en-US'
import { Icons } from '@ui/components/Icons'
import { range } from 'lodash-es'
import { changeTimeServer } from 'library/util/time'
import { useTranslation } from 'library/i18n/client'

registerLocale('enUS', enUS)

type DatePickerType = {
  onChangePickerDate: ({
    startDate,
    endDate,
    displayStartDate,
    displayEndDate,
  }: {
    startDate: string
    endDate: string
    displayStartDate?: string
    displayEndDate?: string
  }) => void
  defaultDate?: { startDate: string; endDate: string }
  disabled?: boolean
  width?: 'full' | 'large'
  placeholderText?: string
  isEditMode?: boolean
}

export const DateRangePicker = ({ onChangePickerDate, defaultDate, disabled, width, placeholderText, isEditMode = false }: DatePickerType) => {
  const isDefaultDate = defaultDate?.startDate && defaultDate?.endDate
  const [openDate, setOpenDate] = useState(false)
  const [startDate, setStartDate] = useState<Date | null>((isDefaultDate && new Date(defaultDate.startDate)) || null)
  const [endDate, setEndDate] = useState<Date | null>((isDefaultDate && new Date(defaultDate.endDate)) || null)
  const [currentDate, setCurrentDate] = useState<Date[] | null>(null)
  const { t } = useTranslation('platform')

  const years = range(getYear(new Date()) - 30, getYear(new Date()) + 31, 1) // 수정
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const calendar = useRef<DatePicker>(null)

  const openDatePicker = () => {
    calendar.current && calendar.current.setOpen(true)
    setOpenDate(true)
  }

  const resetInitDate = useCallback(() => {
    setStartDate(null)
    setEndDate(null)
  }, [])

  const formatToServerTime = (date: Date, isStartDate = true) => {
    const formatString = isStartDate ? '00:00:00' : '23:59:59'
    const type = isEditMode ? 'yyyy-MM-dd 00:00:00' : 'yyyy-MM-dd HH:mm:ss'

    return isEditMode
      ? format(date, type)
      : changeTimeServer({
          time: format(date, `yyyy-MM-dd ${formatString}`),
          type,
        })
  }

  const clickOutDefault = () => {
    if (!currentDate) {
      setOpenDate(false)
      setStartDate(null)
      setEndDate(null)
      return
    }
    const [start, end] = currentDate
    if (!startDate || !endDate) return
    setStartDate(start)
    setEndDate(end)

    onChangePickerDate({
      startDate: formatToServerTime(start, true),
      endDate: formatToServerTime(end, false),
      displayStartDate: startDate ? format(start, 'yyyy-MM-dd') : '',
      displayEndDate: endDate ? format(end, 'yyyy-MM-dd') : '',
    })

    setOpenDate(false)
  }

  const closeDatePicker = () => {
    if (!startDate || !endDate) return
    onChangePickerDate({
      displayStartDate: format(startDate, 'yyyy-MM-dd'),
      displayEndDate: format(endDate, 'yyyy-MM-dd'),
      startDate: formatToServerTime(startDate, true),
      endDate: formatToServerTime(endDate, false),
    })

    if (startDate && endDate) {
      setCurrentDate([startDate, endDate])
    }

    calendar.current && calendar.current.setOpen(false)
    setOpenDate(false)
  }

  const onChange = (date: Date[]) => {
    const [start, end] = date

    setStartDate(start)
    setEndDate(end)
  }

  const inputClickOut = () => {
    if (openDate) {
      clickOutDefault()
      calendar?.current?.setOpen(false)
    }
  }

  useEffect(() => {
    if (!defaultDate?.startDate || !defaultDate?.endDate) {
      resetInitDate()
    } else {
      setStartDate(new Date(defaultDate?.startDate))
      setEndDate(new Date(defaultDate?.endDate))
      isDefaultDate && setCurrentDate([new Date(defaultDate.startDate), new Date(defaultDate.endDate)])
    }
  }, [defaultDate, resetInitDate])

  const CustomInput = (props: React.HTMLProps<HTMLInputElement>, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div
        onClick={() => {
          setOpenDate(!openDate)
        }}
      >
        <div
          className={`${'date_picker_wrap'} ${width ? width : ''} ${openDate ? 'open' : ''} ${endDate ? 'dateuse' : ''}  ${disabled ? 'disabled' : ''} `}
          onClick={inputClickOut}
        >
          <input readOnly ref={ref} {...props} />
        </div>
      </div>
    )
  }

  return (
    <DatePicker
      className="date_picker"
      renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
        <div className="date_picker_header">
          <div className="date_picker_header_left">
            <select className="select" value={getYear(date)} onChange={({ target: { value } }) => changeYear(value as any)}>
              {years?.map((option: any) => (
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
              {months?.map((option) => (
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
      startDate={startDate}
      endDate={endDate}
      shouldCloseOnSelect={false}
      onInputClick={() => openDatePicker()}
      selected={startDate}
      dateFormat={'yyyy-MM-dd'}
      placeholderText={placeholderText || t('SXKe')}
      locale={enUS}
      onClickOutside={clickOutDefault}
      selectsRange
      customInput={React.createElement(forwardRef(CustomInput))}
      // excludeDateIntervals={bookedData}
      onChange={(date: any) => onChange(date)}
      disabled={disabled}
    >
      <div className="button-container">
        <button className={endDate ? 'btn_ctrl active' : 'btn_ctrl btn_ctrl-confirm'} disabled={!endDate} onClick={closeDatePicker}>
          Date Selected
        </button>
      </div>
    </DatePicker>
  )
}

export default DateRangePicker
