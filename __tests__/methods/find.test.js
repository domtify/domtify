import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { find } from "@/methods/find.js"

describe("find", () => {
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
                <li class="item item-1">1</li>
                <li class="item item-2">2</li>
                <li class="item item-3">3</li>
                </ul>
            </li>
            <li class="item-c">C</li>
            </ul>
        </li>
        <li class="item-iii">III</li>
        </ul>
    `
  })

  it("字符串选择器", () => {
    const result = find(".item")(el("li.item-ii"))
    expect(result).toHaveLength(3)
    expect(result[0].classList.contains("item-1")).toBe(true)
  })

  it("使用element", () => {
    const res = document.querySelector(".item-1")
    const result = find(res)(el("li.item-ii"))
    expect(result).toHaveLength(1)
    expect(result[0]).toBe(res)
  })

  it("使用domtify对象", () => {
    const result = find(el(".item"))(el("li.item-ii"))
    expect(result).toHaveLength(3)
  })

  it("返回结果中不能自己", () => {
    const result = find(".item")(el(".item"))
    expect(result).toHaveLength(0)
  })

  it("禁止出现重复的结果", () => {
    const result = find(".item")(el(".level-1"))
    const unique = [...new Set(result)]
    expect(result.length).toBe(unique.length)
  })
})
