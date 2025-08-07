// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { BaseInput, InputGroup, InputDec, ButtonMui, MultiInput, SelectMui, MultiSelectMui } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/Input/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof InputGroup>

export default meta

export const SingleInputButtonGroup = () => (
  <div>
    <InputGroup>
      <BaseInput size="lg" onChange={() => console.log('h')} id="ipt01" placeholder="Input Here...">
        {/* 인풋 내 버튼 사이즈는 medium 으로 고정 */}
        <ButtonMui type="outlined" size="medium">
          인증코드 발송
        </ButtonMui>
      </BaseInput>
      <InputDec msg="Hint Msg" />
    </InputGroup>
  </div>
)

export const SingleInputButtonGroupError = () => (
  <div>
    <InputGroup>
      <BaseInput onChange={() => console.log('h')} id="ipt01" placeholder="Input Here..." error>
        <ButtonMui type="outlined" size="medium" color="error">
          인증코드 발송
        </ButtonMui>
      </BaseInput>
      <InputDec msg="Error Msg" error />
    </InputGroup>
  </div>
)

export const MultiInputGroup = () => (
  <div>
    <InputGroup>
      <div className="align start">
        <MultiInput id="ipt04" placeholder="Input Here...">
          <span>00:00</span>
        </MultiInput>
      </div>
      <InputDec msg="Hint Msg" />
    </InputGroup>
  </div>
)

export const MultiInputButtonGroup = () => (
  <div>
    <InputGroup>
      <div className="align start">
        <MultiInput size="lg" id="ipt04" placeholder="Input Here...">
          <span>00:00</span>
        </MultiInput>
        <ButtonMui type="contained" size="medium" color="black">
          인증코드 발송
        </ButtonMui>
      </div>
      <InputDec msg="Hint Msg" />
    </InputGroup>
  </div>
)

export const MultiInputButtonGroupError = () => (
  <div>
    {/* 부득이하게..BaseInput과 마크업이 다릅니다..  */}
    <InputGroup>
      <div className="align start">
        <MultiInput id="ipt04" placeholder="Input Here..." error>
          <span className="error">00:00</span>
        </MultiInput>
        <ButtonMui type="contained" size="medium" color="black">
          인증코드 발송
        </ButtonMui>
      </div>
      <InputDec msg="Hint Msg" error />
    </InputGroup>
  </div>
)

export const SelectGroupCase = () => (
  <div>
    <InputGroup>
      <div className="align start">
        <SelectMui size="full" options={[]} />
        <ButtonMui type="contained" size="medium" color="black">
          인증코드 발송
        </ButtonMui>
      </div>
    </InputGroup>
  </div>
)

export const SelectGroupCase2 = () => (
  <div>
    <InputGroup>
      <div className="align start">
        <MultiSelectMui
          size="full"
          options={[
            'Oliver Hansen',
            'Van Henry',
            'April Tucker',
            'Ralph Hubbard',
            'Omar Alexander',
            'Carlos Abbott',
            'Miriam Wagner',
            'Bradley Wilkerson',
            'Virginia Andrews',
            'Kelly Snyder',
          ]}
        />
        <ButtonMui type="contained" size="medium" color="black">
          버튼
        </ButtonMui>
      </div>
    </InputGroup>
  </div>
)
