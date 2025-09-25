import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/has.js"

describe("has", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul>
      <li>list item 1</li>
      <li>
        list item 2
        <ul class="ul">
          <li>list item 2-a</li>
          <li>list item 2-b</li>
        </ul>
      </li>
      <li>list item 3</li>
      <li>list item 4</li>
    </ul>
    `
  })
  it("支持使用 CSS 选择器字符串作为参数", () => {
    const result = d("li").has(".ul")
    expect(result.length).toBe(1)
    expect(result[0].textContent).toContain("list item 2")
  })

  it("支持使用 DOM 元素作为参数", () => {
    const ulElement = document.querySelector(".ul")
    const result = d("li").has(ulElement)
    expect(result.length).toBe(1)
    expect(result[0].textContent).toContain("list item 2")
  })

  it("支持使用 domtify 对象作为参数", () => {
    const result = d("li").has(d(".ul"))
    expect(result.length).toBe(1)
    expect(result[0].textContent).toContain("list item 2")
  })

  it("没有匹配的后代应返回空数组", () => {
    const result = d("li").has(".not-exist")
    expect(result.length).toBe(0)
  })
})
