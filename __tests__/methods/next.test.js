import { describe, it, expect, beforeEach } from "vitest"

import { dom } from "@/core.js"
import { next } from "@/methods/next.js"

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
    const res = next()(dom("li"))
    expect(res.length).toBe(4) // 最后一个 li 没有 nextElementSibling
    expect(res[0].textContent).toBe("list item 2")
  })

  it("过滤掉 null/undefined", () => {
    const res = next()(dom("li:last-child"))
    expect(res.length).toBe(0)
  })

  it("支持选择器过滤", () => {
    const res = next(".third-item")(dom("li"))
    expect(res.length).toBe(1)
    expect(res[0].classList.contains("third-item")).toBe(true)
  })

  it("返回元素数组", () => {
    const res = dom("li")
    const nextRes = next()(res)

    expect(Array.isArray(res)).toBe(true)
    expect(Array.isArray(nextRes)).toBe(true)
  })
})
