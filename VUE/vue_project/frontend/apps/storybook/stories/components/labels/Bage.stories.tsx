// 작업자 : 김수연

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Badge } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'components/Labels/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => (
  <>
    <Badge>Design</Badge>
    &nbsp;
    <Badge color="magenta">Design</Badge>
    &nbsp;
    <Badge>Design</Badge>
  </>
)
export const ODS = () => (
  <>
    <Badge style="ods" uiType="solid">
      1,111
    </Badge>
    &nbsp;
    <Badge style="ods" uiType="solid" color="blue200">
      1,111
    </Badge>
    &nbsp;
    <Badge style="ods" uiType="solid" color="blue300">
      1,111
    </Badge>
    &nbsp;
    <Badge style="ods" uiType="solid" color="blue400">
      1,111
    </Badge>
  </>
)

export const ODSThin = () => (
  <Badge style="ods" uiType="solid" size="thin">
    1,111
  </Badge>
)
export const SolidDefault = () => <Badge uiType="solid">Design</Badge>

export const CountDefault = () => (
  <Badge uiType="solid" color="blue" style="count">
    9
  </Badge>
)

export const RoundDefault = () => (
  <Badge uiType="solid" color="blue" style="round">
    Input text
  </Badge>
)

export const Round_Medium = () => (
  <Badge uiType="solid" color="blue" style="round" size="md">
    Input text
  </Badge>
)
// export const Default = () => <Badge>Design</Badge>
