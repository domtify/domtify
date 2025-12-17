import { describe, it, expect, beforeEach, afterEach } from "vitest"

import { el } from "@/core.js"
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
    const res = data()(el(".not-exist"))

    expect(res).toBeUndefined()
  })

  it("读取元素上的所有数据", () => {
    const res = data()(el("li"))

    expect(res).toEqual({
      roleName: "page",
      count: 10,
      hidden: true,
      options: { name: "John" },
    })
  })

  it("读取单个属性", () => {
    const res = data("role-name")(el("li"))
    expect(res).toBe("page")
  })

  it("取不存在的属性返回underfined", () => {
    const res = data("foo-bar")(el("li"))

    expect(res).toBeUndefined()
  })

  // 这在jQuery中会报错
  it("取不存在的属性非字符串的属性返回underfined", () => {
    const res = data(123)(el("li"))

    expect(res).toBeUndefined()
  })

  it("通过键值对的方式设置数据", () => {
    data("foo", 52)(el("li"))
    data("bar", { isManual: true })(el("li"))

    expect(data("foo")(el("li"))).toBe(52)
    expect(data("bar")(el("li"))).toEqual({ isManual: true })
  })

  it("设置数据应该返回domtify支持链式调用", () => {
    const instance = el("li")
    const returned = data("foo", 52)(instance)
    expect(returned).toBe(instance)
  })

  it("通过对象的方式设置数据", () => {
    data({ foo: 53, bar: "test" })(el("li"))

    const fooRes = data("foo")(el("li"))
    const barRes = data("bar")(el("li"))

    expect(fooRes).toBe(53)
    expect(barRes).toBe("test")
  })

  it("覆盖DOM上已存在的data数据", () => {
    data("role-name", 20)(el("li"))
    data("count", "abc")(el("li"))
    const res = data()(el("li"))

    expect(res).toEqual({
      roleName: 20,
      count: "abc",
      hidden: true,
      options: { name: "John" },
    })
  })

  it("设置数据时键会小驼峰的方式存储", () => {
    data("role-name", "ajiho")(el("li"))

    expect(data("roleName")(el("li"))).toBe("ajiho")
  })
})
