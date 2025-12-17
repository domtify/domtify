import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { children } from "@/methods/children.js"

describe("children", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul class="level-1">
      <li class="item-i">I</li>
      <li class="item-ii">
        II
        <ul class="level-2">
          <li class="item-a">A</li>
          <li class="item-b">
            B
            <ul class="level-3">
              <li class="item-1">1</li>
              <li class="item-2">2</li>
              <li class="item-3">3</li>
            </ul>
          </li>
          <li class="item-c">C</li>
        </ul>
      </li>
      <li class="item-iii">III</li>
    </ul>
    `
  })

  it("无过滤选择器", () => {
    const res = children()(el("ul.level-2"))
    expect(res.length).toBe(3)
    expect(res[0].classList.contains("item-a")).toBe(true)
    expect(res[1].classList.contains("item-b")).toBe(true)
    expect(res[2].classList.contains("item-c")).toBe(true)
  })

  it("有选择器", () => {
    const res = children(".item-a")(el("ul.level-2"))
    expect(res.length).toBe(1)
    expect(res[0].classList.contains("item-a")).toBe(true)
  })

  it("选择器没有匹配：返回空集合", () => {
    const res = children(".not-exist")(el("ul.level-2"))
    expect(res.length).toBe(0)
  })

  it("空集合调用：不报错", () => {
    const res = children()(el(".not-exist"))
    expect(res.length).toBe(0)
  })

  it("返回元素数组", () => {
    const res = children()(el("ul.level-2"))
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(3)
  })
})
