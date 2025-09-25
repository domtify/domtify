import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/toArray.js"
import "@/methods/prevAll.js"

describe("prevAll", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li>list item 1</li>
        <li>list item 2</li>
        <li class="third-item">list item 3</li>
        <li>list item 4</li>
        <li>list item 5</li>
      </ul>
    `
  })

  it("应当获取所有前面兄弟节点", () => {
    const res = d("li.third-item").prevAll()

    expect(res.toArray().map((li) => li.textContent.trim())).toEqual([
      "list item 2",
      "list item 1",
    ])
  })

  it("应当按选择器过滤结果", () => {
    const res = d("li:last-child").prevAll(".third-item")

    expect(res.toArray().map((li) => li.textContent.trim())).toEqual([
      "list item 3",
    ])
  })
})
