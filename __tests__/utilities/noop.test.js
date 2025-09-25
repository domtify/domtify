import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/utilities/noop.js"

describe("noop", () => {
  it("应该返回undefined", () => {
    const result = d.noop()
    expect(result).toBeUndefined()
  })
})
