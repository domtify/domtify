import { describe, it, expect, beforeEach, afterEach } from "vitest"

import { query } from "@/core.js"
import { data } from "@/methods/data.js"

describe("data", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li class="item-1" data-role-name="page" data-count="10" data-hidden="true" data-options='{"name":"John"}'>li</li>
        <li class="item-2" data-role-name="page" data-count="12" data-hidden="true" data-options='{"name":"John"}'>li</li>
      </ul>
    `
  })

  it("在没有元素时返回 undefined", () => {
    // 选择一个不存在的元素，result 会是空数组
    const res = data()(query(".not-exist"))

    expect(res).toBeUndefined()
  })

  it("读取元素上的所有数据", () => {
    const res = data()(query("li"))

    expect(res).toEqual({
      roleName: "page",
      count: 10,
      hidden: true,
      options: { name: "John" },
    })
  })

  it("读取单个属性", () => {
    const res = data("role-name")(query("li"))
    expect(res).toBe("page")
  })

  it("取不存在的属性返回underfined", () => {
    const res = data("foo-bar")(query("li"))

    expect(res).toBeUndefined()
  })

  // 这在jQuery中会报错
  it("取不存在的属性非字符串的属性返回underfined", () => {
    const res = data(123)(query("li"))

    expect(res).toBeUndefined()
  })

  it("通过键值对的方式设置数据", () => {
    data("foo", 52)(query("li"))
    data("bar", { isManual: true })(query("li"))

    expect(data("foo")(query("li"))).toBe(52)
    expect(data("bar")(query("li"))).toEqual({ isManual: true })
  })

  it("设置数据应该返回domtify支持链式调用", () => {
    const instance = query("li")
    const returned = data("foo", 52)(instance)
    expect(returned).toBe(instance)
  })

  it("通过对象的方式设置数据", () => {
    data({ foo: 53, bar: "test" })(query("li"))

    const fooRes = data("foo")(query("li"))
    const barRes = data("bar")(query("li"))

    expect(fooRes).toBe(53)
    expect(barRes).toBe("test")
  })

  it("覆盖DOM上已存在的data数据", () => {
    data("role-name", 20)(query("li"))
    data("count", "abc")(query("li"))
    const res = data()(query("li"))

    expect(res).toEqual({
      roleName: 20,
      count: "abc",
      hidden: true,
      options: { name: "John" },
    })
  })

  it("设置数据时键会小驼峰的方式存储", () => {
    data("role-name", "ajiho")(query("li"))

    expect(data("roleName")(query("li"))).toBe("ajiho")
  })
})
