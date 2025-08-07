// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { LineTab } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Tab/LineTab',
  component: LineTab,
  tags: ['autodocs'],
} satisfies Meta<typeof LineTab>

const tabData = [{ tabName: 'tab1' }, { tabName: 'tab2' }, { tabName: 'tab3' }]
const tabCheckData = [{ tabName: 'tab1', iconCheck: true }, { tabName: 'tab2' }, { tabName: 'tab3' }]

export default meta

export const Default = () => (
  <div>
    <LineTab tabData={tabData} />
  </div>
)

export const sm = () => (
  <div>
    <LineTab tabData={tabData} style="sm" />
  </div>
)

export const Tag = () => (
  <div>
    <LineTab tabData={tabData} style="tag" />
  </div>
)

export const ISCTagCheck = () => (
  <div>
    <LineTab tabData={tabCheckData} style="tag" />
  </div>
)
