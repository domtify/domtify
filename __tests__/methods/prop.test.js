import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/prop.js"

describe("prop", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <input id="check1" type="checkbox" checked />
    <input id="check2" type="checkbox" />
    `
  })

  it("getter: 获取元素属性", () => {
    const checked = d("#check1").prop("checked")
    expect(checked).toBe(true)
  })

  it("getter: 空集合返回 undefined", () => {
    const result = d(".not-exist").prop("checked")
    expect(result).toBeUndefined()
  })

  it("setter: 单个设置属性", () => {
    d("#check1").prop("disabled", true)
    expect(d("#check1").prop("disabled")).toBe(true)
  })

  it("setter: 批量设置属性", () => {
    d("input[type='checkbox']").prop({
      disabled: true,
      checked: false,
    })

    expect(d("#check1").prop("disabled")).toBe(true)
    expect(d("#check1").prop("checked")).toBe(false)
    expect(d("#check2").prop("disabled")).toBe(true)
    expect(d("#check2").prop("checked")).toBe(false)
  })

  it("setter: 使用函数动态设置", () => {
    d("input").prop("checked", function (i, val) {
      // this 应该是原生元素
      expect(this).toBeInstanceOf(HTMLElement)
      expect(typeof i).toBe("number")
      expect(typeof val).toBe("boolean")
      return !val
    })

    // 原来 check1 是 true，check2 是 false，现在取反
    expect(d("#check1").prop("checked")).toBe(false)
    expect(d("#check2").prop("checked")).toBe(true)
  })

  it("setter: 函数返回 undefined 时不修改值", () => {
    d("#check1").prop("checked", () => undefined)
    // 应该保持原值
    expect(d("#check1").prop("checked")).toBe(true)
  })
})
