import { playwright } from '@vitest/browser-playwright'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: false,
    setupFiles: [],
    name: 'browser',
    include: ['test/**/*.{test,spec}.ts'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reportOnFailure: true,
      include: ['src/**/*.{js,ts}'], // 指定包含的文件
      // 排除测试文件
      exclude: [...configDefaults.exclude, '**/test/**', '**/*.d.ts'],
    },
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        {
          browser: 'chromium',
          headless: !!process.env.CI,
        },
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
