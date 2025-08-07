// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { RoundTab } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Tab/RoundTab',
  component: RoundTab,
  tags: ['autodocs'],
} satisfies Meta<typeof RoundTab>

const tabData = [{ tabName: 'tab1' }, { tabName: 'tab2' }, { tabName: 'tab3' }]

export default meta

export const Default = () => (
  <div>
    <RoundTab tabData={tabData} />
  </div>
)

export const SizeSM = () => (
  <div>
    <RoundTab tabData={tabData} size="sm" />
  </div>
)
