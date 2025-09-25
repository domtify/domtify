import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/filter.js"
import "@/methods/get.js"

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
    const res = d("li").filter(":nth-child(2n)").get()
    expect(res.length).toBe(3)
    expect(res.map((el) => el.textContent.trim())).toEqual([
      "list item 2",
      "list item 4",
      "list item 6",
    ])
  })

  it("支持函数过滤", () => {
    const res = d("li")
      .filter((i) => i % 2 === 0)
      .get()
    expect(res.length).toBe(3)
    expect(res.map((el) => el.textContent.trim())).toEqual([
      "list item 1",
      "list item 3",
      "list item 5",
    ])
  })

  it("支持传入 DOM 元素集合", () => {
    const domList = document.querySelectorAll(".item")
    const res = d("li").filter(domList).get()
    expect(res.length).toBe(2)
    expect(res[0].classList.contains("item3")).toBe(true)
    expect(res[1].classList.contains("item4")).toBe(true)
  })

  it("支持传入 domtify 实例", () => {
    const items = d(".item")
    const res = d("li").filter(items).get()
    expect(res.length).toBe(2)
    expect(res[0].classList.contains("item3")).toBe(true)
    expect(res[1].classList.contains("item4")).toBe(true)
  })

  it("传入函数但不返回任何内容则为空", () => {
    const res = d("li")
      .filter(() => {})
      .get()
    expect(res.length).toBe(0)
  })
})
