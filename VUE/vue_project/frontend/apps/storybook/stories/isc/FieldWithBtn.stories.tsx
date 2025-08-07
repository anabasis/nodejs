// 작업자 : 최유희
import React from 'react'
import type { Meta } from '@storybook/react'
import { FieldWithBtn } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Insilico/Buttons/FieldWithBtn',
  component: FieldWithBtn,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'onClick' },

    disabled: {
      control: {
        type: 'boolean',
      },
    },
    onBullet: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
    value: {
      control: {
        type: 'text',
      },
    },
  },
}

export default meta
// type Story = StoryObj<typeof meta>

export const Default = (args) => <FieldWithBtn {...args} buttonText="Host Setting" />

export const NoData = () => <FieldWithBtn buttonText="Host Setting" onBullet={true} value="" disabled={false} />

export const SelectedValue = () => <FieldWithBtn buttonText="Host Setting" value="Host : Human + Unknown" onBullet={false} />

export const EditBullet = () => <FieldWithBtn buttonText="Host Setting" value="Host : Human + Unknown" onBullet={true} disabled={false} />
