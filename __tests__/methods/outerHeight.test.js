import { describe, it, expect, beforeEach, vi } from "vitest"

import { el } from "@/core.js"
import { outerHeight } from "@/methods/outerHeight.js"

describe("outerHeight", () => {
  let borderBoxEl
  let contentBoxEl
  beforeEach(() => {
    const style = document.createElement("style")
    style.textContent = `
    
      .box {
        border: 10px solid red;
        height: 50px;
        margin: 20px;
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
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      configurable: true,
    })

    expect(outerHeight()(el(window))).toBe(800)

    Object.defineProperty(window, "innerHeight", {
      value: 600,
      configurable: true,
    })
    expect(outerHeight()(el(window))).toBe(600)
  })

  it("获取 document 高度", () => {
    document.body.style.height = "1000px"
    expect(outerHeight()(el(document))).toBe(1020)

    document.body.style.height = "2000px"
    expect(outerHeight()(el(document))).toBe(2020)
  })
  it("border-box 元素", () => {
    const result = outerHeight()(el(".border-box"))
    expectPixelEqual(result, 50)
  })

  it("content-box 元素", () => {
    const result = outerHeight()(el(".content-box"))
    expectPixelEqual(result, 69.2)
  })

  it("设置高度", () => {
    outerHeight(100)(el("div"))
    expectPixelEqual(borderBoxEl.style.height, "100px")
    expectPixelEqual(contentBoxEl.style.height, "80.8px")
  })

  it("设置高度-数字字符串", () => {
    outerHeight("100.1")(el("div"))
    expectPixelEqual(borderBoxEl.style.height, "100.1px")
    expectPixelEqual(contentBoxEl.style.height, "80.9px")
  })

  it("设置高度-带单位的字符串 如“em”、“％”、“rem”等", () => {
    outerHeight("10em")(el("div"))
    expectPixelEqual(borderBoxEl.style.height, "10em")
    expectPixelEqual(contentBoxEl.style.height, "140.8px")
  })

  it("设置高度-带错误单位的字符串", () => {
    outerHeight("10pq")(el(".box"))
    expect(borderBoxEl.style.height).toBe("")
    expectPixelEqual(contentBoxEl.style.height, "30.8px")
  })

  it("设置值时包括margin", () => {
    outerHeight(100, true)(el(".box"))
    expectPixelEqual(borderBoxEl.style.height, "60px")
    expectPixelEqual(contentBoxEl.style.height, "40.8px")
  })

  it("设置高度-函数", () => {
    const fn = vi.fn(() => "100")

    outerHeight(fn)(el(".box"))

    expect(fn.mock.calls[0][0]).toBe(0)
    expectPixelEqual(fn.mock.calls[0][1], 50)

    expect(fn.mock.calls[1][0]).toBe(1)
    expectPixelEqual(fn.mock.calls[1][1], 69.2)

    expectPixelEqual(borderBoxEl.style.height, "100px")
    expectPixelEqual(contentBoxEl.style.height, "80.8px")
  })
})
