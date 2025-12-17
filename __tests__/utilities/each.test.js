import { describe, it, expect, beforeEach, vi } from "vitest"
import { isNumber } from "is-what"
import { each } from "@/utilities.js"
import { el } from "@/core.js"

describe("each", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="d1"></div>
    <div id="d2"></div>
    <div id="d3"></div>
    <div id="d4"></div>
    `
  })

  it("数组", () => {
    const param = [10, 20, 30]
    const res = each(param, function (index, value) {
      expect(isNumber(index) && index >= 0).toBe(true)
      expect(param.includes(value)).toBe(true)
    })
    expect(param).toBe(res)
  })

  it("元素数组", () => {
    const param = el("div")

    const elements = document.querySelectorAll("div")

    const res = each(param, function (index, value) {
      expect(isNumber(index) && index >= 0).toBe(true)
      expect(param.includes(value)).toBe(true)
      expect(this).toBe(elements[index])
    })

    expect(param).toBe(res)
  })

  it("普通对象", () => {
    const fn = vi.fn()

    const param = { name: "Alice", age: 25, city: "Paris" }
    const res = each(param, fn)

    expect(fn.mock.calls[0][0], "name")
    expect(fn.mock.calls[0][1], "Alice")
    expect(fn.mock.calls[1][0], "age")
    expect(fn.mock.calls[1][1], "25")
    expect(fn.mock.calls[2][0], "city")
    expect(fn.mock.calls[2][1], "Paris")

    expect(param).toBe(res)
  })

  it("数组 - return false 循环中途停止", () => {
    const result = []

    const param = [1, 2, 3, 4, 5]

    const res = each(param, function (index, value) {
      result.push(value)
      if (value === 3) {
        return false // 停止循环
      }
    })

    expect(param).toBe(res)
    expect(result).toEqual([1, 2, 3])
  })

  it("对象 - return false 循环中途停止", () => {
    const result = {}

    const param = { a: 10, b: 20, c: 30 }

    const res = each(param, function (key, value) {
      result[key] = value
      if (value === 20) {
        return false // 停止循环
      }
    })

    expect(param).toBe(res)
    expect(result).toEqual({
      a: 10,
      b: 20,
    })
  })

  it("null的情况", () => {
    const fn = vi.fn()
    const param = null
    const res = each(param, fn)

    expect(param).toBe(res)
    expect(fn).not.toHaveBeenCalled()
  })
})
