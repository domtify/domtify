import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/removeData.js"
import "@/methods/data.js"

describe("removeData", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div data-count="10"></div>
    `
  })

  it("不传参数时应当删除全部数据", () => {
    d("div").data({
      test1: "VALUE-1",
      test2: "VALUE-2",
    })

    // 确认设置成功
    expect(d("div").data("test1")).toBe("VALUE-1")
    expect(d("div").data("test2")).toBe("VALUE-2")

    // 删除所有
    d("div").removeData()

    // 再次读取应该 undefined
    expect(d("div").data("test1")).toBeUndefined()
    expect(d("div").data("test2")).toBeUndefined()
    expect(d("div").data("count")).toBe(10)
  })

  it("删除一个不存在的key,它没有任何影响", () => {
    d("div").removeData(123)
    expect(d("div").data(123)).toBeUndefined()
  })

  it("删除指定的key", () => {
    d("div").data({
      test1: "VALUE-1",
      test2: "VALUE-2",
    })

    d("div").removeData("test1")

    expect(d("div").data("test1")).toBeUndefined()
    expect(d("div").data("test2")).toBe("VALUE-2")
  })

  it("同时删除多个空格分隔的key", () => {
    d("div").data({
      test1: "VALUE-1",
      test2: "VALUE-2",
      test3: "VALUE-3",
    })

    d("div").removeData("test1 test2")

    expect(d("div").data("test1")).toBeUndefined()
    expect(d("div").data("test2")).toBeUndefined()
    expect(d("div").data("test3")).toBe("VALUE-3")
  })

  it("如果同时删除掉所有的key,再取时则为Undefined", () => {
    d("div").data({
      test1: "VALUE-1",
      test2: "VALUE-2",
      test3: "VALUE-3",
    })

    d("div").removeData("test1 test2 test3")

    expect(d("div").data("test1")).toBeUndefined()
    expect(d("div").data("test2")).toBeUndefined()
    expect(d("div").data("test3")).toBeUndefined()
  })

  it("通过数组删除多个 key", () => {
    d("div").data({
      foo: 123,
      bar: 456,
      baz: 789,
    })

    d("div").removeData(["foo", "baz"])

    expect(d("div").data("foo")).toBeUndefined()
    expect(d("div").data("baz")).toBeUndefined()
    expect(d("div").data("bar")).toBe(456)
  })
})
