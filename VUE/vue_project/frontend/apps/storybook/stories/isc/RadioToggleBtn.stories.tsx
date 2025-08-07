// 작업자 : 최유희
import React from 'react'
import type { Meta } from '@storybook/react'
import { RadioToggle } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Insilico/Form/RadioToggleBtn',
  component: RadioToggle,
  tags: ['autodocs'],
}

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => (
  <div className="align center">
    <RadioToggle id="rdo01" name="rdoToggle" text="PTOD" defaultChecked />
    <RadioToggle id="rdo02" name="rdoToggle" text="PMOD" />
    <RadioToggle id="rdo03" name="rdoToggle" text="IC" />
  </div>
)

export const INInsilico = () => (
  <div>
    <div className="bg_box bg_second100">
      <div className="align center">
        <RadioToggle id="rdo04" name="rdoToggle_1" text="PTOD" defaultChecked />
        <RadioToggle id="rdo05" name="rdoToggle_1" text="PMOD" />
        <RadioToggle id="rdo06" name="rdoToggle_1" text="IC" />
      </div>
    </div>
  </div>
)
