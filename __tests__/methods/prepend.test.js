import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/prepend.js"

describe("prepend", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <h2>h2-1</h2>
    <p>ppp</p>
    <div class="container">
      <div class="inner">Hello</div>
      <div class="inner">Goodbye</div>
    </div>
    `
  })

  it("支持 HTML 字符串", () => {
    d(".inner").prepend("<span>Test</span>")
    const html = document.querySelector(".container").innerHTML
    expect(html).toContain("<span>Test</span>")
  })

  it("HTMLCollection集合", () => {
    const ps = document.getElementsByTagName("p")
    d(".inner").prepend(ps)
    expect(document.querySelectorAll(".inner p").length).toBe(2)
  })

  it("元素", () => {
    const h2 = document.querySelector("h2")
    d(".inner").prepend(h2)
    expect(document.querySelectorAll("h2").length).toBe(2) // 被 clone 了一份
  })

  it("文本节点", () => {
    d(".inner").prepend("TEXT")
    expect(document.querySelector(".inner").textContent).toContain("TEXT")
  })

  it("数组", () => {
    const h2 = document.querySelector("h2")
    d(".inner").prepend([h2, "X", "<i>italic</i>"])
    const inner = document.querySelector(".inner")
    expect(inner.innerHTML).toMatch(/h2-1|X|<i>italic<\/i>/)
  })

  it("domtify对象", () => {
    const h2s = d("h2")
    d(".inner").prepend(h2s)
    expect(document.querySelectorAll("h2").length).toBe(2)
  })

  it("支持函数返回字符串", () => {
    d(".inner").prepend((i, html) => `<b>idx-${i}</b>`)
    const bolds = document.querySelectorAll(".inner b")
    expect(bolds.length).toBe(2)
    expect(bolds[0].textContent).toBe("idx-0")
  })

  it("函数返回HTMLCollection集合", () => {
    d(".inner").prepend(() => document.getElementsByTagName("p"))
    expect(document.querySelectorAll(".inner p").length).toBe(2)
  })

  it("支持函数返回数组", () => {
    d(".inner").prepend(() => ["123", "<em>456</em>"])
    const inner = document.querySelector(".inner")
    expect(inner.textContent).toContain("123")
    expect(inner.innerHTML).toContain("<em>456</em>")
  })
})
