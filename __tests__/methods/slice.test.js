import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/toArray.js"
import "@/methods/slice.js"

describe("slice", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li>list item 1</li>
        <li>list item 2</li>
        <li>list item 3</li>
        <li>list item 4</li>
        <li>list item 5</li>
      </ul>
    `
  })

  it("应该从起始索引开始截取", () => {
    const res = d("li").slice(2)
    expect(res.length).toBe(3)
    expect(res[0].textContent).toBe("list item 3")
  })

  it("截取开始和结束索引的元素", () => {
    const res = d("li").slice(1, 3)
    expect(res.length).toBe(2)
    expect(res[0].textContent).toBe("list item 2")
    expect(res[1].textContent).toBe("list item 3")
  })

  it("负索引", () => {
    const res = d("li").slice(-2, -1)
    expect(res.length).toBe(1)
    expect(res[0].textContent).toBe("list item 4")
  })

  it("应该用负数起始位置切片最后一个元素", () => {
    const res = d("li").slice(-1)
    expect(res.length).toBe(1)
    expect(res[0].textContent).toBe("list item 5")
  })

  it("应该允许链式调用", () => {
    const res = d("li").slice(1, 4).slice(0, 1)
    expect(res.length).toBe(1)
    expect(res[0].textContent).toBe("list item 2")
  })
})
