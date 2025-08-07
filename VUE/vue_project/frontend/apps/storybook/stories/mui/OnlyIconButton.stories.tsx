import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ButtonMui, Icons } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Buttons/OnlyIconButton',
  component: ButtonMui,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'onClick' },
  },
} satisfies Meta<typeof ButtonMui>

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => {
  return (
    <ButtonMui type="outlined" size="xsmall" color="error" icon="DeleteIcon" iconStyle={{ width: 20, height: 20, fill: 'var(--error)' }}>
      검색
    </ButtonMui>
  )
}

export const Search = () => {
  return (
    <ButtonMui type="outlined" size="xsmall" color="gray" icon="SearchIcon" iconStyle={{ width: 20, height: 20 }}>
      검색
    </ButtonMui>
  )
}
