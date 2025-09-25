import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d, Domtify } from "@/core.js"

// 按需导入
import "@/methods/html.js"

describe("html", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="demo-container">
        <div class="demo-box">Demonstration Box</div>
    </div>
    `
  })

  it("获取 innerHTML", () => {
    const html = d(".demo-container").html()
    expect(html.trim()).toBe('<div class="demo-box">Demonstration Box</div>')
  })

  it("设置html-字符串", () => {
    d(".demo-container").html("<p>Hello <strong>World</strong></p>")
    const html = d(".demo-container").html()
    expect(html).toBe("<p>Hello <strong>World</strong></p>")
  })

  it("设置 innerHTML-函数", () => {
    const fn = vi.fn(() => "foo bar")
    const result = d(".demo-container").html(fn)

    expect(fn.mock.calls[0][0]).toBe(0)
    expect(fn.mock.calls[0][1].trim()).toBe(
      `<div class="demo-box">Demonstration Box</div>`,
    )
    const ctx = fn.mock.instances[0]
    const container = document.querySelector(".demo-container")
    expect(ctx).toBe(container)
    expect(container.innerHTML).toBe("foo bar")
    expect(result instanceof Domtify).toBe(true) // 保证链式调用
  })

  it("当匹配不到元素时返回 undefined", () => {
    const html = d(".non-existent").html()
    expect(html).toBeUndefined()
  })
})
