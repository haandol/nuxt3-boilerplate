// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  publicRuntimeConfig: {},
  privateRuntimeConfig: {},
  css: ['@assets/css/tailwind.css', '@assets/css/main.scss'],
  modules: ['@nuxtjs/tailwindcss'],
  buildModules: [
    // pinia plugin - https://pinia.esm.dev
    '@pinia/nuxt',
  ],
  build: {
    // transpile: ['@heroicons/vue', '@headlessui/vue'],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    logLevel: 'info',
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  },
  typescript: {
    shim: false,
  },
})
