// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TooltipHover, InputLabel } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/Input/InputLabel',
  component: InputLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof InputLabel>

export default meta

export const Default = () => (
  <div>
    <InputLabel labelText="labelText" id="ipt01" />
  </div>
)

export const Required = () => (
  <div>
    <InputLabel labelText="labelText" id="ipt01" required />
  </div>
)

export const LabelInTooltip = () => (
  <div>
    <InputLabel labelText="labelText" id="ipt01" required>
      <TooltipHover>
        <p>저는 툴팁입니당</p>
      </TooltipHover>
    </InputLabel>
  </div>
)

export const Textcolor = () => <InputLabel labelText="labelText" id="ipt01" textcolor="light" />

export const Textcolor2 = () => (
  <InputLabel labelText="labelText" id="ipt01" textcolor="navy600">
    <TooltipHover>
      <p>저는 툴팁입니당</p>
    </TooltipHover>
  </InputLabel>
)

export const TextcolorRequired = () => <InputLabel labelText="labelText" id="ipt01" textcolor="light" required />

export const TextcolorInTooltip = () => (
  <div>
    <InputLabel labelText="labelText" id="ipt01" textcolor="light">
      <TooltipHover>
        <p>저는 툴팁입니당</p>
      </TooltipHover>
    </InputLabel>
  </div>
)

export const TextcolorRequiredInTooltip = () => (
  <div>
    <InputLabel labelText="labelText" id="ipt01" textcolor="light" required>
      <TooltipHover>
        <p>저는 툴팁입니당</p>
      </TooltipHover>
    </InputLabel>
  </div>
)
