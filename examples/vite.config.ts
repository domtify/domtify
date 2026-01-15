import path from 'node:path'
import { defineConfig } from 'vite'

console.log(path.resolve(__dirname, '../src'))

export default defineConfig({
  root: 'examples', // 关键：让 examples 成为开发根目录

  publicDir: '../dist',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  server: {
    port: 8080,
  },
})
