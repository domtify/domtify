import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/toArray.js"
import "@/methods/siblings.js"

describe("siblings", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <ul>
            <li>list item 1</li>
            <li class="item">list item 2</li>
            <li class="third-item">list item 3</li>
            <li class="item">list item 4</li>
            <li>list item 5</li>
        </ul>
    `
  })

  it("返回除了自己的所有的兄弟节点", () => {
    const siblings = d("li.third-item").siblings()
    const texts = siblings.toArray().map((li) => li.textContent.trim())

    expect(texts).toEqual([
      "list item 1",
      "list item 2",
      "list item 4",
      "list item 5",
    ])
  })

  it("传递选择器过滤", () => {
    const siblings = d("li.third-item").siblings(".item")
    const texts = siblings.toArray().map((li) => li.textContent.trim())

    expect(texts).toEqual(["list item 2", "list item 4"])
  })
})
