import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/removeAttr.js"

describe("removeAttr", () => {
  let input

  beforeEach(() => {
    document.body.innerHTML = `
    <input type="text" title="hello there" />
    `
    input = document.querySelector("input")
  })

  it("基本测试：能移除单个属性", () => {
    d("input").removeAttr("title")
    expect(input.hasAttribute("title")).toBe(false)
    expect(input.hasAttribute("type")).toBe(true)
  })

  it("能移除多个属性（空格分隔）", () => {
    d("input").removeAttr("title type")
    expect(input.hasAttribute("title")).toBe(false)
    expect(input.hasAttribute("type")).toBe(false)
  })

  it("传入非字符串时不报错，元素属性不变", () => {
    expect(() => d("input").removeAttr(123)).not.toThrow()
    expect(input.hasAttribute("title")).toBe(true)
    expect(input.hasAttribute("type")).toBe(true)
  })

  it("传入空字符串时不移除属性", () => {
    d("input").removeAttr(" ")
    expect(input.hasAttribute("title")).toBe(true)
    expect(input.hasAttribute("type")).toBe(true)
  })
})
