import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/utilities/getIn.js"

describe("getIn", () => {
  let obj

  beforeEach(() => {
    obj = { a: [{ b: { c: 42 } }] }
  })

  it("字符串", () => {
    expect(d.getIn(obj, "a[0].b.c")).toBe(42)
  })

  it("数组的方式", () => {
    expect(d.getIn(obj, ["a", 0, "b", "c"])).toBe(42)
  })

  it("默认值", () => {
    expect(d.getIn(obj, "a[1].b.c", "default")).toBe("default")
  })
})
