import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/even.js"
import "@/methods/get.js"

describe("even", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul>
      <li>list item 0</li>
      <li>list item 1</li>
      <li>list item 2</li>
      <li>list item 3</li>
      <li>list item 4</li>
      <li>list item 5</li>
    </ul>
    `
  })

  it("应该返回索引为奇数的元素", () => {
    const items = d("li").even()
    expect(items.length).toBe(3)
    expect(items.get(0).textContent).toBe("list item 0")
    expect(items.get(1).textContent).toBe("list item 2")
    expect(items.get(2).textContent).toBe("list item 4")
  })
})
