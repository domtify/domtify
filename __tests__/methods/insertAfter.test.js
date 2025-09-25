import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/insertAfter.js"

describe("insertAfter", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <h2>Greetings</h2>
        <div class="inner inner1">Hello</div>
        <div class="inner inner2">Goodbye</div>
      </div>
    `
  })

  it("支持选择器", () => {
    d("<p>Test</p>").insertAfter(".inner")
    const inners = document.querySelectorAll(".inner")
    expect(inners[0].nextElementSibling.tagName).toBe("P")
    expect(inners[1].nextElementSibling.tagName).toBe("P")
  })

  it("支持字符串(字符串实际上不会有任何反应,还是原来的dom结构)", () => {
    d("<p>Invalid</p>").insertAfter("<div>Fake</div>")
    expect(document.body.innerHTML).not.toContain("Invalid")
  })

  it("支持元素", () => {
    d("<p>After h2</p>").insertAfter(document.querySelector("h2"))
    expect(document.querySelector("h2").nextElementSibling.textContent).toBe(
      "After h2",
    )
  })

  it("支持数组", () => {
    const targets = [
      document.querySelector("h2"),
      document.querySelectorAll(".inner"),
    ]
    d("<span>Multi</span>").insertAfter(targets)
    const spans = document.querySelectorAll("span")
    expect(spans.length).toBe(3) // h2 + 2个 inner
  })

  it("空集合: 不报错", () => {
    expect(() => d("<p>xx</p>").insertAfter(".not-exist")).not.toThrow()
  })

  it("链式调用", () => {
    const el = d("<p>Chain</p>")
    const res = el.insertAfter("h2")
    expect(res).toBe(el)
  })
})
