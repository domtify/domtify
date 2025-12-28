import { describe, it, expect, beforeEach } from "vitest"

import { dom } from "@/core.js"
import { prepend } from "@/methods/prepend.js"

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
    prepend("<span>Test</span>")(dom(".inner"))
    const html = document.querySelector(".container").innerHTML
    expect(html).toContain("<span>Test</span>")
  })

  it("HTMLCollection集合", () => {
    const ps = document.getElementsByTagName("p")
    prepend(ps)(dom(".inner"))
    expect(document.querySelectorAll(".inner p").length).toBe(2)
  })

  it("元素", () => {
    const h2 = document.querySelector("h2")
    prepend(h2)(dom(".inner"))
    expect(document.querySelectorAll("h2").length).toBe(2) // 被 clone 了一份
  })

  it("文本节点", () => {
    prepend("TEXT")(dom(".inner"))
    expect(document.querySelector(".inner").textContent).toContain("TEXT")
  })

  it("数组", () => {
    const h2 = document.querySelector("h2")
    prepend([h2, "X", "<i>italic</i>"])(dom(".inner"))
    const inner = document.querySelector(".inner")
    expect(inner.innerHTML).toMatch(/h2-1|X|<i>italic<\/i>/)
  })

  it("元素数组", () => {
    const h2s = dom("h2")
    prepend(h2s)(dom(".inner"))
    expect(document.querySelectorAll("h2").length).toBe(2)
  })

  it("支持函数返回字符串", () => {
    prepend((i, html) => `<b>idx-${i}</b>`)(dom(".inner"))
    const bolds = document.querySelectorAll(".inner b")
    expect(bolds.length).toBe(2)
    expect(bolds[0].textContent).toBe("idx-0")
  })

  it("函数返回HTMLCollection集合", () => {
    prepend(() => document.getElementsByTagName("p"))(dom(".inner"))
    expect(document.querySelectorAll(".inner p").length).toBe(2)
  })

  it("支持函数返回数组", () => {
    prepend(() => ["123", "<em>456</em>"])(dom(".inner"))
    const inner = document.querySelector(".inner")
    expect(inner.textContent).toContain("123")
    expect(inner.innerHTML).toContain("<em>456</em>")
  })
})
