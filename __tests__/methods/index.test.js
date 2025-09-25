import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/index.js"

describe("index", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li id="foo">foo</li>
        <li id="bar">bar</li>
        <li id="baz">baz</li>
      </ul>
    `
  })
  it("不传递参数,表示获取当前元素在兄弟中的位置", () => {
    expect(d("#bar").index()).toBe(1)
  })

  it(`css选择器-表示$("#baz") 在 $('li')这个集合中的位置`, () => {
    expect(d("#baz").index("li")).toBe(2)
  })

  it("element: 表示id为baz的元素在$('li')这个集合中的位置", () => {
    expect(d("li").index(document.getElementById("bar"))).toBe(1)
  })

  it("domtify对象: 表示id为foo的元素在$('li')这个集合中的位置", () => {
    expect(d("li").index(d("#foo"))).toBe(0)
  })

  it("没找到返回 -1", () => {
    expect(d("li").index(".no-exist")).toBe(-1)
  })
})
