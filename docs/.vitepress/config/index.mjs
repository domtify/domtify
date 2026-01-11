import { defineConfig } from 'vitepress'
import { shared } from './shared.mjs'
import { zh } from './zh.mjs'

export default defineConfig({
  ...shared,

  locales: {
    root: { label: '简体中文', ...zh },
  },
})
