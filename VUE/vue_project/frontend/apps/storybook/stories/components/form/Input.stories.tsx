// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { BaseInput, InputGroup, InputLabel, InputDec } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/Input/BaseInput',
  component: BaseInput,
  tags: ['autodocs'],
} satisfies Meta<typeof BaseInput>

export default meta

export const Default = () => (
  <div>
    <BaseInput onChange={() => console.log('h')} id="iptDefault" placeholder="Input here..." />
  </div>
)

export const Error = () => (
  <div>
    <BaseInput onChange={() => console.log('h')} id="iptDefault" placeholder="Input here..." error />
  </div>
)

export const LabelDefault = () => (
  <div>
    <InputGroup>
      <InputLabel labelText="Label Title" id="ipt01" />
      <BaseInput onChange={() => console.log('h')} id="iptDefault" placeholder="Input here..." />
    </InputGroup>
  </div>
)

export const LabelDefaultRequired = () => (
  <div>
    <InputGroup>
      <InputLabel labelText="Label Title" id="ipt01" required />
      <BaseInput onChange={() => console.log('h')} id="iptDefault" placeholder="Input here..." />
    </InputGroup>
  </div>
)

export const HintMsg = () => (
  <div>
    <InputGroup>
      <InputLabel labelText="Label Title" id="ipt01" />
      <BaseInput onChange={() => console.log('h')} id="iptDefault" placeholder="Input here..." />
      <InputDec msg="힌트 메세지가 들어갑니다" />
    </InputGroup>
  </div>
)

export const HintErrorMsg = () => (
  <div>
    <InputGroup>
      <InputLabel labelText="Label Title" id="ipt01" />
      <BaseInput onChange={() => console.log('h')} id="iptDefault" placeholder="Input here..." error />
      <InputDec msg="에러가 났다요" error />
    </InputGroup>
  </div>
)

export const HintSucessMsg = () => (
  <div>
    <InputGroup>
      <InputLabel labelText="Label Title" id="ipt01" />
      <BaseInput onChange={() => console.log('h')} id="iptDefault" placeholder="Input here..." />
      <InputDec msg="에러가 났다요" success />
    </InputGroup>
  </div>
)
