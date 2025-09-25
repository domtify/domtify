import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/parent.js"
import "@/methods/toArray.js"

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
    const el = d("li.item-a").parent()
    expect(el[0]).toBeInstanceOf(HTMLElement)
    expect(el[0].classList.contains("level-2")).toBe(true)
  })

  it("携带选择器的父级", () => {
    const el = d("p").parent(".selected")
    expect(el.length).toBe(1)
    expect(el[0].classList.contains("selected")).toBe(true)
  })

  it("不匹配父级为空", () => {
    const el = d("p").parent(".non-exist")
    expect(el.length).toBe(0)
  })

  it("多个相同父级应该去重", () => {
    const result = d(".child").parent()
    expect(result.length).toBe(1)
    expect(result[0].classList.contains("wrapper")).toBe(true)
  })

  it("html选择器则返回一个包含document的合集", () => {
    const result = d("html").parent()
    expect(result.length).toBe(1)
    expect(result[0]).toBe(document)
  })
})
