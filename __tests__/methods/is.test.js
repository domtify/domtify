import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/is.js"

describe("is", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li>item 1</li>
        <li class="special">item 2</li>
        <li>item 3</li>
        <li>item 4</li>
      </ul>
    `
  })

  it("判断是否包含满足选择器的元素", () => {
    const res = d("li").is(".special")
    expect(res).toBe(true)
  })

  it("选择器不匹配时返回 false", () => {
    const res = d("li").is(".not-exist")
    expect(res).toBe(false)
  })

  it("支持函数回调作为过滤条件", () => {
    const res = d("li").is((i) => i === 2) // 第三个 li（索引为2）
    expect(res).toBe(true)
  })

  it("函数未命中任何项时返回 false", () => {
    const res = d("li").is(() => false)
    expect(res).toBe(false)
  })

  it("支持 DOM 元素作为参数", () => {
    const target = document.querySelector(".special")
    const res = d("li").is(target)
    expect(res).toBe(true)
  })

  it("支持 domtify 对象作为参数", () => {
    const target = d(".special")
    const res = d("li").is(target)
    expect(res).toBe(true)
  })

  it("传入无关 DOM 元素应返回 false", () => {
    const other = document.createElement("div")
    const res = d("li").is(other)
    expect(res).toBe(false)
  })
})
