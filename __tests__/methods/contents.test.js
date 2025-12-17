import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { contents } from "@/methods/contents.js"

describe("contents", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        文本节点
        <span>子元素</span>
        <!-- 注释节点 -->
      </div>
    `
  })

  it("应返回所有子节点（包括文本、注释和元素）", () => {
    const res = contents()(el(".container"))

    expect(res.length).toBeGreaterThanOrEqual(2)

    const hasTextNode = res.some((n) => n.nodeType === Node.TEXT_NODE)
    const hasElementNode = res.some((n) => n.nodeType === Node.ELEMENT_NODE)
    const hasCommentNode = res.some((n) => n.nodeType === Node.COMMENT_NODE)

    expect(hasTextNode).toBe(true)
    expect(hasElementNode).toBe(true)
    expect(hasCommentNode).toBe(true)
  })

  it("如果同域iframe,则可以获取 iframe 的内容文档", () => {
    const mockIframe = document.createElement("iframe")

    //Mock iframe 的contentDocument属性的值
    Object.defineProperty(mockIframe, "contentDocument", {
      value: document.implementation.createHTMLDocument("mock"),
    })

    const result = contents()(el([mockIframe]))
    expect(result[0]).toBeInstanceOf(Document) // 证明访问到了返回doc
  })

  it("跨域 iframe 抛出异常应被捕获", () => {
    const mockIframe = document.createElement("iframe")

    Object.defineProperty(mockIframe, "tagName", {
      value: "IFRAME",
    })

    // 模拟访问 contentDocument 时抛出异常
    Object.defineProperty(mockIframe, "contentDocument", {
      get() {
        throw new Error("跨域访问被拒绝")
      },
    })

    const fn = () => contents()(el(mockIframe)) // 不应抛出
    expect(fn).not.toThrow()

    const result = contents()(el(mockIframe))
    expect(result.length).toEqual(0) // 因为没能获取内容文档
  })
})
