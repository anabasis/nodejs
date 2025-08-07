// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Icons } from '@ui/components/Icons'
import Error500Page from '@ui/layouts/Error500Page'
import Error404Page from '@ui/layouts/Error404Page'
import 'ui/styles/global.scss'

import { Dl, InputGroup, InputLabel, SelectMui, SwitchToggle, ButtonMui, SearchInput, StatusLabel } from 'ui'
const meta = {
  title: 'Guide/Error',
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const Error404 = () => (
  <div className="error_box">
    <div className="error_cont">
      <Error404Page />
    </div>
  </div>
)
export const Error500 = () => (
  <div className="error_box">
    <div className="error_cont">
      <div className="ptb_185">
        <Icons.Error500 />
        <div className="error_title mt_30 mb_30">
          <p className="headline3 mb_10">Internal Server Error</p>
          <p className="body1 typo500">
            Sorry, server error unable to fulfill your request. <br /> error code : 500
          </p>
        </div>
        <div className="error_btn">
          <ButtonMui size="large" type="contained">
            Reload
          </ButtonMui>
        </div>
      </div>
    </div>
  </div>
)
