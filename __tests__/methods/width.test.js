import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/width.js"

describe("width", () => {
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
    // 直接修改 document.body 高度
    Object.defineProperty(window, "innerWidth", {
      value: 800,
      configurable: true,
    })
    expect(d(window).width()).toBe(800)

    Object.defineProperty(window, "innerWidth", {
      value: 600,
      configurable: true,
    })
    expect(d(window).width()).toBe(600)
  })

  it("获取 document 高度", () => {
    document.body.style.width = "1000px"
    document.documentElement.style.width = "980px"
    expect(d(document).width()).toBe(1000)
  })

  it("border-box 元素", () => {
    const result = d(".border-box").width()
    expectPixelEqual(result, 180.8)
  })

  it("content-box 元素", () => {
    const result = d(".content-box").width()
    expectPixelEqual(result, 200)
  })

  it("数字", () => {
    d("div").width(100)
    expectPixelEqual(borderBoxEl.style.width, "119.2px")
    expectPixelEqual(contentBoxEl.style.width, "100px")
  })

  it("数字字符串", () => {
    d("div").width("100.1")
    expectPixelEqual(borderBoxEl.style.width, "119.3px")
    expectPixelEqual(contentBoxEl.style.width, "100.1px")
  })

  it("带单位的字符串 如“em”、“％”、“rem”等", () => {
    d("div").width("10em")
    expectPixelEqual(borderBoxEl.style.width, "179.2px")
    expectPixelEqual(contentBoxEl.style.width, "10em")
  })

  it("带错误单位的字符串", () => {
    d(".box").width("10pq")
    expectPixelEqual(borderBoxEl.style.width, "219.2px")
    expect(contentBoxEl.style.width).toBe("")
  })

  it("函数", () => {
    const fn = vi.fn(() => "100")

    d(".box").width(fn)

    expect(fn.mock.calls[0][0]).toBe(0)
    expectPixelEqual(fn.mock.calls[0][1], 180.8)
    expect(fn.mock.calls[1][0]).toBe(1)
    expectPixelEqual(fn.mock.calls[1][1], 200)

    expectPixelEqual(borderBoxEl.style.width, "119.2px")
    expectPixelEqual(contentBoxEl.style.width, "100px")
  })
})
