import { describe, it, expect, beforeEach, vi } from "vitest"

import { query } from "@/core.js"
import { scrollTop } from "@/methods/scrollTop.js"

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
    const res = scrollTop()(query(div))
    expectPixelEqual(res, 123.19999694824219)
  })

  it("数值", () => {
    scrollTop(200)(query(div))
    expect(div.scrollTop).toBe(200)
  })

  it("函数", () => {
    div.scrollTop = 100
    const fn = vi.fn(() => 60 + 40)
    scrollTop(fn)(query(div))
    expect(fn.mock.calls[0][0]).toBe(0)
    expect(fn.mock.calls[0][1]).toBe(100)
    expect(div.scrollTop).toBe(100)
  })

  it("没有元素时返回 undefined", () => {
    expect(scrollTop()(query())).toBeUndefined()
  })
})
