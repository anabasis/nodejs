// 작업자 : 김병기

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { FileCard } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'components/File/FileCard',
  component: FileCard,
  tags: ['autodocs'],
} satisfies Meta<typeof FileCard>

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => <FileCard filesize="1.52mb">file name nam.ppt</FileCard>

export const View = () => (
  <FileCard filesize="1.52mb" view>
    file name nam.ppt
  </FileCard>
)

export const PPT = () => (
  <FileCard icon="pdf" filesize="1.52mb">
    file name nam.ppt
  </FileCard>
)

export const Excel = () => (
  <FileCard icon="excel" filesize="1.52mb">
    file name nam.excel
  </FileCard>
)

export const word = () => (
  <FileCard icon="word" filesize="1.52mb">
    file name nam.excel
  </FileCard>
)

export const horizon = () => (
  <FileCard icon="excel" filesize="1.52mb" className="horizon">
    file name nam.excel
  </FileCard>
)
