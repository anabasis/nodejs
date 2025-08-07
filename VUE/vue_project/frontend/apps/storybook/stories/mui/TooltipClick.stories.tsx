// 작업자 : 김수연

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TooltipClick } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Tooltip/Click',
  component: TooltipClick,
  tags: ['autodocs'],
} satisfies Meta<typeof TooltipClick>

export default meta
// type Story = StoryObj<typeof meta>

export const Click = () => (
  <>
    <TooltipClick title="클릭">
      <p>텍스트만 존재시~</p>
    </TooltipClick>
  </>
)
