// 작업자 : 서혜진
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { SimpleAccordion } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Accordion/SimpleAccordion',
  component: SimpleAccordion,
  tags: ['autodocs'],
} satisfies Meta<typeof SimpleAccordion>

export default meta

export const Default = () => (
  <div>
    <SimpleAccordion title="PTOD">
      <div>detail</div>
    </SimpleAccordion>
  </div>
)
