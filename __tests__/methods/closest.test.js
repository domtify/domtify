import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { closest } from "@/methods/closest.js"

describe("closest", () => {
  let listItemII
  beforeEach(() => {
    document.body.innerHTML = `
      <ul id="one" class="level-1">
        <li class="item-i">I</li>
        <li id="ii" class="item-ii">
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
    listItemII = document.getElementById("ii")
  })

  it("匹配最近的指定选择器元素", () => {
    const result = closest("li")(el("li.item-a"))
    expect(result.length).toBe(1)
    expect(result[0].classList.contains("item-a")).toBe(true)
  })

  it("匹配 ul 的祖先，使用 context 限制范围", () => {
    const result = closest("ul", listItemII)(el("li.item-a"))
    expect(result.length).toBe(1)
    expect(result[0].classList.contains("level-2")).toBe(true)
  })

  it("context 限制使得祖先不被包含（应返回空）", () => {
    const result = closest("#one", listItemII)(el("li.item-a"))
    expect(result.length).toBe(0)
  })

  it("支持使用 domtify 对象作为 selector", () => {
    const result = closest(el("li"))(el("li.item-a"))
    expect(result.length).toBe(1)
    expect(result[0].classList.contains("item-a")).toBe(true)
  })

  it("支持原生 NodeList/HTMLCollection 作为 selector", () => {
    const nodeList = document.querySelectorAll("li")
    const result = closest(nodeList)(el("li.item-a"))
    expect(result.length).toBe(1)
    expect(result[0].classList.contains("item-a")).toBe(true)
  })

  it("多个元素共同寻找最近的 ul", () => {
    const result = closest("ul")(el(".item"))
    const tagNames = result.map((el) => el.tagName)
    expect(result.length).toBeGreaterThan(0)
    expect(tagNames.every((tag) => tag === "UL")).toBe(true)
  })
})
