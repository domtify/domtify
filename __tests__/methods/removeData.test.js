import { describe, it, expect, beforeEach } from "vitest"

import { query } from "@/core.js"
import { removeData } from "@/methods/removeData.js"
import { data } from "@/methods/data.js"

describe("removeData", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div data-count="10"></div>
    `
  })

  it("不传参数时应当删除全部数据", () => {
    data({
      test1: "VALUE-1",
      test2: "VALUE-2",
    })(query("div"))

    // 确认设置成功
    expect(data("test1")(query("div"))).toBe("VALUE-1")
    expect(data("test2")(query("div"))).toBe("VALUE-2")

    // 删除所有
    removeData()(query("div"))

    // 再次读取应该 undefined
    expect(data("test1")(query("div"))).toBeUndefined()
    expect(data("test2")(query("div"))).toBeUndefined()
    expect(data("count")(query("div"))).toBe(10)
  })

  it("删除一个不存在的key,它没有任何影响", () => {
    removeData(123)(query("div"))
    expect(data(123)(query("div"))).toBeUndefined()
  })

  it("删除指定的key", () => {
    data({
      test1: "VALUE-1",
      test2: "VALUE-2",
    })(query("div"))

    removeData("test1")(query("div"))

    expect(data("test1")(query("div"))).toBeUndefined()
    expect(data("test2")(query("div"))).toBe("VALUE-2")
  })

  it("同时删除多个空格分隔的key", () => {
    data({
      test1: "VALUE-1",
      test2: "VALUE-2",
      test3: "VALUE-3",
    })(query("div"))

    removeData("test1 test2")(query("div"))

    expect(data("test1")(query("div"))).toBeUndefined()
    expect(data("test2")(query("div"))).toBeUndefined()
    expect(data("test3")(query("div"))).toBe("VALUE-3")
  })

  it("如果同时删除掉所有的key,再取时则为Undefined", () => {
    data({
      test1: "VALUE-1",
      test2: "VALUE-2",
      test3: "VALUE-3",
    })(query("div"))

    removeData("test1 test2 test3")(query("div"))

    expect(data("test1")(query("div"))).toBeUndefined()
    expect(data("test2")(query("div"))).toBeUndefined()
    expect(data("test3")(query("div"))).toBeUndefined()
  })

  it("通过数组删除多个 key", () => {
    data({
      foo: 123,
      bar: 456,
      baz: 789,
    })(query("div"))

    removeData(["foo", "baz"])(query("div"))

    expect(data("foo")(query("div"))).toBeUndefined()
    expect(data("baz")(query("div"))).toBeUndefined()
    expect(data("bar")(query("div"))).toBe(456)
  })
})
