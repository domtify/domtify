import { describe, it, expect, beforeEach, vi } from "vitest"

import { el } from "@/core.js"
import { html } from "@/methods/html.js"

describe("html", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="demo-container">
        <div class="demo-box">Demonstration Box</div>
    </div>
    `
  })

  it("获取 innerHTML", () => {
    const res = html()(el(".demo-container"))
    expect(res.trim()).toBe('<div class="demo-box">Demonstration Box</div>')
  })

  it("设置html-字符串", () => {
    html("<p>Hello <strong>World</strong></p>")(el(".demo-container"))
    const res = html()(el(".demo-container"))
    expect(res).toBe("<p>Hello <strong>World</strong></p>")
  })

  it("设置 innerHTML-函数", () => {
    const fn = vi.fn(() => "foo bar")
    const result = html(fn)(el(".demo-container"))

    expect(fn.mock.calls[0][0]).toBe(0)
    expect(fn.mock.calls[0][1].trim()).toBe(
      `<div class="demo-box">Demonstration Box</div>`,
    )
    const ctx = fn.mock.instances[0]
    const container = document.querySelector(".demo-container")
    expect(ctx).toBe(container)
    expect(container.innerHTML).toBe("foo bar")
    expect(Array.isArray(result)).toBe(true)
  })

  it("当匹配不到元素时返回 undefined", () => {
    const res = html()(el(".non-existent"))
    expect(res).toBeUndefined()
  })
})
