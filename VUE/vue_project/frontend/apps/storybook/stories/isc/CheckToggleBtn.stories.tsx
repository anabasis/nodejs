// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TextToggle } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Insilico/Buttons/CheckToggleBtn',
  component: TextToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof TextToggle>

export default meta

export const ISCRoundToggle = () => (
  <>
    <div className="align start gap_6">
      <TextToggle id="id05" onChange={() => {}} className="round">
        Planning
      </TextToggle>
      <TextToggle id="id06" onChange={() => {}} className="round">
        Planning
      </TextToggle>
      <TextToggle id="id07" onChange={() => {}} className="round">
        Planning
      </TextToggle>
    </div>
  </>
)
