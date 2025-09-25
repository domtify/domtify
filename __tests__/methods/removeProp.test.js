import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/removeProp.js"
import "@/methods/prop.js"

describe("removeProp", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <p></p>
    `
  })

  it("删除后应返回undefined", () => {
    const result = d("p").prop("foo", "bar").removeProp("foo").prop("foo")
    expect(result).toBeUndefined()
  })
})
