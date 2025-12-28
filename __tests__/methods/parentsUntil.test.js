import { describe, it, expect, beforeEach } from "vitest"

import { query } from "@/core.js"
import { parentsUntil } from "@/methods/parentsUntil.js"

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
    const res = parentsUntil()(query("li.item-a"))
    const tags = res.map((p) => p.tagName)

    expect(tags).toEqual(["UL", "LI", "UL", "BODY", "HTML"])
  })

  it("传递 selector，遇到停止元素（选择器）", () => {
    const res = parentsUntil("li.item-ii")(query("li.item-a"))

    expect(res.some((p) => p.classList.contains("item-ii"))).toBe(false)
    expect(res.some((p) => p.classList.contains("level-2"))).toBe(true)
  })

  it("传递 selector,为 DOM 元素", () => {
    const stop = document.querySelector(".level-1")
    const res = parentsUntil(stop)(query("li.item-a"))

    expect(res.at(-1)).not.toBe(stop)
    expect(res).toContain(document.querySelector(".level-2"))
    expect(res).not.toContain(stop)
  })

  it("传递 selector，为 domtify 对象", () => {
    const stop = query(".level-1")
    const res = parentsUntil(stop)(query("li.item-a"))
    expect(res).not.toContain(stop[0])
  })

  it("支持第二个参数：过滤器", () => {
    const res = parentsUntil(".level-1", ".yes")(query("li.item-a"))
    expect(res.every((p) => p.classList.contains("yes"))).toBe(true)
  })

  it("去重验证（重复节点不会多次出现）", () => {
    const res = parentsUntil(".level-1")(query("li.item-a, li.item-b"))
    const uniqueSet = new Set(res)
    expect(res.length).toBe(uniqueSet.size)
  })
})
