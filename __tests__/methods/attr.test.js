import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/attr.js"

describe("attr", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="check1" type="checkbox" checked="checked" />
      <label for="check1">check1</label>
      <input id="check2" type="checkbox" />
      <label for="check2">check2</label>
      <p aria-hidden="true">
        Once there was a <em title="huge, gigantic">large</em> dinosaur...
      </p>
      <img id="photo" />
    `
  })

  it("存在的属性", () => {
    expect(d("#check1").attr("checked")).toBe("checked")
  })

  it("不存在的属性返回 undefined", () => {
    expect(d("#check2").attr("checked")).toBeUndefined()
  })

  it("设置简单属性", () => {
    d("#check1").attr("alt", "Beijing Brush Seller")
    expect(document.querySelector("#check1").getAttribute("alt")).toBe(
      "Beijing Brush Seller",
    )
  })

  it("删除属性-通过设置值为null的方式", () => {
    d("#check1").attr("checked", null)
    expect(document.querySelector("#check1").hasAttribute("checked")).toBe(
      false,
    )
  })

  it("删除属性-通过设置值为false的方式", () => {
    d("#check1").attr("checked", false)
    expect(document.querySelector("#check1").hasAttribute("checked")).toBe(
      false,
    )
  })

  it("删除属性针对如果aria属性的设置为false无效", () => {
    d("p").attr("aria-hidden", false)
    expect(document.querySelector("p").getAttribute("aria-hidden")).toBe(
      "false",
    )
  })

  it("函数的方式", () => {
    d("em").attr("title", (i, val) => val + "-" + i)
    expect(document.querySelector("em").getAttribute("title")).toBe(
      "huge, gigantic-0",
    )
  })

  it("通过对象的方式", () => {
    d("img").attr({ title: "domtify", alt: "domtify Logo" })
    const img = document.querySelector("img")
    expect(img.getAttribute("title")).toBe("domtify")
    expect(img.getAttribute("alt")).toBe("domtify Logo")
  })

  it("空集合 - getter 返回 undefined", () => {
    expect(d(".not-exist").attr("foo")).toBeUndefined()
  })

  it("空集合 - setter 不报错", () => {
    expect(() => d(".not-exist").attr("foo", "bar")).not.toThrow()
  })
})
