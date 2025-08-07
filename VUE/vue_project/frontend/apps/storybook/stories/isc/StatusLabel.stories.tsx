// 작업자 : 김병기

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { StatusLabel } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Insilico/Status/StatusLabel',
  component: StatusLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof StatusLabel>

export default meta
// type Story = StoryObj<typeof meta>

export const ISCChange = () => (
  <StatusLabel type="square" status="running">
    Change
  </StatusLabel>
)

export const ISCBlue100 = () => (
  <StatusLabel type="square" status="blue100">
    N &lt; 10
  </StatusLabel>
)

export const ISCBlue200 = () => (
  <StatusLabel type="square" status="blue200">
    Pause
  </StatusLabel>
)
export const ISCBlue300 = () => (
  <StatusLabel type="square" status="blue300">
    Pause
  </StatusLabel>
)
export const ISCBlue400 = () => (
  <StatusLabel type="square" status="blue400">
    Pause
  </StatusLabel>
)

export const ISCError = () => (
  <StatusLabel type="circle" status="error">
    Error
  </StatusLabel>
)

export const ISCBlack = () => (
  <StatusLabel type="circle" status="navy800">
    Error
  </StatusLabel>
)
