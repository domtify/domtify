import { describe, it, expect, beforeEach, vi } from "vitest"

import { query } from "@/core.js"
import { wrapInner } from "@/methods/wrapInner.js"

describe("wrapInner", () => {
  beforeEach(() => {
    let container
    document.body.innerHTML = `
    <div class="container">
      <div class="inner">Hello</div>
      <div class="inner">Goodbye</div>
    </div>
    <div class="double"><div></div></div>
    <div class="double">
      <div><div></div></div>
    </div>
    `
    container = document.querySelector(".container")
  })

  it("html字符串", () => {
    const inner = query(".inner")
    wrapInner("<span class='wrap'></span>")(inner)

    inner.forEach((el) => {
      const wrap = el.querySelector(".wrap")
      expect(wrap).not.toBeNull()
      // 原内容移动到 wrapper 内部
      expect(wrap.textContent).toBe(el.textContent)
    })
  })

  it("选择器", () => {
    const res = wrapInner(".double")(query(".inner"))

    expect(res[0].firstElementChild.classList.contains("double")).toBe(true)
    expect(res[1].firstElementChild.classList.contains("double")).toBe(true)
  })

  it("元素数组", () => {
    const res = wrapInner(query(".double"))(query(".inner"))

    expect(res[0].firstElementChild.classList.contains("double")).toBe(true)
    expect(res[1].firstElementChild.classList.contains("double")).toBe(true)
  })

  it("元素", () => {
    const res = wrapInner(document.querySelector(".double"))(query(".inner"))

    expect(res[0].firstElementChild.classList.contains("double")).toBe(true)
    expect(res[1].firstElementChild.classList.contains("double")).toBe(true)
  })

  it("函数-返回字符串", () => {
    const res = wrapInner(function (index) {
      expect(Number.isInteger(index) && index >= 0).toBe(true)
      return "<div class='new'></div>"
    })(query(".inner"))

    expect(res[0].firstElementChild.classList.contains("new")).toBe(true)
    expect(res[1].firstElementChild.classList.contains("new")).toBe(true)
  })

  it("边缘情况测试数字", () => {
    const res = wrapInner(123)(query(".inner"))
    expect(res.length).toBe(2)

    expect(Array.isArray(res)).toBe(true)
  })
})
