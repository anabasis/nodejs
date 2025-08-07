import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { MultiSelectMui } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Select/Multiple Select',
  component: MultiSelectMui,
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelectMui>

const data = [
  { name: 'test1', value: '01' },
  { name: 'test2', value: '02' },
]

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => <MultiSelectMui options={data} placeholder="다중선택" />
export const Disabled = () => <MultiSelectMui disabled />
