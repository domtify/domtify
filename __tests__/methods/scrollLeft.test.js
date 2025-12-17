import { describe, it, expect, beforeEach, vi } from "vitest"

import { el } from "@/core.js"
import { scrollLeft } from "@/methods/scrollLeft.js"

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

    expectPixelEqual(scrollLeft()(el(div)), 123.19999694824219)
  })

  it("数值", () => {
    scrollLeft(200)(el(div))
    expect(div.scrollLeft).toBe(200)
  })

  it("函数", () => {
    div.scrollLeft = 50

    const fn = vi.fn(() => 50 + 25)

    scrollLeft(fn)(el(div))
    expect(fn.mock.calls[0][0]).toBe(0)
    expectPixelEqual(fn.mock.calls[0][1], 50.400001525878906)
    expectPixelEqual(div.scrollLeft, 75.19999694824219)
  })

  it("没有元素时返回 undefined", () => {
    expect(scrollLeft()(el())).toBeUndefined()
  })
})
