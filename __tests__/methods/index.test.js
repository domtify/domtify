import { describe, it, expect, beforeEach } from "vitest"

import { dom } from "@/core.js"
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
    expect(index()(dom("#bar"))).toBe(1)
  })

  it(`css选择器-表示$("#baz") 在 $('li')这个集合中的位置`, () => {
    expect(index("li")(dom("#baz"))).toBe(2)
  })

  it("element: 表示id为baz的元素在$('li')这个集合中的位置", () => {
    expect(index(document.getElementById("bar"))(dom("li"))).toBe(1)
  })

  it("数组元素: 表示id为foo的元素在$('li')这个集合中的位置", () => {
    expect(index(dom("#foo"))(dom("li"))).toBe(0)
  })

  it("没找到返回 -1", () => {
    expect(index(".no-exist")(dom("li"))).toBe(-1)
  })
})
