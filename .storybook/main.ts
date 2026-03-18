import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite')
    return mergeConfig(config, {
      resolve: { alias: { '@': '/src' } },
    })
  },
}

export default config
