import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { eq } from "@/methods/eq.js"

describe("eq", () => {
  beforeEach(() => {
    // 设置 HTML 测试环境
    document.body.innerHTML = `
    <ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
    <li>item 5</li>
    </ul>
    `
  })

  it("应按索引获取正确的元素", () => {
    const res = eq(2)(el("li"))
    expect(res.length).toBe(1)
    expect(res[0].textContent).toBe("item 3")
  })

  it("支持负数从后往前数", () => {
    const res = eq(-2)(el("li"))
    expect(res.length).toBe(1)
    expect(res[0].textContent).toBe("item 4")
  })

  it("如果超出了范围", () => {
    const res = eq(10)(el("li"))
    expect(res.length).toBe(0)
  })

  it("倒着查找索引也超出范围", () => {
    const res = eq(-10)(el("li"))
    expect(res.length).toEqual(0)
  })

  it("支持字符串数字", () => {
    const res = eq("-2")(el("li"))
    expect(res.length).toBe(1)
    expect(res[0].textContent).toBe("item 4")
  })

  it("其它非数字字符串", () => {
    const res = eq("abcd")(el("li"))
    expect(res.length).toEqual(0)
  })
})
