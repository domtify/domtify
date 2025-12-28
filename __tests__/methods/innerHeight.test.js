import { describe, it, expect, beforeEach, vi } from "vitest"

import { query } from "@/core.js"
import { innerHeight } from "@/methods/innerHeight.js"
import { mockViewport } from "../helpers/viewport.js"
import $ from "jquery"

describe("innerHeight", () => {
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
    expect($(window).innerHeight()).toBe(800)
    mockViewport({ height: 600 })
    expect($(window).innerHeight()).toBe(600)
  })

  it("domtify:获取 window 高度", () => {
    mockViewport({ height: 800 })
    expect(innerHeight()(query(window))).toBe(800)
    mockViewport({ height: 600 })
    expect(innerHeight()(query(window))).toBe(600)
  })

  it("jquery:获取 document 高度", () => {
    document.documentElement.style.height = "980px"
    document.body.style.height = "1000px"

    expect($(document).innerHeight()).toBe(1020)
  })

  it("domtify:获取 document 高度", () => {
    document.documentElement.style.height = "980px"
    document.body.style.height = "1000px"

    expect(innerHeight()(query(document))).toBe(1020)
  })

  it("jquery:border-box 元素", () => {
    expect($(".border-box").innerHeight()).toBe(180.8)
  })

  it("domtify:border-box 元素", () => {
    expect(innerHeight()(query(".border-box"))).toBe(180.8)
  })

  it("jquery:content-box 元素", () => {
    expect($(".content-box").innerHeight()).toBe(220)
  })

  it("domtify:content-box 元素", () => {
    expect(innerHeight()(query(".content-box"))).toBe(220)
  })

  it("jquery:setter-数字", () => {
    $(".box").innerHeight(100)
    expect(borderBoxEl.style.height).toBe("119.2px")
    expect(contentBoxEl.style.height).toBe("80px")
  })

  it("domtify:setter-数字", () => {
    innerHeight(100)(query(".box"))
    expect(borderBoxEl.style.height).toBe("119.2px")
    expect(contentBoxEl.style.height).toBe("80px")
  })

  it("jquery:setter-数字字符串", () => {
    $(".box").innerHeight("100")
    expect(borderBoxEl.style.height).toBe("119.2px")
    expect(contentBoxEl.style.height).toBe("80px")
  })

  it("domtify:setter-数字字符串", () => {
    innerHeight("100")(query(".box"))
    expect(borderBoxEl.style.height).toBe("119.2px")
    expect(contentBoxEl.style.height).toBe("80px")
  })

  it("jquery:setter-带单位的字符串 如“em”、“％”、“rem”等", () => {
    $(".box").innerHeight("10em")
    expect(borderBoxEl.style.height).toBe("179.2px")
    expect(contentBoxEl.style.height).toBe("140px")
  })

  it("domtify:setter-带单位的字符串 如“em”、“％”、“rem”等", () => {
    innerHeight("10em")(query(".box"))
    expect(borderBoxEl.style.height).toBe("179.2px")
    expect(contentBoxEl.style.height).toBe("140px")
  })

  it("jquery:setter-带错误单位的字符串", () => {
    $(".box").innerHeight("10pq")
    expect(borderBoxEl.style.height).toBe("219.2px")
    expect(contentBoxEl.style.height).toBe("180px")
  })

  it("setter-带错误单位的字符串", () => {
    innerHeight("10pq")(query(".box"))
    expect(borderBoxEl.style.height).toBe("219.2px")
    expect(contentBoxEl.style.height).toBe("180px")
  })

  it("jquery:setter-函数", () => {
    const fn = vi.fn(() => "100")
    $(".box").innerHeight(fn)
    expect(fn.mock.calls[0][0]).toBe(0)
    expect(fn.mock.calls[0][1]).toBe(180.8)
    expect(fn.mock.calls[1][0]).toBe(1)
    expect(fn.mock.calls[1][1]).toBe(220)
    expect(borderBoxEl.style.height).toBe("119.2px")
    expect(contentBoxEl.style.height).toBe("80px")
  })

  it("domtify:setter-函数", () => {
    const fn = vi.fn(() => "100")

    innerHeight(fn)(query(".box"))
    expect(fn.mock.calls[0][0]).toBe(0)
    expect(fn.mock.calls[0][1]).toBe(180.8)
    expect(fn.mock.calls[1][0]).toBe(1)
    expect(fn.mock.calls[1][1]).toBe(220)
    expect(borderBoxEl.style.height).toBe("119.2px")
    expect(contentBoxEl.style.height).toBe("80px")
  })
})
