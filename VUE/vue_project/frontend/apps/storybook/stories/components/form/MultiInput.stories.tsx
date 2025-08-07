// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { MultiInput, InputDec, InputGroup, InputLabel, ButtonMui, Icons } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/Input/MultiInput',
  component: MultiInput,
  tags: ['autodocs'],
} satisfies Meta<typeof MultiInput>

export default meta

export const Default = () => (
  <div>
    <MultiInput placeholder="Input here.." id="ipt01">
      <span className="caption">%</span>
    </MultiInput>
  </div>
)

export const TypoCase = () => (
  <div>
    <MultiInput placeholder="Input here.." id="ipt01">
      <span className="caption">0 / 30</span>
    </MultiInput>
  </div>
)

export const TypoCase2 = () => (
  <div>
    <MultiInput placeholder="Input here.." id="ipt01">
      <span className="caption">0 Character</span>
    </MultiInput>
  </div>
)

export const Time = () => (
  <div>
    <MultiInput placeholder="Input here.." id="ipt01">
      <span className="caption">10:00</span>
    </MultiInput>
  </div>
)

export const ISCTextButton = () => (
  <div>
    <MultiInput placeholder="Input here.." id="ipt01">
      <ButtonMui type="text" color="black" size="large">
        Add
      </ButtonMui>
    </MultiInput>
  </div>
)

export const ISCReverse = () => (
  <div>
    <InputGroup align="inline">
      <MultiInput placeholder="Input Start Position" id="ipt01" uiType="reverse">
        <span className="caption navy400">start</span>
      </MultiInput>
    </InputGroup>
    <span className="pl_10 pr_10 body3 navy800">
      <Icons.AngleIcon width={16} height={16} fill="var(--typo900)" />
    </span>
    <InputGroup align="inline">
      <MultiInput placeholder="Input End Position" id="ipt01" uiType="reverse">
        <span className="caption navy400">End</span>
      </MultiInput>
    </InputGroup>
  </div>
)

export const TextAlignRight = () => (
  <div>
    <MultiInput placeholder="00" id="ipt01" uiType="tr">
      <span className="caption navy400">%</span>
    </MultiInput>
  </div>
)

export const Label = () => (
  <div>
    <InputGroup>
      <InputLabel labelText="labelText" id="ipt01" required className="mb_8" />
      <MultiInput placeholder="Input here.." id="ipt01">
        <ButtonMui type="text" color="black" size="large">
          Add
        </ButtonMui>
      </MultiInput>
      <InputDec msg="Hint msg" />
    </InputGroup>
  </div>
)

export const LabelInline = () => (
  <div>
    <InputGroup align="inline">
      <InputLabel textcolor="light" labelText="labelText" id="ipt01" />
      <MultiInput>
        <ButtonMui type="text" color="black" size="large">
          Add
        </ButtonMui>
      </MultiInput>
    </InputGroup>
    <InputGroup align="inline">
      <InputLabel textcolor="light" labelText="labelText" id="ipt01" />
      <MultiInput>
        <span className="caption">%</span>
      </MultiInput>
    </InputGroup>
  </div>
)
