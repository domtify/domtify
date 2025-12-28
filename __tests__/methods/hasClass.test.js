import { describe, it, expect, beforeEach } from "vitest"

import { query } from "@/core.js"
import { hasClass } from "@/methods/hasClass.js"

describe("hasClass", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul>
      <li id="foo" class="foo bar">foo</li>
      <li id="bar" class="foo bar zoo">bar</li>
    </ul>
    `
  })

  it("类存在返回true", () => {
    const res = hasClass("foo")(query("li"))
    expect(res).toBe(true)
    const res2 = hasClass("bar")(query("li"))
    expect(res2).toBe(true)
  })

  it("类不存在返回false", () => {
    const res = hasClass("quux")(query("li"))
    expect(res).toBe(false)
  })

  it("元素集合为空时,也返回false", () => {
    const res = hasClass("foo")(query(".not-exist"))
    expect(res).toBe(false)
  })

  it("数字不报错", () => {
    expect(() => hasClass("foo")(query(1))).not.toThrow()
  })

  it("如果只有集合中的某个元素包含某个类,就都返回为真", () => {
    const res = hasClass("zoo")(query("li"))
    expect(res).toBe(true)
  })
})
