import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/empty.js"

describe("empty", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <div class="hello">Hello</div>
        <div class="goodbye">Goodbye</div>
      </div>
    `
  })

  it("移除所有的子节点", () => {
    const helloEl = document.querySelector(".hello")

    // 之前
    expect(helloEl.childNodes.length).toBeGreaterThan(0) // 有文本节点 "Hello"

    d(".hello").empty()

    // 之后
    expect(helloEl.childNodes.length).toBe(0)
    expect(helloEl.innerHTML).toBe("")
  })

  it("如果元素没有子元素，则不应执行任何操作", () => {
    const goodbyeEl = document.querySelector(".goodbye")
    goodbyeEl.innerHTML = "" // 本来就空
    expect(goodbyeEl.childNodes.length).toBe(0)

    d(".goodbye").empty() // 不报错
    expect(goodbyeEl.childNodes.length).toBe(0)
  })
})
