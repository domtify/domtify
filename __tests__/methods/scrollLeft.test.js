import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/scrollLeft.js"

describe("scrollLeft", () => {
  let div
  beforeEach(() => {
    div = document.createElement("div")
    div.style.width = "100px"
    div.style.height = "50px"
    div.style.overflow = "auto"
    div.style.whiteSpace = "nowrap"

    // 塞一个很宽的内容让它能滚动
    const content = document.createElement("div")
    content.style.width = "1000px"
    content.style.height = "100px"
    div.appendChild(content)

    document.body.appendChild(div)
  })

  it("无参数时应该返回", () => {
    div.scrollLeft = 123

    expectPixelEqual(d(div).scrollLeft(), 123.19999694824219)
  })

  it("数值", () => {
    d(div).scrollLeft(200)
    expect(div.scrollLeft).toBe(200)
  })

  it("函数", () => {
    div.scrollLeft = 50

    const fn = vi.fn(() => 50 + 25)

    d(div).scrollLeft(fn)
    expect(fn.mock.calls[0][0]).toBe(0)
    expectPixelEqual(fn.mock.calls[0][1], 50.400001525878906)
    expectPixelEqual(div.scrollLeft, 75.19999694824219)
  })

  it("没有元素时返回 undefined", () => {
    expect(d().scrollLeft()).toBeUndefined()
  })
})
