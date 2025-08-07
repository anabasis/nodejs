import { createTheme } from '@mui/material'

export const theme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          color: '#354165',
          backgroundColor: '#e9e8ff',
          padding: '4px 10px 4px 16px',
          fontSize: '1.2rem',
        },
      },
    },
  },
})
