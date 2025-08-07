// 작업자 : 김병기

import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { ToastPopup } from 'ui'
import { ToastType, useToastPopup } from 'library/hook/useToastPopup'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Popup/ToastPopup',
  component: ToastPopup,
  tags: ['autodocs'],
  parameters: {
    position: {
      default: 'bg',
      values: [{ name: 'bg', value: 'relative' }],
    },
  },
} satisfies Meta<typeof ToastPopup>

export default meta
// type Story = StoryObj<typeof meta>

export const Default = () => {
  const { toastOpen } = useToastPopup()

  const toastState: ToastType = {
    autoHideDuration: 10000000000000,
    icon: 'success',
    content: 'Success Toast popup',
  }

  return (
    <>
      <button onClick={() => toastOpen(toastState)}>Open success Toastpopup</button>
      <ToastPopup />
    </>
  )
}

export const warning = () => {
  const { toastOpen } = useToastPopup()

  const toastState: ToastType = {
    autoHideDuration: 3000,
    icon: 'warning',
    content: 'Fail Toast popup',
  }
  return (
    <>
      <button onClick={() => toastOpen(toastState)}>Open Fail oastpopup</button>
      <ToastPopup />
    </>
  )
}

export const error = () => {
  const { toastOpen } = useToastPopup()

  const toastState: ToastType = {
    autoHideDuration: 3000,
    icon: 'error',
    content: 'Error Toast popup',
  }
  return (
    <>
      <button onClick={() => toastOpen(toastState)}>Open error snackbar</button>
      <ToastPopup />
    </>
  )
}
