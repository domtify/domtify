import { describe, it, expect, beforeEach } from "vitest"

import { dom } from "@/core.js"
import { filter } from "@/methods/filter.js"

describe("filter", () => {
  beforeEach(() => {
    // 设置 HTML 测试环境
    document.body.innerHTML = `
      <ul>
        <li>list item 1</li>
        <li>list item 2</li>
        <li class="item item3">list item 3</li>
        <li class="item item4">list item 4</li>
        <li>list item 5</li>
        <li>list item 6</li>
      </ul>
    `
  })

  it("支持字符串选择器", () => {
    const res = filter(":nth-child(2n)")(dom("li"))
    expect(res.length).toBe(3)
    expect(res.map((el) => el.textContent.trim())).toEqual([
      "list item 2",
      "list item 4",
      "list item 6",
    ])
  })

  it("支持函数过滤", () => {
    const res = filter((i) => i % 2 === 0)(dom("li"))

    expect(res.length).toBe(3)
    expect(res.map((el) => el.textContent.trim())).toEqual([
      "list item 1",
      "list item 3",
      "list item 5",
    ])
  })

  it("支持传入 DOM 元素集合", () => {
    const domList = document.querySelectorAll(".item")
    const res = filter(domList)(dom("li"))
    expect(res.length).toBe(2)
    expect(res[0].classList.contains("item3")).toBe(true)
    expect(res[1].classList.contains("item4")).toBe(true)
  })

  it("支持传入元素数组", () => {
    const items = dom(".item")
    const res = filter(items)(dom("li"))
    expect(res.length).toBe(2)
    expect(res[0].classList.contains("item3")).toBe(true)
    expect(res[1].classList.contains("item4")).toBe(true)
  })

  it("传入函数但不返回任何内容则为空", () => {
    const res = filter(() => {})(dom("li"))
    expect(res.length).toBe(0)
  })
})
