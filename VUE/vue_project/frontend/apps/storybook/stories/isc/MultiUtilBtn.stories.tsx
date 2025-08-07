// 작업자 : 최유희
import React from 'react'
import type { Meta } from '@storybook/react'
import { ContextButton, MultiUtilBtn } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Insilico/Buttons/MultiUtilBtn',
  component: MultiUtilBtn,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'onClick' },
    leftData: {
      control: {
        type: 'text',
      },
    },
    isChecked: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
    isSelected: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
    isError: {
      control: {
        type: 'radio',
      },
      options: [true, false],
    },
  },
}

export default meta
// type Story = StoryObj<typeof meta>

export const Default = (args) => (
  <MultiUtilBtn leftData={<span>ID001</span>} {...args}>
    <div className="align">
      <div className="field">
        <p className="caption">블라블라</p>
      </div>
      <ContextButton rotate iconsize={16}></ContextButton>
    </div>
  </MultiUtilBtn>
)
export const IscButtonSelected = () => (
  <MultiUtilBtn isSelected={true} leftData={<span>ID001</span>}>
    <div className="align">
      <div className="field">
        <p className="caption">Request 블라블라</p>
        <p className="caption">Analyte 블라블라</p>
      </div>
      <ContextButton rotate iconsize={16}></ContextButton>
    </div>
  </MultiUtilBtn>
)
export const IscButtonChecked = () => (
  <MultiUtilBtn isChecked={true} leftData={<span>ID001</span>}>
    <div className="align">
      <div className="field">
        <p className="caption">Request Name</p>
        <p className="caption">Analyte Name</p>
      </div>
      <ContextButton rotate={true} iconsize={16}></ContextButton>
    </div>
  </MultiUtilBtn>
)
export const IscButtonIscButtonError = () => (
  <MultiUtilBtn isError={true} leftData={<span>ID001</span>}>
    <div className="align">
      <div className="field">
        <p className="caption">Request Name</p>
        <p className="caption">Analyte Name</p>
      </div>
      <ContextButton rotate={true} iconsize={16}></ContextButton>
    </div>
  </MultiUtilBtn>
)
export const IscButtonSelectedChecked = () => (
  <MultiUtilBtn isChecked={true} isSelected={true} leftData={<span>ID001</span>}>
    <div className="align">
      <div className="field">
        <p className="caption">Request Name</p>
        <p className="caption">Analyte Name</p>
      </div>
      <ContextButton rotate={true} iconsize={16}></ContextButton>
    </div>
  </MultiUtilBtn>
)
export const IscButtonIscButtonSelectedError = () => (
  <MultiUtilBtn isSelected={true} isError={true} leftData={<span>ID001</span>}>
    <div className="align">
      <div className="field">
        <p className="caption">Request Name</p>
        <p className="caption">Analyte Name</p>
      </div>
      <ContextButton rotate={true} iconsize={16}></ContextButton>
    </div>
  </MultiUtilBtn>
)
