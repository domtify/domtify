import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/toArray.js"
import "@/utilities/debounce.js"

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("基本防抖: 连续调用只执行一次 (trailing)", () => {
    const fn = vi.fn()
    const debounced = d.debounce(fn, 500)

    debounced()
    debounced()
    debounced()

    // 立即还没执行
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("leading: 第一次立即执行", () => {
    const fn = vi.fn()
    const debounced = d.debounce(fn, 500, { leading: true })

    debounced()
    expect(fn).toHaveBeenCalledTimes(1) // 立即执行

    debounced()
    debounced()
    vi.advanceTimersByTime(500)
    expect(fn).toHaveBeenCalledTimes(2) // trailing 再执行一次
  })

  it("trailing = false: 只执行 leading", () => {
    const fn = vi.fn()
    const debounced = d.debounce(fn, 500, { leading: true, trailing: false })

    debounced()
    expect(fn).toHaveBeenCalledTimes(1)

    debounced()
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1) // 后续没执行
  })

  it("cancel: 调用后被取消", () => {
    const fn = vi.fn()
    const debounced = d.debounce(fn, 500)

    debounced()
    debounced.cancel()

    vi.advanceTimersByTime(500)
    expect(fn).not.toHaveBeenCalled()
  })

  it("flush: 立即执行剩余的调用", () => {
    const fn = vi.fn()
    const debounced = d.debounce(fn, 500)

    debounced()
    debounced.flush()
    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(500)
    expect(fn).toHaveBeenCalledTimes(1) // 定时器已被清掉
  })

  it("maxWait: 即使持续调用也会被强制执行", () => {
    // 对照组
    const fn2 = vi.fn()
    const debounced2 = d.debounce(fn2, 1000)
    for (let i = 0; i < 5; i++) {
      debounced2()
      vi.advanceTimersByTime(300) // 时间流逝300毫秒，300小于1000所以它会永远被重置。
    }
    expect(fn2).toHaveBeenCalledTimes(0)

    // 强制使用maxWait选项后,函数至少每 3 秒会被强制执行一次。
    const fn = vi.fn()
    const debounced = d.debounce(fn, 1000, { maxWait: 3000 })

    for (let i = 0; i < 15; i++) {
      debounced()
      vi.advanceTimersByTime(300)
    }

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("leading + maxWait: 第一次立即执行 + 后续受 maxWait 限制", () => {
    const fn = vi.fn()
    const debounced = d.debounce(fn, 1000, { leading: true, maxWait: 3000 })

    debounced()
    expect(fn).toHaveBeenCalledTimes(1)

    for (let i = 0; i < 15; i++) {
      debounced()
      vi.advanceTimersByTime(300)
    }

    expect(fn).toHaveBeenCalledTimes(2) // 第一次立即 + 3000ms 强制,总共两次
  })
})
