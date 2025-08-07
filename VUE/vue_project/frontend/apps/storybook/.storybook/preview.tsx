import type { Preview } from '@storybook/react'
import 'ui/styles/global.scss'
import StoryBookStyledProvider from 'ui/StoryBookStyledProvider'
import React from 'react'
const preview: Preview = {
  decorators: [
    (Story) => (
      <div>
        <StoryBookStyledProvider>
          <Story />
        </StoryBookStyledProvider>
      </div>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
