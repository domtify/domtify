import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { append } from "@/methods/append.js"

describe("append", () => {
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
    append("<span>Test</span>")(el(".inner"))
    const html = document.querySelector(".container").innerHTML
    expect(html).toContain("<span>Test</span>")
  })

  it("HTMLCollection集合", () => {
    const ps = document.getElementsByTagName("p")
    append(ps)(el(".inner"))
    expect(document.querySelectorAll(".inner p").length).toBe(2)
  })

  it("元素", () => {
    const h2 = document.querySelector("h2")
    append(h2)(el(".inner"))
    expect(document.querySelectorAll("h2").length).toBe(2) // 被 clone 了一份
  })

  it("文本节点", () => {
    append("TEXT")(el(".inner"))
    expect(document.querySelector(".inner").textContent).toContain("TEXT")
  })

  it("数组", () => {
    const h2 = document.querySelector("h2")
    append([h2, "X", "<i>italic</i>"])(el(".inner"))
    const inner = document.querySelector(".inner")
    expect(inner.innerHTML).toMatch(/h2-1|X|<i>italic<\/i>/)
  })

  it("元素数组", () => {
    const h2s = el("h2")
    append(h2s)(el(".inner"))
    expect(document.querySelectorAll("h2").length).toBe(2)
  })

  it("支持函数返回字符串", () => {
    append((i, html) => `<b>idx-${i}</b>`)(el(".inner"))
    const bolds = document.querySelectorAll(".inner b")
    expect(bolds.length).toBe(2)
    expect(bolds[0].textContent).toBe("idx-0")
  })

  it("函数返回HTMLCollection集合", () => {
    append(() => document.getElementsByTagName("p"))(el(".inner"))
    expect(document.querySelectorAll(".inner p").length).toBe(2)
  })

  it("支持函数返回数组", () => {
    append(() => ["123", "<em>456</em>"])(el(".inner"))
    const inner = document.querySelector(".inner")
    expect(inner.textContent).toContain("123")
    expect(inner.innerHTML).toContain("<em>456</em>")
  })
})
