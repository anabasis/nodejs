// 작업자 : 김병기

import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'components/Step/Stepper',
  component: Stepper,
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { id: 1, title: 'Step title1', component: <>djska;dfljalsfjkaldfjs</> },
  { id: 2, title: 'Step title2', component: <>머지</> },
  { id: 3, title: 'Step title3', component: <>ㄴㄴㄴㄴ</> },
]
export const Default_Horizontal = () => <Stepper data={data} current={2} />
export const Vertical = () => <Stepper data={data} uiType="ver" current={2} />
export const Secondary_Horizontal = () => <Stepper data={data} color="secondary" uiType="hor" current={data.length + 1} />
export const Secondary_Vertical = () => <Stepper data={data} uiType="ver" color="secondary" current={2} />
