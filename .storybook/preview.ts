import type { Preview } from '@storybook/react'
import '../src/shared/styles/globals.css'
const preview: Preview = {
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0A0A0A' }, { name: 'light', value: '#FAFAFA' }] },
  },
}
export default preview
