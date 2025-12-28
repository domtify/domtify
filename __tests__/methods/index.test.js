import { describe, it, expect, beforeEach } from "vitest"

import { query } from "@/core.js"
import { index } from "@/methods/index.js"

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
    expect(index()(query("#bar"))).toBe(1)
  })

  it(`css选择器-表示$("#baz") 在 $('li')这个集合中的位置`, () => {
    expect(index("li")(query("#baz"))).toBe(2)
  })

  it("element: 表示id为baz的元素在$('li')这个集合中的位置", () => {
    expect(index(document.getElementById("bar"))(query("li"))).toBe(1)
  })

  it("domtify对象: 表示id为foo的元素在$('li')这个集合中的位置", () => {
    expect(index(query("#foo"))(query("li"))).toBe(0)
  })

  it("没找到返回 -1", () => {
    expect(index(".no-exist")(query("li"))).toBe(-1)
  })
})
