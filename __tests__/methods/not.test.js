import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/not.js"
import "@/methods/toArray.js"

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
    const res = d("li").not(":nth-child(2n)")
    expect(res).toHaveLength(3)
    expect(res.toArray().map((el) => el.textContent)).toEqual([
      "list item 1",
      "list item 3",
      "list item 5",
    ])
  })

  it("过滤：单个 DOM 元素", () => {
    const el = document.querySelector(".item3")
    const res = d("li").not(el)
    expect(res).toHaveLength(4)
    expect(res.toArray().some((li) => li.classList.contains("item3"))).toBe(
      false,
    )
  })

  it("过滤：元素数组", () => {
    const arr = [
      document.querySelector(".item3"),
      document.querySelector(".item4"),
    ]
    const res = d("li").not(arr)
    expect(res).toHaveLength(3)
    expect(res.toArray().some((li) => li.classList.contains("item3"))).toBe(
      false,
    )
    expect(res.toArray().some((li) => li.classList.contains("item4"))).toBe(
      false,
    )
  })

  it("过滤：domtify对象", () => {
    const domObj = d(".item")
    const res = d("li").not(domObj)
    expect(res).toHaveLength(3)
    expect(res.toArray().some((li) => li.classList.contains("item"))).toBe(
      false,
    )
  })

  it("过滤：函数形式", () => {
    const res = d("li").not(function (index, el) {
      // 排除索引 3 的元素
      return index === 3
    })
    expect(res).toHaveLength(4)
    expect(res[3].textContent).toBe("list item 5")
  })
})
