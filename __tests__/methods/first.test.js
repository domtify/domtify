import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/first.js"

describe("first", () => {
  beforeEach(() => {
    // 设置 HTML 测试环境
    document.body.innerHTML = `
    <ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
    <li>item 5</li>
    </ul>
    `
  })

  it("获取第一个元素", () => {
    const res = d("li").first()
    expect(res.length).toBe(1)
    expect(res[0].textContent).toBe("item 1")
  })
})
