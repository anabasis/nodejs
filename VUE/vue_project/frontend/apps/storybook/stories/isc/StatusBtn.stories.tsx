// 작업자 : 최유희
import React from 'react'
import type { Meta } from '@storybook/react'
import { StatusBtn } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Insilico/Buttons/StatusBtn',
  component: StatusBtn,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'onClick' },
    status: {
      control: {
        type: 'radio',
      },
      options: ['Ready', 'Running', 'Stopped', 'Copying', 'Done', 'Fail', 'Error', 'Waiting', 'Onhold'],
    },
    onBullet: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
}

export default meta
// type Story = StoryObj<typeof meta>

export const Default = (args) => <StatusBtn status="Ready" {...args} />
export const Ready = () => <StatusBtn status="Ready" />
export const Running = () => <StatusBtn status="Running" />
export const Stopped = () => <StatusBtn status="Stopped" />
export const Copying = () => <StatusBtn status="Copying" />
export const Done = () => <StatusBtn status="Done" />
export const Fail = () => <StatusBtn status="Fail" />
export const Error = () => <StatusBtn status="Error" />
export const Waiting = () => <StatusBtn status="Waiting" />
export const OnHold = () => <StatusBtn status="Onhold" />
