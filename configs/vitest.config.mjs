import { defineConfig } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"

export default defineConfig({
  test: {
    globals: false,
    setupFiles: ["./configs/vitest.setup.mjs"],
    name: "browser",
    include: ["__tests__/**/*.test.js"],
    coverage: {
      enabled: true,
      all: true, //哪怕没改动的文件也显示出来
      provider: "v8",
      reportOnFailure: true,
      include: ["src/**/*.js"], // 指定包含的文件
      // 排除测试文件
      exclude: [
        "**/*.test.js",
        "**/__tests__/**",
        "src/wrappers/*.js",
        "src/index.js",
        "src/methods.js",
        "src/utilities/type/*.js",
        "src/utilities/index.js",
      ],
    },
    browser: {
      enabled: true,
      provider: playwright(),
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
