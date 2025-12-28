import { describe, it, expect, beforeEach, vi } from "vitest"

import { query } from "@/core.js"
import { clone } from "@/methods/clone.js"
import { data } from "@/methods/data.js"
import { on } from "@/methods/on.js"
import { append } from "@/methods/append.js"
import { trigger } from "@/methods/trigger.js"

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
    data("info", { count: 1 })(query("#btn"))
    const handler = vi.fn()
    on("click", handler)(query("#btn"))

    const cloneBtn = clone(false)(query("#btn"))
    append(cloneBtn)(query("#result"))

    // 克隆的DOM存在
    expect(document.querySelector("#result #btn")).not.toBeNull()
    // data 没被复制
    expect(data("info")(query("#result #btn"))).toBeUndefined()
    // 事件没被复制
    trigger("click")(query("#result #btn"))
    expect(handler).toHaveBeenCalledTimes(0)
  })

  it("clone(true) 克隆DOM + 自身事件和data，不复制子元素事件和data", () => {
    data("info", { count: 1 })(query("#btn"))
    const handler = vi.fn()
    on("click", handler)(query("#btn"))

    const cloneBtn = clone(true)(query("#btn"))
    append(cloneBtn)(query("#result"))

    // data 被复制
    expect(data("info")(query("#result #btn"))).toEqual({ count: 1 })

    // 事件被复制
    trigger("click")(query("#result #btn"))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it("clone(true, true) 克隆DOM + 自身事件和data + 子元素事件和data", () => {
    // 给 parent 和 btn 都加 data & event
    data("parent-info", { count: 2 })(query("#parent"))
    const parentHandler = vi.fn()
    on("click", parentHandler)(query("#parent"))

    data("info", { count: 1 })(query("#btn"))
    const btnHandler = vi.fn()
    on("click", btnHandler)(query("#btn"))

    const cloneParent = clone(true, true)(query("#parent"))
    append(cloneParent)(query("#result"))

    // data 复制成功
    expect(data("parent-info")(query("#result #parent"))).toEqual({ count: 2 })
    expect(data("info")(query("#result #btn"))).toEqual({ count: 1 })

    // 事件复制成功
    trigger("click")(query("#result #parent"))
    trigger("click")(query("#result #btn"))
    expect(parentHandler).toHaveBeenCalledTimes(2)
    expect(btnHandler).toHaveBeenCalledTimes(1)
  })
})
