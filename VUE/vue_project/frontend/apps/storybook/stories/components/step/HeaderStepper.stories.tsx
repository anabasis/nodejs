// 작업자 : 김병기

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { HeaderStepper } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'components/Step/HeaderStepper',
  component: HeaderStepper,
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderStepper>

const data = [
  { id: 1, title: 'Step title1 ddddddddddd', completed: true, active: false, txt: '' },
  { id: 2, title: 'Step title2', completed: false, active: true, txt: '내용이 들어갑니다욥2' },
  { id: 3, title: 'Step title3', completed: false, active: false, txt: '내용이 들어갑니다욥3' },
]

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => <HeaderStepper color="primary" data={data}></HeaderStepper>

export const secondary = () => <HeaderStepper color="secondary" data={data}></HeaderStepper>
