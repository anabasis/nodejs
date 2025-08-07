// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import 'ui/styles/global.scss'

import { Dl, InputGroup, InputLabel, SelectMui, SwitchToggle, ButtonMui, SearchInput, StatusLabel } from 'ui'
const meta = {
  title: 'Guide/Align',
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const Default = () => (
  <>
    {/* 정렬을 필요로 최소 단위의 div 는 item 으로 통일합니다. */}
    {/* 좌-우 정렬 */}
    <div className="align">
      <div className="lft">
        {/* item + item 마진은 기본 20입니다.  */}
        <div className="item bg_pause" style={{ padding: '20px' }}>
          아이템
        </div>
        <div className="item bg_pause" style={{ padding: '20px' }}>
          아이템
        </div>
        <div className="item bg_pause" style={{ padding: '20px' }}>
          아이템
        </div>
      </div>
      <div className="rgt">
        <div className="item bg_pause" style={{ padding: '20px' }}>
          아이템
        </div>
      </div>
    </div>
  </>
)

export const AlignCenter = () => (
  <>
    {/* 중앙 정렬 */}
    <div className="align center">
      {/* item + item 마진은 기본 20입니다.  */}
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
    </div>
  </>
)

export const AlignRight = () => (
  <>
    {/* 오른쪽 정렬 */}
    <div className="align end">
      {/* item + item 마진은 기본 20입니다.  */}
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
    </div>
  </>
)

export const AlignLeft = () => (
  <>
    {/* 왼쪽 정렬 */}
    <div className="align start">
      {/* item + item 마진은 기본 20입니다.  */}
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
      <div className="item bg_pause" style={{ padding: '20px' }}>
        아이템
      </div>
    </div>
  </>
)

export const AlignColumn = () => (
  <div className="" style={{ height: '300px' }}>
    {/* 상 / 하 정렬 :: */}
    <div className="align column">
      <div className="top">
        {/* item + item 마진은 기본 20입니다.  */}
        <div className="item bg_pause" style={{ padding: '20px' }}>
          아이템
        </div>
        <div className="item bg_pause" style={{ padding: '20px' }}>
          아이템
        </div>
        <div className="item bg_pause" style={{ padding: '20px' }}>
          아이템
        </div>
      </div>
      <div className="bottom">
        <div className="item bg_pause" style={{ padding: '20px' }}>
          아이템
        </div>
      </div>
    </div>
  </div>
)

export const Align1_2 = () => (
  <>
    {/* 좌-우 정렬 1:2 */}
    <div className="align top flex1_2">
      {/* 영역간 네이밍이 상충되어 변경합니다 lft,rgt -> flex1, flex2 */}
      <div className="flex1 bg_pause" style={{ padding: '20px', width: '100%' }}>
        {/* item + item 마진은 기본 20입니다.  */}
        아이템
      </div>
      <div className="flex2">
        <div className="item bg_error" style={{ padding: '20px', width: '100%' }}>
          아이템
        </div>
      </div>
    </div>
  </>
)

export const Align2_1 = () => (
  <>
    {/* 좌-우 정렬 2:1 */}
    <div className="align flex2_1">
      {/* 영역간 네이밍이 상충되어 변경합니다 lft,rgt -> flex1, flex2 */}
      <div className="flex2 bg_pause" style={{ padding: '20px', width: '100%' }}>
        아이템
      </div>
      <div className="flex1 bg_error" style={{ padding: '20px', width: '100%' }}>
        아이템
      </div>
    </div>
  </>
)

export const Useage = () => (
  <div className="filter_group">
    <div className="align">
      <div className="lft">
        {/* 정렬할 요소가 폼 요소일 경우 InputGroup inline 사용 */}
        <div className="item">
          <InputGroup align="inline">
            <InputLabel labelText="국가버전" />
            {/* <SelectMui options={} /> */}
          </InputGroup>
          <InputGroup align="inline">
            <InputLabel labelText="언어" />
            {/* <SelectMui /> */}
          </InputGroup>
        </div>
        <div className="item">
          <StatusLabel status="ongoing">Ongoing</StatusLabel>
        </div>
      </div>
      <div className="rgt">
        <SearchInput />
      </div>
    </div>
  </div>
)

export const Useage2 = () => (
  <>
    {/* 좌-우 정렬 */}
    <div className="align">
      <div className="lft align gap_6 start">
        <SwitchToggle id="toggleBtn" />
        <StatusLabel status="ongoing">Ongoing</StatusLabel>
      </div>
      <div className="rgt">
        <div className="item">
          <ButtonMui size="large">Button</ButtonMui>
        </div>
      </div>
    </div>
  </>
)

export const Useage3 = () => (
  <>
    {/* 좌-우 정렬 */}
    <div className="align">
      <div className="lft align gap_6 start">
        <Dl
          listData={[
            { listTitle: 'Number', listInfo: '141' },
            { listTitle: 'Category', listInfo: '서비스 이용 약관' },
            { listTitle: 'Upload date', listInfo: '2023-05-10' },
          ]}
        />
        <StatusLabel status="ongoing">Ongoing</StatusLabel>
      </div>
      <div className="rgt">
        <div className="item">
          {/* 버튼 + 버튼의 케이스는 알아서 마진이 생성 */}
          <ButtonMui size="medium">Button</ButtonMui>
          <ButtonMui size="large">Button</ButtonMui>
        </div>
      </div>
    </div>
  </>
)
