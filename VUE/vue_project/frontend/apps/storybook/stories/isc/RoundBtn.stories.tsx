// 작업자 : 최유희
import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import { RoundBtn } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Insilico/Buttons/RoundBtn',
  component: RoundBtn,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'onClick' },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
}

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => (
  <RoundBtn icon="ResetIcon" iconStyle={{ width: 16, height: 16, fill: 'var(--navy400)', position: 'left' }} disabled={false} onClick={() => {}}>
    Clear Selection
  </RoundBtn>
)

export const NoIcon = () => (
  <RoundBtn disabled={false} onClick={() => {}}>
    Reset
  </RoundBtn>
)

export const Disabled = () => (
  <RoundBtn icon="ResetIcon" iconStyle={{ width: 16, height: 16, fill: 'var(--navy400)' }} disabled={true} onClick={() => {}}>
    Reset
  </RoundBtn>
)

export const ClassBinding = () => (
  <RoundBtn icon="ResetIcon" iconStyle={{ width: 16, height: 16, fill: 'var(--navy400)' }} className="mb_20" disabled={false} onClick={() => {}}>
    Reset
  </RoundBtn>
)

export const Secondary = () => (
  <RoundBtn color="secondary" icon="AngleIcon" iconStyle={{ width: 16, height: 16, fill: '#1A1F23', strokeWidth: 1, position: 'right' }} onClick={() => {}}>
    Go to Create
  </RoundBtn>
)

export const Accordion = () => {
  const [expanded, setExpanded] = useState(false)
  return (
    <RoundBtn
      // 모듈 클래스 바인딩 uiType 으로 변경
      uiType={expanded ? ['accordion_btn', 'expanded'] : 'accordion_btn'}
      icon="AngleIcon"
      iconStyle={{ width: 16, height: 16, fill: '#595F63', position: 'right' }}
      onClick={() => {
        setExpanded(!expanded)
      }}
    >
      MC02
    </RoundBtn>
  )
}
