// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import 'ui/styles/global.scss'

const meta = {
  title: 'Guide/Color',
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const PrimaryBlue = () => (
  <>
    <p className="headline1 blue400">headline1</p>
    <p className="headline1 blue300">headline1</p>
    <p className="headline1 blue200">headline1</p>
    <p className="headline1 blue100">headline1</p>
    <p className="headline1 blue50">headline1</p>
  </>
)

export const PrimaryNavy = () => (
  <>
    <p className="headline1 navy800">headline1</p>
    <p className="headline1 navy700">headline1</p>
    <p className="headline1 navy500">headline1</p>
    <p className="headline1 navy300">headline1</p>
    <p className="headline1 navy200">headline1</p>
    <p className="headline1 navy100">headline1</p>
    <p className="headline1 navy50">headline1</p>
  </>
)

export const CommonColor_Wisdom = () => (
  <>
    <div className="module_box ptb_20 plr_20">
      <p className="headline1">Notification</p>
      <hr />
      <p className="headline4 success">Success color</p>
      <p className="headline4 error">Error color</p>
      <p className="headline4 fail">Fail color</p>
      <p className="headline4 warning">Warning color</p>
      <p className="headline4 noti">Noti color</p>
    </div>
    <div className="module_box ptb_20 plr_20 mt_20">
      <p className="headline1">Status</p> <hr />
      <p className="headline4 done">Done color</p>
      <p className="headline4 ongoing">ongoing color</p>
      <p className="headline4 pause">Pause color</p>
      <p className="headline4 error">Delete color</p>
    </div>
  </>
)

export const InsillicoColor = () => (
  <>
    <div className="module_box ptb_20 plr_20">
      <p className="headline1">ODS_Status Color</p>
      <hr />
      <p className="headline4 ready">ready color</p>
      <p className="headline4 running">running color</p>
      <p className="headline4 stopped">stopped color</p>
      <p className="headline4 done">done color</p>
      <p className="headline4 fail">fail color</p>
      <p className="headline4 error">error color</p>
      <p className="headline4 copying">copying color</p>
      <p className="headline4 waiting">waiting color</p>
      <p className="headline4 onhold">onhold color</p>
    </div>
    <div className="module_box ptb_20 plr_20 mt_20">
      <p className="headline1">Process Color</p> <hr />
      <p className="headline4 planning">planning color</p>
      <p className="headline4 ordering">ordering color</p>
      <p className="headline4 prototype">prototype color</p>
      <p className="headline4 validation">validation color</p>
      <p className="headline4 followup">followup color</p>
    </div>
    <div className="module_box ptb_20 plr_20 mt_20">
      <p className="headline1">Action Color</p> <hr />
      <p className="headline4 delete400 bg_delete100 ptb_4 plr_4">delete400 +bg_delete100</p>
      <p className="headline4 acc400 bg_acc100 ptb_4 plr_4">acc400 + bg_acc100</p>
      <p className="headline4 cancel400 bg_cancel100 ptb_4 plr_4">cancel400 + bg_cancel100</p>
      <p className="headline4 change400 bg_change100 ptb_4 plr_4">change400 + bg_changec100</p>
      <p className="headline4 copying400 bg_copying100 ptb_4 plr_4">copying400 + bg_copying100</p>
    </div>
  </>
)

export const TypoColor = () => (
  <>
    <p className="headline1 typo900">typo900</p>
    <p className="headline1 typo800">typo800</p>
    <p className="headline1 typo700">typo700</p>
    <p className="headline1 typo500">typo500</p>
    <p className="headline1 typo200">typo200</p>
    <p className="headline1 typo0">typo0</p>
    <p className="headline1 typo83">typo83</p>
  </>
)
