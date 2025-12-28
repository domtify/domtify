import { describe, it, expect, beforeEach, vi } from "vitest"

import { dom } from "@/core.js"
import { parents } from "@/methods/parents.js"

describe("parents", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul class="level-1">
        <li class="item-i">I</li>
        <li class="item-ii">
        II
        <ul class="level-2">
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

  it("不携带选择器时返回所有祖先", () => {
    const result = parents()(dom("li.item-a"))
    const classList = result.map((el) => el.className).filter(Boolean) // 只过滤出有className的

    expect(result.length).toBeGreaterThan(0)
    expect(classList).toContain("level-2")
    expect(classList).toContain("item-ii")
    expect(classList).toContain("level-1")
  })

  it("携带选择器时过滤祖先", () => {
    const result = parents(".item-ii")(dom("li.item-a"))
    expect(result.length).toBe(1)
    expect(result[0].classList.contains("item-ii")).toBe(true)
  })

  it("多个元素共享祖先时去重", () => {
    const result = parents()(dom("li.item-1, li.item-2, li.item-3"))

    // 只过滤出携带.level-3类名的层级
    const level3Parents = result.filter((el) =>
      el.classList.contains("level-3"),
    )
    expect(level3Parents.length).toBe(1) // 共享所以去重只有一个
  })

  it("html元素应返回空集合", () => {
    const result = parents()(dom("html"))
    expect(result.length).toBe(0)
  })
})
