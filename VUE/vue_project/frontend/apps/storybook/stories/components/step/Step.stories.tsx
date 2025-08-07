// 작업자 : 김병기

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Steps } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'components/Step/Steps',
  component: Steps,
  tags: ['autodocs'],
} satisfies Meta<typeof Steps>

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => <Steps color="primary" index={1} title="Step title"></Steps>

export const primaryActive = () => <Steps color="primary" index={1} title="Step title" current={1}></Steps>

export const PrimaryCompleted = () => <Steps color="primary" index={1} title="Step title" current={2}></Steps>

export const SecondaryActive = () => <Steps color="secondary" index={1} title="Step title" current={1}></Steps>

export const AecondaryCompleted = () => <Steps color="secondary" index={1} title="Step title" current={2}></Steps>
