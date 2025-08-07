// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TreeMenu } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Tree/TreeMenu',
  component: TreeMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof TreeMenu>

const treeData = [
  {
    text: '1depth 1depth 1depth 1depth 1depth',
    hasSubItems: true,
    subItems: [
      {
        text: '2depth 2depth 2depth 2depth',
        hasSubItems: true,
        subItems: [
          {
            text: '3depth 3depth 3depth 3depth',
            hasSubItems: false,
            subItems: [],
          },
        ],
      },
      {
        text: '2depth blah blah',
        hasSubItems: false,
        subItems: [],
      },
    ],
  },
  {
    text: '1depth 1depth 1depth 1depth 1depth',
    hasSubItems: true,
    subItems: [
      {
        text: '2depth blah blah',
        hasSubItems: false,
        subItems: [],
      },
    ],
  },
]

export default meta

export const Default = () => (
  <div>
    <TreeMenu treeData={treeData} />
  </div>
)
