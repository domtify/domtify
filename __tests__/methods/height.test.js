import { describe, it, expect, beforeEach, vi } from "vitest"

import { query } from "@/core.js"
import { height } from "@/methods/height.js"
import $ from "jquery"
import { mockViewport } from "../helpers/viewport.js"

describe("height", () => {
  let borderBoxEl
  let contentBoxEl

  beforeEach(() => {
    const style = document.createElement("style")
    style.textContent = `
      .box {
        height: 200px;
        width: 200px;
        padding: 10px;
        margin: 20px;
        border: 10px solid red;
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

  it("jquery:获取 window 高度", () => {
    mockViewport({ height: 800 })

    expect($(window).height()).toBe(800)

    mockViewport({ height: 600 })

    expect($(window).height()).toBe(600)
  })

  it("domtify:获取 window 高度", () => {
    mockViewport({ height: 800 })

    expect(height()(query(window))).toBe(800)

    mockViewport({ height: 600 })

    expect(height()(query(window))).toBe(600)
  })

  it("jquery:获取 document 高度", () => {
    document.documentElement.style.height = "980px"
    document.body.style.height = "1000px"

    expect($(document).height()).toBe(1020)
  })
  it("domtify:获取 document 高度", () => {
    document.documentElement.style.height = "980px"
    document.body.style.height = "1000px"

    expect(height()(query(document))).toBe(1020)
  })

  it("jquery:border-box 元素", () => {
    expect($(".border-box").height()).toBe(160.8)
  })
  it("domtify:border-box 元素", () => {
    expect(height()(query(".border-box"))).toBe(160.8)
  })

  it("jquery:content-box 元素", () => {
    expect($(".content-box").height()).toBe(200)
  })

  it("domtify:content-box 元素", () => {
    expect(height()(query(".content-box"))).toBe(200)
  })

  it("jquery:setter:number", () => {
    $(".box").height(100)
    expect(borderBoxEl.style.height).toBe("139.2px")
    expect(contentBoxEl.style.height).toBe("100px")
  })

  it("domtify:setter:number", () => {
    height(100)(query(".box"))
    expect(borderBoxEl.style.height).toBe("139.2px")
    expect(contentBoxEl.style.height).toBe("100px")
  })

  it("jquery:setter: 数字字符串", () => {
    $(".box").height("100")
    expect(borderBoxEl.style.height).toBe("139.2px")
    expect(contentBoxEl.style.height).toBe("100px")
  })

  it("domtify:setter: 数字字符串", () => {
    height("100")(query(".box"))
    expect(borderBoxEl.style.height).toBe("139.2px")
    expect(contentBoxEl.style.height).toBe("100px")
  })

  it("jquery:设置高度-带单位的字符串 如“em”、“％”、“rem”等", () => {
    $(".box").height("10em")

    expect(borderBoxEl.style.height).toBe("199.2px")
    expect(contentBoxEl.style.height).toBe("10em")
  })

  it("domtify:设置高度-带单位的字符串 如“em”、“％”、“rem”等", () => {
    height("10em")(query(".box"))

    expect(borderBoxEl.style.height).toBe("199.2px")
    expect(contentBoxEl.style.height).toBe("10em")
  })

  it("jquery:设置高度-带错误单位的字符串", () => {
    $(".box").height("10pq")
    expect(borderBoxEl.style.height).toBe("239.2px")
    expect(contentBoxEl.style.height).toBe("")
  })

  it("domtify:设置高度-带错误单位的字符串", () => {
    height("10pq")(query(".box"))
    expect(borderBoxEl.style.height).toBe("239.2px")
    expect(contentBoxEl.style.height).toBe("")
  })

  it("jquery:设置高度-函数", () => {
    const fn = vi.fn(() => "100")

    $(".box").height(fn)

    expect(fn.mock.calls[0][0]).toBe(0)
    expect(fn.mock.calls[0][1]).toBe(160.8)

    expect(fn.mock.calls[1][0]).toBe(1)
    expect(fn.mock.calls[1][1]).toBe(200)

    expect(borderBoxEl.style.height).toBe("139.2px")
    expect(contentBoxEl.style.height).toBe("100px")
  })

  it("domtify:设置高度-函数", () => {
    const fn = vi.fn(() => "100")

    height(fn)(query(".box"))

    expect(fn.mock.calls[0][0]).toBe(0)
    expect(fn.mock.calls[0][1]).toBe(160.8)

    expect(fn.mock.calls[1][0]).toBe(1)
    expect(fn.mock.calls[1][1]).toBe(200)

    expect(borderBoxEl.style.height).toBe("139.2px")
    expect(contentBoxEl.style.height).toBe("100px")
  })
})
