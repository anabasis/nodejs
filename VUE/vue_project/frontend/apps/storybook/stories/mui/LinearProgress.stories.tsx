// 작업자 : 김병기

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { LinearProgress } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Progress/LinearProgress',
  component: LinearProgress,
  tags: ['autodocs'],
} satisfies Meta<typeof LinearProgress>

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => <LinearProgress />
