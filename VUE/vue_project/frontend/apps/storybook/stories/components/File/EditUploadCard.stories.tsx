// 작업자 : 김병기

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { EditUploadCard } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'components/File/EditUploadCard',
  component: EditUploadCard,
  tags: ['autodocs'],
} satisfies Meta<typeof EditUploadCard>

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => <EditUploadCard>file name nam.pdf</EditUploadCard>

export const PPT = () => <EditUploadCard icon="pdf">file name nam.pdf</EditUploadCard>

export const Excel = () => <EditUploadCard icon="excel">file name nam.excel</EditUploadCard>

export const word = () => <EditUploadCard icon="word">file name nam.excel</EditUploadCard>

export const Horizon = () => (
  <EditUploadCard icon="excel" className="horizon">
    file name nam.excel
  </EditUploadCard>
)

export const Filesize = () => (
  <EditUploadCard icon="excel" filesize="1.52mb" className="horizon">
    file name nam.excel
  </EditUploadCard>
)
