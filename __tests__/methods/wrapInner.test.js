import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d, Domtify } from "@/core.js"

// 按需导入
import "@/methods/get.js"
import "@/methods/wrapInner.js"

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
    const inner = d(".inner")
    inner.wrapInner("<span class='wrap'></span>")

    inner.get().forEach((el) => {
      const wrap = el.querySelector(".wrap")
      expect(wrap).not.toBeNull()
      // 原内容移动到 wrapper 内部
      expect(wrap.textContent).toBe(el.textContent)
    })
  })

  it("选择器", () => {
    const res = d(".inner").wrapInner(".double")

    expect(res.get(0).firstElementChild.classList.contains("double")).toBe(true)
    expect(res.get(1).firstElementChild.classList.contains("double")).toBe(true)
  })

  it("集合对象", () => {
    const res = d(".inner").wrapInner(d(".double"))

    expect(res.get(0).firstElementChild.classList.contains("double")).toBe(true)
    expect(res.get(1).firstElementChild.classList.contains("double")).toBe(true)
  })

  it("元素", () => {
    const res = d(".inner").wrapInner(document.querySelector(".double"))

    expect(res.get(0).firstElementChild.classList.contains("double")).toBe(true)
    expect(res.get(1).firstElementChild.classList.contains("double")).toBe(true)
  })

  it("函数-返回字符串", () => {
    const res = d(".inner").wrapInner(function (index) {
      expect(Number.isInteger(index) && index >= 0).toBe(true)
      return "<div class='new'></div>"
    })

    expect(res.get(0).firstElementChild.classList.contains("new")).toBe(true)
    expect(res.get(1).firstElementChild.classList.contains("new")).toBe(true)
  })

  it("边缘情况测试数字", () => {
    const res = d(".inner").wrapInner(123)
    expect(res.length).toBe(2)
    expect(res instanceof Domtify).toBe(true)
  })
})
