import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/prependTo.js"

describe("prependTo", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <p>foo</p>
      <p>bar</p>
      <h2>Greetings</h2>
      <h3>Greetings-3</h3>
      <div class="container">
        <div class="inner">Hello</div>
        <div class="inner">Goodbye</div>
      </div>
    `
  })

  it("支持选择器", () => {
    d(".inner").prependTo("h2")
    const h2 = document.querySelector("h2")

    expect(h2.firstElementChild.classList.contains("inner")).toBe(true)
    expect(h2.firstElementChild.textContent).toBe("Hello")
  })

  it("支持 HTML 字符串", () => {
    d(".inner").prependTo("<p>Test</p>")
    const p = document.querySelector("p")

    expect(document.querySelector(".container .inner")).toBe(null)
  })

  it("支持单个 DOM 元素", () => {
    const h2 = document.querySelector("h2")
    d(".inner").prependTo(h2)

    expect(h2.firstElementChild.classList.contains("inner")).toBe(true)
  })

  it("支持 HTMLCollection", () => {
    const ps = document.getElementsByTagName("p")
    d(".inner").prependTo([ps])

    for (const p of ps) {
      expect(p.firstElementChild.classList.contains("inner")).toBe(true)
    }
  })

  it("支持数组 (多个目标)", () => {
    d(".inner").prependTo([
      document.querySelector("h2"),
      document.querySelector("h3"),
    ])

    const h2 = document.querySelector("h2")
    const h3 = document.querySelector("h3")

    expect(h2.firstElementChild.classList.contains("inner")).toBe(true)
    expect(h3.firstElementChild.classList.contains("inner")).toBe(true)
  })

  it("支持domtify 对象", () => {
    d(".inner").prependTo(d("h2"))
    const h2 = document.querySelector("h2")

    expect(h2.firstElementChild.classList.contains("inner")).toBe(true)
  })

  it("返回被插入的元素本身", () => {
    const res = d(".inner").prependTo("h2")

    expect(res).toBeInstanceOf(d) // 保持链式调用
    expect(res.length).toBe(2)
  })
})
