// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Accordion } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Accordion/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

const listData = [
  { title: 'title1', contents: 'contents1' },
  { title: 'title2', contents: 'contents2' },
  { title: 'title3', contents: 'contents3' },
  { title: 'title4', contents: 'contents4' },
  { title: 'title5', contents: 'contents5' },
  { title: 'title6', contents: 'contents6' },
]

export default meta

export const Default = () => (
  <div>
    <Accordion />
  </div>
)
