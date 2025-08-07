import type { Meta } from '@storybook/react'

import DatePicker from 'ui/datepicker/DatePicker'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'components/Datepicker/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
// type Story = StoryObj<typeof meta>

const onChangePickerDate = (date: string) => {
  console.log(date)
}

export const Default = () => <DatePicker onChangePickerDate={onChangePickerDate} />
