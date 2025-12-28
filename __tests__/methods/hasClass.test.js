import { describe, it, expect, beforeEach } from "vitest"

import { dom } from "@/core.js"
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
    const res = hasClass("foo")(dom("li"))
    expect(res).toBe(true)
    const res2 = hasClass("bar")(dom("li"))
    expect(res2).toBe(true)
  })

  it("类不存在返回false", () => {
    const res = hasClass("quux")(dom("li"))
    expect(res).toBe(false)
  })

  it("元素集合为空时,也返回false", () => {
    const res = hasClass("foo")(dom(".not-exist"))
    expect(res).toBe(false)
  })

  it("数字不报错", () => {
    expect(() => hasClass("foo")(dom(1))).not.toThrow()
  })

  it("如果只有集合中的某个元素包含某个类,就都返回为真", () => {
    const res = hasClass("zoo")(dom("li"))
    expect(res).toBe(true)
  })
})
