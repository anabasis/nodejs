import type { StorybookConfig } from '@storybook/react-vite'
const { mergeConfig } = require('vite')
const { default: tsconfigPaths } = require('vite-tsconfig-paths')
const config: StorybookConfig = {
  stories: ['../stories/guide/*.stories.@(js|jsx|ts|tsx)', '../stories/**/*.stories.@(js|jsx|ts|tsx)', '../stories/**/*.mdx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', 'storybook-css-modules'],
  viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
      define: {
        'process.env.NODE_DEBUG': false,
        'process.env': {},
      },
    })
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
