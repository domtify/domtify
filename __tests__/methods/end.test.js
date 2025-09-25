import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/end.js"
import "@/methods/find.js"
import "@/methods/css.js"
import "@/methods/toArray.js"

describe("end", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <p><span>Hello</span>, how are you?</p>
    `
  })

  it("end后实际上回到了p标签,设置样式", () => {
    const p = d("p")
    const span = p.find("span")
    const back = span.end()

    expect(span[0].tagName).toBe("SPAN")
    expect(back[0].tagName).toBe("P")
  })

  it("多次调用,最终回到最顶级实例", () => {
    const res = d("p").find("span").end().end().end()
    expect(res[0] === document).toBe(true)
  })

  it("end后依然可以链式调用", () => {
    const res = d("p").find("span").end()
    // 假设 css 方法存在
    expect(() => res.css("border", "1px solid red")).not.toThrow()
  })

  it("空集合调用end不报错", () => {
    const empty = d(".not-exist").end()
    expect(empty).toBeDefined()
    expect(Array.isArray(empty.toArray())).toBe(true)
  })
})
