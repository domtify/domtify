import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/utilities/parseHTML.js"

describe("parseHTML", () => {
  const htmlStr = `hello, <b>my name is</b> <script>alert('xss')</script> <span>ModernJS</span>`

  beforeEach(() => {
    // 添加初始 DOM，用于测试
    document.body.innerHTML = `
     <p></p>
    `
  })

  it("解析字符串为节点数组", () => {
    const nodes = d.parseHTML(htmlStr)
    expect(Array.isArray(nodes)).toBe(true)
    // 默认不保留 script
    const nodeNames = nodes.map((n) => n.nodeName.toLowerCase())
    expect(nodeNames).toContain("b")
    expect(nodeNames).toContain("span")
    expect(nodeNames).not.toContain("script")
  })

  it("指定 context 为当前 document", () => {
    const nodes = d.parseHTML(htmlStr, document)
    nodes.forEach((node) => {
      expect(node.ownerDocument).toBe(document)
    })
  })

  it("保留 script 标签", () => {
    const nodes = d.parseHTML(htmlStr, document, true)
    const nodeNames = nodes.map((n) => n.nodeName.toLowerCase())
    expect(nodeNames).toContain("script")
  })

  it("不传 context，生成新 document", () => {
    const nodes = d.parseHTML(htmlStr)
    // 节点的 ownerDocument 不等于全局 document
    nodes.forEach((node) => {
      expect(node.ownerDocument).not.toBe(document)
    })
  })

  it("非字符串输入返回空数组", () => {
    expect(d.parseHTML(null)).toEqual([])
    expect(d.parseHTML(undefined)).toEqual([])
    expect(d.parseHTML(123)).toEqual([])
    expect(d.parseHTML({})).toEqual([])
    expect(d.parseHTML([])).toEqual([])
  })

  it("文本节点解析正确", () => {
    const str = `Text before <b>bold</b> Text after`
    const nodes = d.parseHTML(str)
    const texts = nodes.filter((n) => n.nodeType === Node.TEXT_NODE)
    expect(texts.length).toBe(2)
    expect(texts[0].textContent).toContain("Text before")
    expect(texts[1].textContent).toContain("Text after")
  })

  it("上下文可以是普通的子元素", () => {
    const nodes = d.parseHTML(htmlStr, document.querySelector("p"))
    nodes.forEach((node) => {
      expect(node.ownerDocument).toBe(document)
    })
  })

  it("上下文如果是其它数据类型,将使用document", () => {
    const nodes = d.parseHTML(htmlStr, 10)
    nodes.forEach((node) => {
      expect(node.ownerDocument).toBe(document)
    })
  })
})
