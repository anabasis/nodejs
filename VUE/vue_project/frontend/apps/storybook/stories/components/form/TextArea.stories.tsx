// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TextArea } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/Input/TextArea',
  component: TextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>

export default meta

export const Default = () => (
  <div>
    <TextArea length={true} placeholder="플레이스 홀더"></TextArea>
  </div>
)

export const MaxLength = () => (
  <div>
    <TextArea maxLength={200} length={true} placeholder="플레이스 홀더"></TextArea>
  </div>
)
