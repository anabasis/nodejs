// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { RadioBox } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/RadioBox',
  component: RadioBox,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioBox>

// const data = [
//   { id: 'default', name: 'default', labelText: 'default' },
//   { id: 'select', name: 'select', labelText: 'select', defaultChecked: true },
//   { id: 'disabled', name: 'disabled', labelText: 'disabled', disabled: true },
// ]

export default meta

export const Default = () => (
  <div>
    <RadioBox value="value1" name="group" id="value1" text="default" onChange={() => {}} defaultChecked={true} />
    <RadioBox value="value2" name="group" id="value2" text="select" onChange={() => {}} />
    <RadioBox value="value3" name="group" id="value3" disabled={true} text="disabled" onChange={() => {}} />
  </div>
)

// 기존 radio type="check" -> checkbox uiType="round" 으로 변경
// export const CheckUIType = () => (
//   <div>
//     <RadioBox value="value4" name="group2" id="value4" text="default" type="check" checked={false} onChange={() => {}} />
//     <RadioBox value="value5" name="group2" id="value5" text="select" defaultChecked={true} type="check" onChange={() => {}} />
//     <RadioBox value="value6" name="group2" id="value6" disabled={true} text="disabled" type="check" onChange={() => {}} />
//   </div>
// )

export const Size = () => (
  <>
    <div>
      <RadioBox value="value_1" size="sm" name="group3" id="value_1" text="default" onChange={() => {}} />
      <RadioBox value="value_2" size="sm" name="group3" id="value_2" text="select" checked={true} onChange={() => {}} />
      <RadioBox value="value_3" size="sm" name="group3" id="value_3" disabled={true} text="disabled" onChange={() => {}} />
    </div>
    <div>
      <RadioBox value="value1_1" size="lg" name="group4" id="value1_1" text="default" onChange={() => {}} />
      <RadioBox value="value1_2" size="lg" name="group4" id="value1_2" text="select" defaultChecked={true} onChange={() => {}} />
      <RadioBox value="value1_3" size="lg" name="group4" id="value1_3" disabled={true} text="disabled" onChange={() => {}} />
    </div>
  </>
)
