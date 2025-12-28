import { describe, it, expect, beforeEach } from "vitest"

import { dom } from "@/core.js"
import { get } from "@/methods/get.js"

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
    const res = get(0)(dom(".item"))
    expect(res).toBeInstanceOf(HTMLElement)
    expect(res.textContent).toBe("A")
  })

  it("应返回最后一个索引为负的元素", () => {
    const res = get(-1)(dom(".item"))
    expect(res).toBeInstanceOf(HTMLElement)
    expect(res.textContent).toBe("C")
  })

  it("当没有提供索引时，应返回完整的结果数组", () => {
    const res = get()(dom(".item"))
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(3)
    expect(res.map((el) => el.textContent)).toEqual(["A", "B", "C"])
  })

  it("为null时应该也返回result", () => {
    const res = get(null)(dom(".item"))
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(3)
    expect(res.map((el) => el.textContent)).toEqual(["A", "B", "C"])
  })

  it("数字字符串也支持", () => {
    const res = get("-1")(dom(".item"))
    expect(res).toBeInstanceOf(HTMLElement)
    expect(res.textContent).toBe("C")
  })

  it("其它字符串都返回undefined", () => {
    const res = get("abc")(dom(".item"))
    expect(res).toBeUndefined()
  })
})
