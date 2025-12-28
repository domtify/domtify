import { describe, it, expect, beforeEach } from "vitest"

import { dom } from "@/core.js"
import { not } from "@/methods/not.js"

describe("not", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li>list item 1</li>
        <li>list item 2</li>
        <li class="item item3">list item 3</li>
        <li class="item item4">list item 4</li>
        <li>list item 5</li>
      </ul>
    `
  })

  it("过滤：选择器字符串", () => {
    const res = not(":nth-child(2n)")(dom("li"))
    expect(res).toHaveLength(3)
    expect(res.map((el) => el.textContent)).toEqual([
      "list item 1",
      "list item 3",
      "list item 5",
    ])
  })

  it("过滤：单个 DOM 元素", () => {
    const item3El = document.querySelector(".item3")
    const res = not(item3El)(dom("li"))
    expect(res).toHaveLength(4)
    expect(res.some((li) => li.classList.contains("item3"))).toBe(false)
  })

  it("过滤：元素数组", () => {
    const arr = [
      document.querySelector(".item3"),
      document.querySelector(".item4"),
    ]
    const res = not(arr)(dom("li"))
    expect(res).toHaveLength(3)
    expect(res.some((li) => li.classList.contains("item3"))).toBe(false)
    expect(res.some((li) => li.classList.contains("item4"))).toBe(false)
  })

  it("过滤：元素数组", () => {
    const domArr = dom(".item")
    const res = not(domArr)(dom("li"))
    expect(res).toHaveLength(3)
    expect(res.some((li) => li.classList.contains("item"))).toBe(false)
  })

  it("过滤：函数形式", () => {
    const res = not(function (index, el) {
      // 排除索引 3 的元素
      return index === 3
    })(dom("li"))
    expect(res).toHaveLength(4)
    expect(res[3].textContent).toBe("list item 5")
  })
})
