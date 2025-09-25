import { isInstanceOf } from "is-what"
import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d, Domtify } from "@/core.js"

// 按需导入
import "@/methods/nextUntil.js"
import "@/methods/toArray.js"

describe("nextUntil", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <dl>
        <dt id="term-1">term 1</dt>
        <dd>definition 1-a</dd>
        <dd>definition 1-b</dd>
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

  it("选择器参数: 从 term-2 到下一个 dt 之间的所有兄弟节点", () => {
    const res = d("#term-2").nextUntil("dt")
    expect(res.toArray().map((el) => el.textContent.trim())).toEqual([
      "definition 2-a",
      "definition 2-b",
      "definition 2-c",
    ])
  })

  it("Element 参数: 从 term-2 到 term-3 之间", () => {
    const target = document.querySelector("#term-3")
    const res = d("#term-2").nextUntil(target)
    expect(res.toArray().map((el) => el.textContent.trim())).toEqual([
      "definition 2-a",
      "definition 2-b",
      "definition 2-c",
    ])
  })

  it("过滤器参数: 只匹配 .b", () => {
    const res = d("#term-2").nextUntil("dt", ".b")
    expect(res.toArray().map((el) => el.textContent.trim())).toEqual([
      "definition 2-b",
    ])
  })

  it("传入 domtify 对象作为 until 元素", () => {
    const res = d("#term-2").nextUntil(d("dt"))
    expect(res.toArray().map((el) => el.textContent.trim())).toEqual([
      "definition 2-a",
      "definition 2-b",
      "definition 2-c",
    ])
  })

  it("当没有匹配时返回空数组", () => {
    const res = d(".not-exist").nextUntil("dt")
    expect(res.toArray()).toEqual([])
  })

  it("返回 this 以支持链式调用", () => {
    const instance = d("#term-2")
    const returned = instance.nextUntil(d("dt"))
    expect(isInstanceOf(instance, Domtify)).toBe(true)
    expect(isInstanceOf(returned, Domtify)).toBe(true)
  })
})
