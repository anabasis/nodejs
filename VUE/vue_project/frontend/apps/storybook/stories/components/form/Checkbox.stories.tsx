// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Checkbox } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

const data = [
  { id: 'default', name: 'default', labelText: 'default' },
  { id: 'select', name: 'select', labelText: 'select', defaultChecked: true },
  { id: 'disabled', name: 'disabled', labelText: 'disabled', disabled: true },
  { id: 'disabled', name: 'disabled', labelText: 'disabled', disabled: true, defaultChecked: true },
]

export default meta

export const Default = () => (
  <div>
    {data.map((item) => (
      <Checkbox id={item.id} name={item.name} labelText={item.labelText} />
    ))}
  </div>
)

export const size = () => (
  <>
    <Checkbox id="size" name="size" labelText="xs" size="xs" />
    <Checkbox id="size" name="size" labelText="small is default" size="sm" />
    <Checkbox id="size" name="size" labelText="md" size="md" />
    <Checkbox id="size" name="size" labelText="lg" size="lg" />
  </>
)

export const round = () => (
  <>
    <Checkbox id="round1" name="round1" labelText="round" uiType="round" />
    <Checkbox id="round2" name="round2" labelText="round" uiType="round" />
  </>
)
