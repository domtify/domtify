import { describe, it, expect, beforeEach, vi } from "vitest"

import { query } from "@/core.js"
import { parent } from "@/methods/parent.js"

describe("parent", () => {
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

        <div><p>Hello</p></div>
        <div class="selected"><p>Hello Again</p></div>

        <div class="wrapper">
          <span class="child"></span>
          <span class="child"></span>
        </div>
    `
  })

  it("不携带选择器的父级", () => {
    const res = parent()(query("li.item-a"))
    expect(res[0]).toBeInstanceOf(HTMLElement)
    expect(res[0].classList.contains("level-2")).toBe(true)
  })

  it("携带选择器的父级", () => {
    const res = parent(".selected")(query("p"))
    expect(res.length).toBe(1)
    expect(res[0].classList.contains("selected")).toBe(true)
  })

  it("不匹配父级为空", () => {
    const res = parent(".non-exist")(query("p"))
    expect(res.length).toBe(0)
  })

  it("多个相同父级应该去重", () => {
    const result = parent()(query(".child"))
    expect(result.length).toBe(1)
    expect(result[0].classList.contains("wrapper")).toBe(true)
  })

  it("html选择器则返回一个包含document的合集", () => {
    const result = parent()(query("html"))
    expect(result.length).toBe(1)
    expect(result[0]).toBe(document)
  })
})
