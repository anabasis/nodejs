// 작업자 : 서혜진
import React from 'react'
import type { Meta } from '@storybook/react'
import { RadioLineBox } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Insilico/Form/RadioLineBox',
  component: RadioLineBox,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => (
  <RadioLineBox id="rdo" name="rdo" value="" text="AutoMSA Input + Output copy" subText="If the result exists, both Input and Output will be copied" />
)
