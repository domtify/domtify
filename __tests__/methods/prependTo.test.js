import { describe, it, expect, beforeEach } from "vitest"

import { query } from "@/core.js"
import { prependTo } from "@/methods/prependTo.js"

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
    prependTo("h2")(query(".inner"))
    const h2 = document.querySelector("h2")

    expect(h2.firstElementChild.classList.contains("inner")).toBe(true)
    expect(h2.firstElementChild.textContent).toBe("Hello")
  })

  it("支持 HTML 字符串", () => {
    prependTo("<p>Test</p>")(query(".inner"))
    const p = document.querySelector("p")

    expect(document.querySelector(".container .inner")).toBe(null)
  })

  it("支持单个 DOM 元素", () => {
    const h2 = document.querySelector("h2")
    prependTo(h2)(query(".inner"))

    expect(h2.firstElementChild.classList.contains("inner")).toBe(true)
  })

  it("支持 HTMLCollection", () => {
    const ps = document.getElementsByTagName("p")
    prependTo([ps])(query(".inner"))

    for (const p of ps) {
      expect(p.firstElementChild.classList.contains("inner")).toBe(true)
    }
  })

  it("支持数组 (多个目标)", () => {
    prependTo([document.querySelector("h2"), document.querySelector("h3")])(
      query(".inner"),
    )

    const h2 = document.querySelector("h2")
    const h3 = document.querySelector("h3")

    expect(h2.firstElementChild.classList.contains("inner")).toBe(true)
    expect(h3.firstElementChild.classList.contains("inner")).toBe(true)
  })

  it("元素对象", () => {
    prependTo(query("h2"))(query(".inner"))
    const h2 = document.querySelector("h2")

    expect(h2.firstElementChild.classList.contains("inner")).toBe(true)
  })

  it("返回被插入的元素本身", () => {
    const res = prependTo("h2")(query(".inner"))
    expect(res.length).toBe(2)
  })
})
