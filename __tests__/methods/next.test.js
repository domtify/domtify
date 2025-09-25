import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d, Domtify } from "@/core.js"

// 按需导入
import "@/methods/next.js"

describe("next", () => {
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
  it("获取每个元素的下一个兄弟元素", () => {
    const res = d("li").next()
    expect(res.length).toBe(4) // 最后一个 li 没有 nextElementSibling
    expect(res[0].textContent).toBe("list item 2")
  })

  it("过滤掉 null/undefined", () => {
    const res = d("li:last-child").next()
    expect(res.length).toBe(0)
  })

  it("支持选择器过滤", () => {
    const res = d("li").next(".third-item")
    expect(res.length).toBe(1)
    expect(res[0].classList.contains("third-item")).toBe(true)
  })

  it("返回 this 以支持链式调用", () => {
    const instance = d("li")
    const returned = instance.next()

    expect(instance instanceof Domtify).toBe(true)
    expect(returned instanceof Domtify).toBe(true)
  })
})
