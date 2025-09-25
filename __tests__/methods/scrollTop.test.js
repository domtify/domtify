import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/scrollTop.js"

describe("scrollTop", () => {
  let div
  beforeEach(() => {
    div = document.createElement("div")
    div.style.width = "100px"
    div.style.height = "50px"
    div.style.overflow = "auto"
    div.style.whiteSpace = "nowrap"

    // 塞一个很宽的内容让它能滚动
    const content = document.createElement("div")
    content.style.width = "100px"
    content.style.height = "1000px"
    div.appendChild(content)

    document.body.appendChild(div)
  })

  it("无参数时应该返回", () => {
    div.scrollTop = 123
    const rew = d(div).scrollTop()
    expectPixelEqual(rew, 123.19999694824219)
  })

  it("数值", () => {
    d(div).scrollTop(200)
    expect(div.scrollTop).toBe(200)
  })

  it("函数", () => {
    div.scrollTop = 100
    const fn = vi.fn(() => 60 + 40)
    d(div).scrollTop(fn)
    expect(fn.mock.calls[0][0]).toBe(0)
    expect(fn.mock.calls[0][1]).toBe(100)
    expect(div.scrollTop).toBe(100)
  })

  it("没有元素时返回 undefined", () => {
    expect(d().scrollTop()).toBeUndefined()
  })
})
