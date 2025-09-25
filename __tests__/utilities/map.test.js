import { describe, it, expect, beforeEach, vi } from "vitest"
import { isNumber } from "is-what"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/toArray.js"
import "@/utilities/map.js"

describe("map", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="d1"></div>
    <div id="d2"></div>
    <div id="d3"></div>
    <div id="d4"></div>
    `
  })

  it("数组", () => {
    const param = [0, 1, 2]
    const res = d.map(param, function (v, index) {
      expect(isNumber(index) && index >= 0).toBe(true)
      return v + 4
    })
    expect(res).toEqual([4, 5, 6])
  })

  it("数组过滤", () => {
    const res = d.map([0, 1, 2], function (value, index) {
      return value > 0 ? value + 1 : null
    })
    expect(res).toEqual([2, 3])
  })

  it("数组扁平化", () => {
    const res = d.map([0, 1, 2], function (value, index) {
      return [value, value + 1]
    })
    expect(res).toEqual([0, 1, 1, 2, 2, 3])
  })

  it("对象映射", () => {
    const fn = vi.fn((v, k) => v * 2)

    let obj = { width: 10, height: 15, length: 10 }
    const res = d.map(obj, fn)

    expect(fn.mock.calls[0][0]).toBe(10)
    expect(fn.mock.calls[0][1]).toBe("width")
    expect(fn.mock.calls[1][0]).toBe(15)
    expect(fn.mock.calls[1][1]).toBe("height")
    expect(fn.mock.calls[2][0]).toBe(10)
    expect(fn.mock.calls[2][1]).toBe("length")
    expect(res).toEqual([20, 30, 20])
  })

  it("操作大于50的item", () => {
    const res = d.map([0, 1, 52, 97], (a) => (a > 50 ? a - 45 : null))
    expect(res).toEqual([7, 52])
  })

  it("扁平化 + 索引", () => {
    const res = d.map([0, 1, 52, 97], (a, i) => [a - 45, i])
    expect(res).toEqual([-45, 0, -44, 1, 7, 2, 52, 3])
  })
})
