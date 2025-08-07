// 작업자 : 최유희
// 0731 :: 디자인 변경으로 인해 삭제 가능성 있음..
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { SearchInput, InputGroup, InputLabel, InputDec } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/Input/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>

export default meta

export const Single = () => (
  <div>
    <SearchInput placeholder="Input here.." />
  </div>
)

export const Label = () => (
  <div>
    <InputGroup>
      <InputLabel labelText="labelText" id="ipt01" required />
      <SearchInput id="ipt01" placeholder="Input here.." />
      <InputDec msg="힌트 메세지가 들어갑니다. " />
    </InputGroup>
  </div>
)
