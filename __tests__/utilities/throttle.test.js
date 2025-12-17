import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"

import { throttle } from "@/utilities/throttle.js"

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("leading:true 应立即调用前沿函数", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 1000, { leading: true, trailing: false })

    throttled() // 第一次调用
    expect(fn).toHaveBeenCalledTimes(1)

    throttled()
    throttled()
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1) // trailing false，不会再调用
  })

  it("trailing:true 应在等待时间后调用尾部函数", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 1000, { leading: false, trailing: true })

    throttled() // 第一次调用，不立即触发
    expect(fn).toHaveBeenCalledTimes(0)

    throttled()
    throttled()
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1) // 等待时间结束后触发一次
  })

  it("leading + trailing都为true的情况", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 1000, { leading: true, trailing: true })

    throttled() // 立即触发
    expect(fn).toHaveBeenCalledTimes(1)

    throttled()
    throttled()
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(2) // trailing 再触发一次
  })

  it("cancel: 调用后被取消", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 1000, { leading: false, trailing: true })

    throttled()
    throttled.cancel()
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(0) // 已取消，不触发
  })

  it("flush:立即执行节流函数", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 1000, { leading: false, trailing: true })

    throttled()
    throttled()
    throttled()
    throttled.flush()
    expect(fn).toHaveBeenCalledTimes(1) // flush 立即触发
  })

  it("非函数参数应抛出 TypeError", () => {
    // 非函数参数：字符串
    expect(() => throttle("not a function", 1000)).toThrow(TypeError)
    expect(() => throttle("not a function", 1000)).toThrow(
      "Expected a function",
    )

    // 非函数参数：对象
    expect(() => throttle({})).toThrow(TypeError)
  })
})
