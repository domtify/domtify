import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/toArray.js"
import "@/methods/parentsUntil.js"

describe("parentsUntil", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul class="level-1 yes">
        <li class="item-i">I</li>
        <li class="item-ii">
          II
          <ul class="level-2 yes">
            <li class="item-a">A</li>
            <li class="item-b">
              B
              <ul class="level-3">
                <li class="item-1">1</li>
                <li class="item-2">2</li>
                <li class="item-3">3</li>
              </ul>
            </li>
            <li class="item-c">C</li>
          </ul>
        </li>
        <li class="item-iii">III</li>
      </ul>
    `
  })

  it("获取所有父级元素（无参）", () => {
    const parents = d("li.item-a").parentsUntil()
    const tags = parents.toArray().map((p) => p.tagName)

    expect(tags).toEqual(["UL", "LI", "UL", "BODY", "HTML"])
  })

  it("传递 selector，遇到停止元素（选择器）", () => {
    const parents = d("li.item-a").parentsUntil("li.item-ii")

    expect(parents.toArray().some((p) => p.classList.contains("item-ii"))).toBe(
      false,
    )
    expect(parents.toArray().some((p) => p.classList.contains("level-2"))).toBe(
      true,
    )
  })

  it("传递 selector,为 DOM 元素", () => {
    const stop = document.querySelector(".level-1")
    const parents = d("li.item-a").parentsUntil(stop)

    expect(parents.toArray().at(-1)).not.toBe(stop)
    expect(parents.toArray()).toContain(document.querySelector(".level-2"))
    expect(parents.toArray()).not.toContain(stop)
  })

  it("传递 selector，为 domtify 对象", () => {
    const stop = d(".level-1")
    const parents = d("li.item-a").parentsUntil(stop)

    expect(parents.toArray()).not.toContain(stop[0])
  })

  it("支持第二个参数：过滤器", () => {
    const parents = d("li.item-a").parentsUntil(".level-1", ".yes")

    expect(parents.toArray().every((p) => p.classList.contains("yes"))).toBe(
      true,
    )
  })

  it("去重验证（重复节点不会多次出现）", () => {
    const parents = d("li.item-a, li.item-b").parentsUntil(".level-1")
    const uniqueSet = new Set(parents.toArray())

    expect(parents.length).toBe(uniqueSet.size)
  })
})
