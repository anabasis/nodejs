// 작업자 : 김병기

import type { Meta } from '@storybook/react'

import DateRangePicker from 'ui/datepicker/DateRangePicker'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'components/Datepicker/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>

export default meta
// type Story = StoryObj<typeof meta>

const onChangePickerDate = (date: { startDate: string; endDate: string }) => {
  console.log(date)
}

export const Default = () => <DateRangePicker onChangePickerDate={onChangePickerDate} />
