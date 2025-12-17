import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { removeAttr } from "@/methods/removeAttr.js"

describe("removeAttr", () => {
  let input

  beforeEach(() => {
    document.body.innerHTML = `
    <input type="text" title="hello there" />
    `
    input = document.querySelector("input")
  })

  it("基本测试：能移除单个属性", () => {
    removeAttr("title")(el("input"))
    expect(input.hasAttribute("title")).toBe(false)
    expect(input.hasAttribute("type")).toBe(true)
  })

  it("能移除多个属性（空格分隔）", () => {
    removeAttr("title type")(el("input"))
    expect(input.hasAttribute("title")).toBe(false)
    expect(input.hasAttribute("type")).toBe(false)
  })

  it("传入非字符串时不报错，元素属性不变", () => {
    expect(() => removeAttr(123)(el("input"))).not.toThrow()
    expect(input.hasAttribute("title")).toBe(true)
    expect(input.hasAttribute("type")).toBe(true)
  })

  it("传入空字符串时不移除属性", () => {
    removeAttr(" ")(el("input"))
    expect(input.hasAttribute("title")).toBe(true)
    expect(input.hasAttribute("type")).toBe(true)
  })
})
