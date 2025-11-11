import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: false,
    setupFiles: ["./configs/vitest.setup.mjs"],
    name: "browser",
    include: ["__tests__/**/*.test.ts"],
    coverage: {
      enabled: true,
      all: true, //哪怕没改动的文件也显示出来
      provider: "v8",
      reportOnFailure: true,
      include: ["src/**/*.ts"], // 指定包含的文件
      // 排除测试文件
      exclude: [
        "**/*.test.ts",
        "**/__tests__/**",
        "src/wrappers/*.ts",
        "src/index.ts",
        "src/methods.ts",
        "src/utilities/type/*.ts",
        "src/utilities/index.ts",
      ],
    },
    browser: {
      enabled: true,
      provider: "playwright",
      instances: [
        {
          browser: "chromium",
          headless: process.env.CI ? true : false,
        },
      ],
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})
