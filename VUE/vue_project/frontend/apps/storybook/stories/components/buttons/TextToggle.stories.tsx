// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TextToggle, RadioToggle } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Toggle/TextToggle',
  component: TextToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof TextToggle>

export default meta

export const Default = () => (
  <>
    <div className="align gap_6 start">
      <TextToggle id="id01" onChange={() => {}}>
        Planning
      </TextToggle>
      <TextToggle id="id02" onChange={() => {}}>
        Planning
      </TextToggle>
      <TextToggle id="id03" onChange={() => {}}>
        Planning
      </TextToggle>
    </div>
  </>
)

export const checked = () => (
  <div>
    <TextToggle id="id04" value onChange={() => {}}>
      Planning
    </TextToggle>
  </div>
)

export const DisabledChecked = () => (
  <div>
    <TextToggle id="id04" disabled value onChange={() => {}}>
      Planning
    </TextToggle>
  </div>
)

export const ISCRoundToggle = () => (
  <>
    <div>
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
