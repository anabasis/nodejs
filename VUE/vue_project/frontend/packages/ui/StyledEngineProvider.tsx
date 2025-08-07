'use client'

import React from 'react'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { theme } from '@ui/theme'
//reset 전역
import '@ui/styles/common/reset.scss'
import { QueryProvider } from 'library/store/server/QueryProvider'

export const GlobalCssPriority = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
