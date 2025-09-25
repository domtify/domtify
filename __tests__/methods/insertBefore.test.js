import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/insertBefore.js"

describe("insertBefore", () => {
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
    d("<p>Test</p>").insertBefore(".inner")
    const container = document.querySelector(".container")
    const pList = container.querySelectorAll("p")
    expect(pList.length).toBe(2)
    expect(container.firstElementChild.tagName).toBe("H2")
    expect(container.children[1].tagName).toBe("P") // 在 inner1 前
  })

  it("支持字符串(字符串实际上不会有任何反应,还是原来的dom结构)", () => {
    d("<p>Invalid</p>").insertBefore("<div>Fake</div>")
    expect(document.body.innerHTML).not.toContain("Invalid")
  })

  it("支持元素", () => {
    d("<p>Before h2</p>").insertBefore(document.querySelector("h2"))
    const container = document.querySelector(".container")
    expect(container.firstElementChild.tagName).toBe("P")
    expect(container.firstElementChild.textContent).toBe("Before h2")
  })

  it("支持数组", () => {
    const targets = [
      document.querySelector("h2"),
      document.querySelectorAll(".inner"),
    ]
    d("<span>Multi</span>").insertBefore(targets)
    const spans = document.querySelectorAll("span")
    expect(spans.length).toBe(3) // h2 + 2个 inner 前面各有一个
    expect(spans[0].nextElementSibling.tagName).toBe("H2")
    expect(spans[1].nextElementSibling.classList.contains("inner1")).toBe(true)
  })

  it("空集合: 不报错", () => {
    expect(() => d("<p>xx</p>").insertBefore(".not-exist")).not.toThrow()
  })

  it("链式调用", () => {
    const el = d("<p>Chain</p>")
    const res = el.insertBefore("h2")
    expect(res).toBe(el)
  })
})
