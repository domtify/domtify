import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/get.js"
import "@/methods/offsetParent.js"

describe("offsetParent", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul class="level-1">
      <li class="item-i">I</li>
      <li class="item-ii" style="position: relative">
        II
        <ul class="level-2">
          <li class="item-a">A</li>
          <li class="item-b" style="display: none">
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

  it("返回最近的已定位父元素", () => {
    const parent = d("li.item-a").offsetParent()
    expect(parent.get(0).classList.contains("item-ii")).toBe(true)
  })

  it("对 display:none 的元素返回 documentElement", () => {
    const parent = d("li.item-b").offsetParent()
    expect(parent.get(0)).toBe(document.documentElement)
  })

  it("多个元素时返回去重后的 offsetParent", () => {
    const parents = d("li.item-a, li.item-c").offsetParent()
    expect(parents.length).toBe(1)
    expect(parents.get(0)).toBe(document.querySelector("li.item-ii"))
  })

  it("元素本身不存在时返回空", () => {
    const res = d(".not-exist").offsetParent()
    expect(res.length).toBe(0)
  })
})
