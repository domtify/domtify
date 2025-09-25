import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/clone.js"
import "@/methods/on.js"
import "@/methods/append.js"
import "@/methods/trigger.js"

describe("clone", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="parent" class="box">
      父容器
      <button id="btn">点击我</button>
    </div>
    <div id="result"></div>
    `
  })

  it("clone(false) 只克隆DOM，不复制事件和data", () => {
    d("#btn").data("info", { count: 1 })
    const handler = vi.fn()
    d("#btn").on("click", handler)

    const cloneBtn = d("#btn").clone(false)
    d("#result").append(cloneBtn)

    // 克隆的DOM存在
    expect(document.querySelector("#result #btn")).not.toBeNull()
    // data 没被复制
    expect(d("#result #btn").data("info")).toBeUndefined()
    // 事件没被复制
    d("#result #btn").trigger("click")
    expect(handler).toHaveBeenCalledTimes(0)
  })

  it("clone(true) 克隆DOM + 自身事件和data，不复制子元素事件和data", () => {
    d("#btn").data("info", { count: 1 })
    const handler = vi.fn()
    d("#btn").on("click", handler)

    const cloneBtn = d("#btn").clone(true)
    d("#result").append(cloneBtn)

    // data 被复制
    expect(d("#result #btn").data("info")).toEqual({ count: 1 })

    // 事件被复制
    d("#result #btn").trigger("click")
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it("clone(true, true) 克隆DOM + 自身事件和data + 子元素事件和data", () => {
    // 给 parent 和 btn 都加 data & event
    d("#parent").data("parent-info", { count: 2 })
    const parentHandler = vi.fn()
    d("#parent").on("click", parentHandler)

    d("#btn").data("info", { count: 1 })
    const btnHandler = vi.fn()
    d("#btn").on("click", btnHandler)

    const cloneParent = d("#parent").clone(true, true)
    d("#result").append(cloneParent)

    // data 复制成功
    expect(d("#result #parent").data("parent-info")).toEqual({ count: 2 })
    expect(d("#result #btn").data("info")).toEqual({ count: 1 })

    // 事件复制成功
    d("#result #parent").trigger("click")
    d("#result #btn").trigger("click")
    expect(parentHandler).toHaveBeenCalledTimes(2)
    expect(btnHandler).toHaveBeenCalledTimes(1)
  })
})
