// 작업자 : 김병기

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ContextButton } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Buttons/ContextButton',
  component: ContextButton,
  tags: ['autodocs'],
} satisfies Meta<typeof ContextButton>

const options = [
  { name: 'Context Menu 01', onClick: () => {} },
  { name: 'Context Menu 02', onClick: () => {} },
  { name: 'Context Menu 03', onClick: () => {} },
  { name: 'Context Menu 04', onClick: () => {} },
  { name: 'Context Menu 05', onClick: () => {} },
]

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => <ContextButton options={options}></ContextButton>
export const Rotate = () => <ContextButton options={options} rotate></ContextButton>
