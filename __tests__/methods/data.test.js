import { describe, it, expect, beforeEach, afterEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/data.js"

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
    const res = d(".not-exist").data()

    expect(res).toBeUndefined()
  })

  it("读取元素上的所有数据", () => {
    const res = d("li").data()

    expect(res).toEqual({
      roleName: "page",
      count: 10,
      hidden: true,
      options: { name: "John" },
    })
  })

  it("读取单个属性", () => {
    const res = d("li").data("role-name")

    expect(res).toBe("page")
  })

  it("取不存在的属性返回underfined", () => {
    const res = d("li").data("foo-bar")

    expect(res).toBeUndefined()
  })

  // 这在jQuery中会报错
  it("取不存在的属性非字符串的属性返回underfined", () => {
    const res = d("li").data(123)

    expect(res).toBeUndefined()
  })

  it("通过键值对的方式设置数据", () => {
    d("li").data("foo", 52)
    d("li").data("bar", { isManual: true })

    expect(d("li").data("foo")).toBe(52)
    expect(d("li").data("bar")).toEqual({ isManual: true })
  })

  it("设置数据应该返回domtify支持链式调用", () => {
    const instance = d("li")
    const returned = instance.data("foo", 52)
    expect(returned).toBe(instance)
  })

  it("通过对象的方式设置数据", () => {
    d("li").data({ foo: 53, bar: "test" })

    const fooRes = d("li").data("foo")
    const barRes = d("li").data("bar")

    expect(fooRes).toBe(53)
    expect(barRes).toBe("test")
  })

  it("覆盖DOM上已存在的data数据", () => {
    d("li").data("role-name", 20)
    d("li").data("count", "abc")
    const res = d("li").data()

    expect(res).toEqual({
      roleName: 20,
      count: "abc",
      hidden: true,
      options: { name: "John" },
    })
  })

  it("设置数据时键会小驼峰的方式存储", () => {
    d("li").data("role-name", "ajiho")

    expect(d("li").data("roleName")).toBe("ajiho")
  })
})
