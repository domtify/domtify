import { describe, it, expect, beforeEach, vi } from "vitest"

import { el } from "@/core.js"
import { innerWidth } from "@/methods/innerWidth.js"

describe("innerWidth", () => {
  let borderBoxEl
  let contentBoxEl
  beforeEach(() => {
    const style = document.createElement("style")
    style.textContent = `
      .box {
        border: 10px solid red;
        height: 50px;
        width: 200px;
      }
      .border-box {
        box-sizing: border-box;
      }
      .content-box {
        box-sizing: content-box;
      }
    `
    document.head.appendChild(style)

    document.body.innerHTML = `
    <div class="box border-box">.border-box</div>
    <div class="box content-box">.content-box</div>
    `

    borderBoxEl = document.querySelector(".border-box")
    contentBoxEl = document.querySelector(".content-box")
  })

  it("获取 window 高度", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 800,
      configurable: true,
    })
    expect(innerWidth()(el(window))).toBe(800)

    Object.defineProperty(window, "innerWidth", {
      value: 600,
      configurable: true,
    })
    expect(innerWidth()(el(window))).toBe(600)
  })

  it("获取 document 高度", () => {
    document.body.style.width = "1000px"
    document.documentElement.style.width = "980px"
    expect(innerWidth()(el(document))).toBe(1000)
  })

  it("border-box 元素", () => {
    const result = innerWidth()(el(".border-box"))
    expectPixelEqual(result, 180.8)
  })

  it("content-box 元素", () => {
    const result = innerWidth()(el(".content-box"))
    expectPixelEqual(result, 200)
  })

  it("数字", () => {
    innerWidth(100)(el("div"))
    expectPixelEqual(borderBoxEl.style.width, "119.2px")
    expectPixelEqual(contentBoxEl.style.width, "100px")
  })

  it("数字字符串", () => {
    innerWidth("100.1")(el("div"))
    expectPixelEqual(borderBoxEl.style.width, "119.3px")
    expectPixelEqual(contentBoxEl.style.width, "100.1px")
  })

  it("带单位的字符串 如“em”、“％”、“rem”等", () => {
    innerWidth("10em")(el("div"))
    expectPixelEqual(borderBoxEl.style.width, "179.2px")
    expectPixelEqual(contentBoxEl.style.width, "10em")
  })

  it("带错误单位的字符串", () => {
    innerWidth("10pq")(el(".box"))
    expectPixelEqual(borderBoxEl.style.width, "219.2px")
    expect(contentBoxEl.style.width).toBe("")
  })

  it("函数", () => {
    const fn = vi.fn(() => "100")

    innerWidth(fn)(el(".box"))

    expect(fn.mock.calls[0][0]).toBe(0)
    expectPixelEqual(fn.mock.calls[0][1], 180.8)
    expect(fn.mock.calls[1][0]).toBe(1)
    expectPixelEqual(fn.mock.calls[1][1], 200)
    expectPixelEqual(borderBoxEl.style.width, "119.2px")
    expectPixelEqual(contentBoxEl.style.width, "100px")
  })
})
