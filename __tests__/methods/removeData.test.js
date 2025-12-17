import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
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
    })(el("div"))

    // 确认设置成功
    expect(data("test1")(el("div"))).toBe("VALUE-1")
    expect(data("test2")(el("div"))).toBe("VALUE-2")

    // 删除所有
    removeData()(el("div"))

    // 再次读取应该 undefined
    expect(data("test1")(el("div"))).toBeUndefined()
    expect(data("test2")(el("div"))).toBeUndefined()
    expect(data("count")(el("div"))).toBe(10)
  })

  it("删除一个不存在的key,它没有任何影响", () => {
    removeData(123)(el("div"))
    expect(data(123)(el("div"))).toBeUndefined()
  })

  it("删除指定的key", () => {
    data({
      test1: "VALUE-1",
      test2: "VALUE-2",
    })(el("div"))

    removeData("test1")(el("div"))

    expect(data("test1")(el("div"))).toBeUndefined()
    expect(data("test2")(el("div"))).toBe("VALUE-2")
  })

  it("同时删除多个空格分隔的key", () => {
    data({
      test1: "VALUE-1",
      test2: "VALUE-2",
      test3: "VALUE-3",
    })(el("div"))

    removeData("test1 test2")(el("div"))

    expect(data("test1")(el("div"))).toBeUndefined()
    expect(data("test2")(el("div"))).toBeUndefined()
    expect(data("test3")(el("div"))).toBe("VALUE-3")
  })

  it("如果同时删除掉所有的key,再取时则为Undefined", () => {
    data({
      test1: "VALUE-1",
      test2: "VALUE-2",
      test3: "VALUE-3",
    })(el("div"))

    removeData("test1 test2 test3")(el("div"))

    expect(data("test1")(el("div"))).toBeUndefined()
    expect(data("test2")(el("div"))).toBeUndefined()
    expect(data("test3")(el("div"))).toBeUndefined()
  })

  it("通过数组删除多个 key", () => {
    data({
      foo: 123,
      bar: 456,
      baz: 789,
    })(el("div"))

    removeData(["foo", "baz"])(el("div"))

    expect(data("foo")(el("div"))).toBeUndefined()
    expect(data("baz")(el("div"))).toBeUndefined()
    expect(data("bar")(el("div"))).toBe(456)
  })
})
