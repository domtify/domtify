import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/get.js"

describe("get", () => {
  beforeEach(() => {
    // 设置 HTML 测试环境
    document.body.innerHTML = `
      <div class="item">A</div>
      <div class="item">B</div>
      <div class="item">C</div>
    `
  })

  it("应返回指定索引处的元素", () => {
    const el = d(".item").get(0)
    expect(el).toBeInstanceOf(HTMLElement)
    expect(el.textContent).toBe("A")
  })

  it("应返回最后一个索引为负的元素", () => {
    const el = d(".item").get(-1)
    expect(el).toBeInstanceOf(HTMLElement)
    expect(el.textContent).toBe("C")
  })

  it("当没有提供索引时，应返回完整的结果数组", () => {
    const all = d(".item").get()
    expect(Array.isArray(all)).toBe(true)
    expect(all.length).toBe(3)
    expect(all.map((el) => el.textContent)).toEqual(["A", "B", "C"])
  })

  it("为null时应该也返回result", () => {
    const all = d(".item").get(null)
    expect(Array.isArray(all)).toBe(true)
    expect(all.length).toBe(3)
    expect(all.map((el) => el.textContent)).toEqual(["A", "B", "C"])
  })

  it("数字字符串也支持", () => {
    const el = d(".item").get("-1")
    expect(el).toBeInstanceOf(HTMLElement)
    expect(el.textContent).toBe("C")
  })

  it("其它字符串都返回undefined", () => {
    const el = d(".item").get("abc")
    expect(el).toBeUndefined()
  })
})
