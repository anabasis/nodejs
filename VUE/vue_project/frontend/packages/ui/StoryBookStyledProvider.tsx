'use client'

import React from 'react'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { theme } from '@ui/theme'
//reset 전역
import '@ui/styles/common/reset.scss'

const StoryBookStyledProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  )
}

export default StoryBookStyledProvider
