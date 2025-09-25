import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/hasClass.js"

describe("hasClass", () => {
  beforeEach(() => {
    // 创建基础 DOM 节点
    document.body.innerHTML = `
      <ul>
      <li id="foo" class="foo bar">foo</li>
      <li id="bar" class="foo bar zoo">bar</li>
    </ul>
    `
  })

  it("类存在返回true", () => {
    const res = d("li").hasClass("foo")
    expect(res).toBe(true)
    const res2 = d("li").hasClass("bar")
    expect(res2).toBe(true)
  })

  it("类不存在返回false", () => {
    const res = d("li").hasClass("quux")
    expect(res).toBe(false)
  })

  it("元素集合为空时,也返回false", () => {
    const res = d(".not-exist").hasClass("foo")
    expect(res).toBe(false)
  })

  it("数字不报错", () => {
    expect(() => d(1).hasClass("foo")).not.toThrow()
  })

  it("如果只有集合中的某个元素包含某个类,就都返回为真", () => {
    const res = d("li").hasClass("zoo")
    expect(res).toBe(true)
  })
})
