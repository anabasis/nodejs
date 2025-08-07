// 작업자 : 김수연

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Chip } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'components/Labels/Chip',
  component: Chip,
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => <Chip label="회사명">Design</Chip>

export const Link = () => <Chip link>Design</Chip>
export const small = () => (
  <Chip size="sm" label="Seegene">
    Design
  </Chip>
)
