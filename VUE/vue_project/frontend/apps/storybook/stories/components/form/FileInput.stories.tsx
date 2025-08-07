// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { FileInput, InputGroup, InputLabel, InputDec } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/File/FileInput',
  component: FileInput,
  tags: ['autodocs'],
} satisfies Meta<typeof FileInput>

export default meta

export const Default = () => (
  <div>
    <FileInput id="iptDefault01" placeholder="Upload File" />
  </div>
)

export const HintMsg = () => (
  <div>
    <InputGroup>
      <FileInput id="ipt01" placeholder="Upload File" />
      <InputDec msg="사이즈 32X32 / 파일 형식 PNG" />
    </InputGroup>
  </div>
)
