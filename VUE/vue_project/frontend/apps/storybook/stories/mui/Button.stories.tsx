import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ButtonMui } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Buttons/DefaultButton',
  component: ButtonMui,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'onClick' },
    type: {
      control: {
        type: 'select',
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'gray', 'error', 'black'],
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    onBullet: {
      control: {
        type: 'boolean',
      },
      options: [true, false],
    },
  },
} satisfies Meta<typeof ButtonMui>

export default meta
// type Story = StoryObj<typeof meta>

export const Small = (args) => (
  <ButtonMui size="small" {...args}>
    Button
  </ButtonMui>
)
export const Medium = () => <ButtonMui size="medium">Button</ButtonMui>
export const Large = () => <ButtonMui size="large">Button</ButtonMui>
export const ExtraLarge = () => <ButtonMui size="xlarge">Button</ButtonMui>
export const Full = () => <ButtonMui size="full">Button</ButtonMui>
export const Hero = () => <ButtonMui size="hero">Button</ButtonMui>

export const iscOnBullet = () => (
  <ButtonMui size="medium" onBullet>
    Button
  </ButtonMui>
)

export const Loading = () => (
  <ButtonMui size="medium" isLoading={true}>
    Button
  </ButtonMui>
)
