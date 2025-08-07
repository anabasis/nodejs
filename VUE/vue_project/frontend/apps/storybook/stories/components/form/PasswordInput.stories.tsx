// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { PasswordInput, InputGroup, InputLabel, InputDec } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/Input/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordInput>

export default meta

export const Default = () => (
  <div>
    <PasswordInput id="iptDefault" placeholder="input here.." />
  </div>
)
