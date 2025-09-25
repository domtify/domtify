import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/get.js"
import "@/methods/children.js"
import "@/methods/addBack.js"
import "@/methods/find.js"

describe("addBack", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li id="foo"><span>foo</span></li>
        <li id="bar"><span>bar</span></li>
      </ul>
    `
  })

  it("无选择器：合并当前集合和父集合", () => {
    const res = d("li").children().addBack()
    const ids = res.get().map((el) => el.id || el.tagName)

    // 应该包含 span + li
    expect(ids).toContain("foo")
    expect(ids).toContain("bar")
    expect(ids).toContain("SPAN")
  })

  it("带选择器：过滤合并结果", () => {
    const res = d("li").children().addBack("#foo")
    const ids = res.get().map((el) => el.id || el.tagName)

    // 只会把 foo 的 li 加回来
    expect(ids).toContain("foo")
    expect(ids).toContain("SPAN")
    expect(ids).not.toContain("bar")
  })

  it("链式调用依然可用", () => {
    const res = d("li").children().addBack()
    expect(() => res.find("span")).not.toThrow()
  })

  it("空集合调用 addBack 不报错", () => {
    const res = d(".not-exist").addBack()
    expect(res).toBeDefined()
    expect(Array.isArray(res.get())).toBe(true)
  })

  it("故意修改prevObject属性addBack也不报错", () => {
    const li = d("li")
    li.prevObject = true
    const res = li.addBack()
    expect(res.length).toBe(2)
  })
})
