import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { ButtonMui } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Buttons/IconButton',
  component: ButtonMui,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'onClick' },
  },
} satisfies Meta<typeof ButtonMui>

export default meta
// type Story = StoryObj<typeof meta>

export const Icon = () => (
  <ButtonMui size="xsmall" icon="ResetIcon">
    리셋
  </ButtonMui>
)
export const small = () => (
  <ButtonMui size="small" icon="PlusIcon">
    버튼
  </ButtonMui>
)
export const medium = () => (
  <ButtonMui size="medium" icon="PlusIcon">
    버튼
  </ButtonMui>
)
export const large = () => (
  <ButtonMui size="large" icon="FileUploadIcon">
    버튼
  </ButtonMui>
)
export const full = () => (
  <ButtonMui size="full" icon="PlusIcon">
    버튼
  </ButtonMui>
)
export const xlarge = () => (
  <ButtonMui size="xlarge" icon="EditIcon">
    버튼
  </ButtonMui>
)
export const hero = () => (
  <ButtonMui size="hero" icon="PlusIcon">
    버튼
  </ButtonMui>
)

export const Right = () => (
  <ButtonMui color="secondary" size="large" icon="PlusIcon" positions="right" iconStyle={{ fill: 'var(--blue400)' }}>
    버튼
  </ButtonMui>
)
