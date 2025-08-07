import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { SelectMui } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Select/DefaultSelect',
  component: SelectMui,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
  },
} satisfies Meta<typeof SelectMui>

export default meta

// type Story = StoryObj<typeof meta>

const options = [
  { name: 'option1', value: 'option1' },
  { name: 'option2', value: 'option2' },
  { name: 'option3', value: 'option3' },
]

const options2 = [
  { key: 'Basic', name: 'normal', value: 'normal', status: 'normal' },
  { name: 'done', value: 'done', status: 'done' },
  { name: 'ongoing', value: 'ongoing', status: 'ongoing' },
  { name: 'pause', value: 'pause', status: 'pause' },
  { name: 'error', value: 'error', status: 'error' },
  { name: 'change', value: 'change', status: 'change' },
  { name: 'acc', value: 'acc', status: 'acc' },
  { name: 'delete', value: 'delete', status: 'delete' },
  { name: 'cancel', value: 'cancel', status: 'cancel' },
  { key: 'Status', name: 'ready', value: 'ready', status: 'ready' },
  { name: 'running', value: 'running', status: 'running' },
  { name: 'stopped', value: 'stopped', status: 'stopped' },
  { name: 'fail', value: 'fail', status: 'fail' },
  { name: 'copying', value: 'copying', status: 'copying' },
  { name: 'waiting', value: 'waiting', status: 'waiting' },
  { key: 'grayLabel', name: 'onhold', value: 'onhold', status: 'onhold' },
  { name: 'black', value: 'black', status: 'black' },
  { name: 'blue', value: 'blue', status: 'blue' },
  { name: 'blue200', value: 'blue200', status: 'blue200' },
  { name: 'blue300', value: 'blue300', status: 'blue300' },
  { name: 'blue400', value: 'blue400', status: 'blue400' },
]

export const Default = () => <SelectMui options={options} placeholder="옵션을 선택해주세요" onChange={() => {}} />
export const Disabled = () => <SelectMui disabled options={options} onChange={() => {}} />
export const small = () => <SelectMui size="small" options={options} onChange={() => {}} />
export const OptionTypeLabel = () => <SelectMui options={options2} optionType="label" onChange={() => {}} />
export const OptionTypeGroup = () => <SelectMui options={options2} optionType="group" onChange={() => {}} />
