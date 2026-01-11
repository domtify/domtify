import { defineConfig } from 'vite'

export default defineConfig({
  root: 'examples', // 关键：让 examples 成为开发根目录

  server: {
    port: 8080,
  },
})
