import '../assets/css/tailwind.css'
import { app } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

app.use(createPinia())

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
