// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { InputGroup, SearchIcoInput, SelectMui } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Form/Input/SearchIcoInput',
  component: SearchIcoInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchIcoInput>

export default meta

export const Single = () => (
  <div>
    <SearchIcoInput placeholder="Input here.." onChangeSearch={() => console.log('')} />
  </div>
)

export const IscSearchSelectInput = () => (
  // 인실리코 검색 케이스
  <SearchIcoInput uiType="addSelect">
    <SelectMui
      size="full"
      options={[
        { name: 'test1', value: 'test1' },
        { name: 'test2', value: 'test2' },
      ]}
      uiType="multi"
    />
  </SearchIcoInput>
)
