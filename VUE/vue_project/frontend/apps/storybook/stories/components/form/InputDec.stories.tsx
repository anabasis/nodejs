// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { InputDec } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/Input/InputDec',
  component: InputDec,
  tags: ['autodocs'],
} satisfies Meta<typeof InputDec>

export default meta

export const Default = () => (
  <div>
    <InputDec msg="힌트 메세지가 들어갑니다" />
  </div>
)

export const SucesstMsg = () => (
  <div>
    <InputDec msg="완료가 됐습니다요" success />
  </div>
)

export const ErrorMsg = () => (
  <div>
    <InputDec msg="에러가 났다요" error />
  </div>
)
