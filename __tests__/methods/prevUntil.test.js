import { isInstanceOf } from "is-what"
import { describe, it, expect, beforeEach } from "vitest"

import { dom } from "@/core.js"
import { prevUntil } from "@/methods/prevUntil.js"

describe("prevUntil", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <dl>
        <dt id="term-1">term 1</dt>
        <dd>definition 1-a</dd>
        <dd class="a">definition 1-b</dd>
        <dd>definition 1-c</dd>
        <dd>definition 1-d</dd>
        <dt id="term-2">term 2</dt>
        <dd>definition 2-a</dd>
        <dd class="b">definition 2-b</dd>
        <dd>definition 2-c</dd>
        <dt id="term-3">term 3</dt>
        <dd>definition 3-a</dd>
        <dd>definition 3-b</dd>
      </dl>
    `
  })

  it("选择器参数: 从 term-2 到上一个 dt 之间的所有兄弟节点", () => {
    const res = prevUntil("dt")(dom("#term-2"))
    expect(res.map((el) => el.textContent.trim())).toEqual([
      "definition 1-d",
      "definition 1-c",
      "definition 1-b",
      "definition 1-a",
    ])
  })

  it("Element 参数: 从 term-2 到 term-1 之间", () => {
    const target = document.querySelector("#term-1")
    const res = prevUntil(target)(dom("#term-2"))
    expect(res.map((el) => el.textContent.trim())).toEqual([
      "definition 1-d",
      "definition 1-c",
      "definition 1-b",
      "definition 1-a",
    ])
  })

  it("过滤器参数: 只匹配 .b", () => {
    const res = prevUntil("dt", ".a")(dom("#term-2"))
    expect(res.map((el) => el.textContent.trim())).toEqual(["definition 1-b"])
  })

  it("传入数组元素作为until", () => {
    const res = prevUntil(dom("dt"))(dom("#term-2"))
    expect(res.map((el) => el.textContent.trim())).toEqual([
      "definition 1-d",
      "definition 1-c",
      "definition 1-b",
      "definition 1-a",
    ])
  })

  it("当没有匹配时返回空数组", () => {
    const res = prevUntil("dt")(dom(".not-exist"))
    expect(res).toEqual([])
  })

  it("返回元素数组", () => {
    const res1 = dom("#term-2")
    const res2 = prevUntil(dom("dt"))(res1)
    expect(Array.isArray(res1)).toBe(true)
    expect(Array.isArray(res2)).toBe(true)
  })
})
