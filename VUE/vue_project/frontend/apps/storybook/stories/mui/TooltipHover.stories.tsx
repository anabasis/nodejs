// 작업자 : 김수연

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TooltipHover } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Tooltip/Hover',
  component: TooltipHover,
  tags: ['autodocs'],
} satisfies Meta<typeof TooltipHover>

export default meta
// type Story = StoryObj<typeof meta>

export const Hover = () => (
  <>
    <TooltipHover>
      <p>텍스트만 존재시~</p>
    </TooltipHover>
  </>
)
