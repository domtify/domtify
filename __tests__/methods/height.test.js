import { describe, it, expect, beforeEach, vi } from "vitest"

import { el } from "@/core.js"
import { height } from "@/methods/height.js"

describe("height", () => {
  let borderBoxEl
  let contentBoxEl
  beforeEach(() => {
    const style = document.createElement("style")
    style.textContent = `
      .box {
        border: 10px solid red;
        height: 50px;
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
    // 直接修改 document.body 高度
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      configurable: true,
    })
    expect(height()(el(window))).toBe(800)

    Object.defineProperty(window, "innerHeight", {
      value: 600,
      configurable: true,
    })
    expect(height()(el(window))).toBe(600)
  })

  it("获取 document 高度", () => {
    document.body.style.height = "1000px"
    document.documentElement.style.height = "980px"
    expect(height()(el(document))).toBe(1000)
  })

  it("border-box 元素", () => {
    const resule = height()(el(".border-box"))

    expectPixelEqual(resule, 30.8)
  })

  it("content-box 元素", () => {
    const resule = height()(el(".content-box"))
    expect(resule).toBe(50)
  })

  it("设置高度", () => {
    height(100)(el("div"))
    expectPixelEqual(borderBoxEl.style.height, "119.2px")
    expectPixelEqual(contentBoxEl.style.height, "100px")
  })

  it("设置高度-数字字符串", () => {
    height("100.1")(el("div"))
    expectPixelEqual(borderBoxEl.style.height, "119.3px")
    expectPixelEqual(contentBoxEl.style.height, "100.1px")
  })

  it.only("设置高度-带单位的字符串 如“em”、“％”、“rem”等", () => {
    height("10em")(el("div"))

    expectPixelEqual(borderBoxEl.style.height, "179.2px")
    expectPixelEqual(contentBoxEl.style.height, "10em")
  })

  it("设置高度-带错误单位的字符串", () => {
    height("10pq")(el(".box"))
    expectPixelEqual(borderBoxEl.style.height, "69.2px")
    expect(contentBoxEl.style.height).toBe("")
  })

  it("设置高度-函数", () => {
    const fn = vi.fn(() => "100")

    height(fn)(el(".box"))

    expect(fn.mock.calls[0][0]).toBe(0)
    expectPixelEqual(fn.mock.calls[0][1], 30.8)

    expect(fn.mock.calls[1][0]).toBe(1)
    expectPixelEqual(fn.mock.calls[1][1], 50)

    expectPixelEqual(borderBoxEl.style.height, "119.2px")
    expectPixelEqual(contentBoxEl.style.height, "100px")
  })
})
