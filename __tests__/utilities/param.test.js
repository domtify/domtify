import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/utilities/param.js"

describe("param", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <form id="myForm">
      <input class="input1" type="text" name="first" value="Rick" />
      <input class="input2" type="text" />
      <input type="text" name="job" value="Rock Star" />
    </form>
    `
  })

  it("数组 - 普通数组", () => {
    const result = d.param([2, 3, 4], false)
    expect(result).toBe("undefined=&undefined=&undefined=")
  })

  it("数组- 空数组", () => {
    const res = d.param([])
    expect(res).toBe("")
  })

  it("数组 - 带有name和value的对象数组", () => {
    const result = d.param([
      { name: "first", value: "Rick" },
      { name: "last", value: "Astley" },
      { name: "job", value: "Rock Star" },
    ])

    expect(result).toBe("first=Rick&last=Astley&job=Rock%20Star")
  })

  it("数组 - 但是其中一个对象元素并不是带有name和value的对象", () => {
    const result = d.param([
      { name: "first", value: "Rick" },
      { name: "last", value: "Astley" },
      { name1: "job", value2: "Rock Star" },
    ])
    expect(result).toBe("first=Rick&last=Astley&undefined=")
  })

  it("数组 - 值为null或者undefined", () => {
    // 这个在jquery中会抛异常
    const res = d.param([2, 3, 4, null, undefined])
    expect(res).toBe("undefined=&undefined=&undefined=&undefined=&undefined=")
  })

  it("对象 - traditional为false的情况", () => {
    const result = d.param({ a: [2, 3, 4] })
    expect(result).toBe("a%5B%5D=2&a%5B%5D=3&a%5B%5D=4")
  })

  it("对象 - traditional为true的情况", () => {
    const result = d.param({ a: [2, 3, 4] }, true)
    expect(result).toBe("a=2&a=3&a=4")
  })

  it("对象 - 值为null的情况", () => {
    const res = d.param({ a: null })
    expect(res).toBe("a=")
  })

  it("对象 - 空对象", () => {
    const res = d.param({})
    expect(res).toBe("")
  })

  it("null", () => {
    const result = d.param(null)
    expect(result).toBe("")
  })

  it("undefined ", () => {
    const result = d.param(undefined)
    expect(result).toBe("")
  })

  it("集合对象 - 空集合", () => {
    const result = d.param(d(".not-exist"))
    expect(result).toBe("")
  })

  it("集合对象 - 有dom元素", () => {
    const result = d.param(d("#myForm"))
    expect(result).toBe("=")
  })

  it("集合对象 - 集合中带有name和value的元素", () => {
    const result = d.param(d(".input1"))
    expect(result).toBe("first=Rick")
  })

  it("集合对象 - 有元素但是它没有name和value", () => {
    const result = d.param(d(".input2"))
    expect(result).toBe("=")
  })
})
