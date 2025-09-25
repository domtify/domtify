import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/wrap.js"

describe("wrap", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <p>Hello</p>
      <p>cruel</p>
      <p>World</p>
      <div class="doublediv"><div></div></div>
    `
  })
  it("用选择器包裹", () => {
    d("p").wrap(".doublediv")
    const wrappers = document.querySelectorAll(".doublediv:not(:last-of-type)")
    expect(wrappers).toHaveLength(3)
    wrappers.forEach((wrapper, i) => {
      expect(
        wrapper.contains(
          document.querySelectorAll(".doublediv:not(:last-of-type)>div>p")[i],
        ),
      ).toBe(true)
    })
  })

  it("用 HTML 字符串包裹", () => {
    d("p").wrap("<div class='wrapper'><b></b></div>")
    const wrappers = document.querySelectorAll(".wrapper")
    expect(wrappers).toHaveLength(3)
    wrappers.forEach((wrapper) => {
      // <b> 是最深层元素
      const b = wrapper.querySelector("b")
      expect(b.querySelector("p")).not.toBeNull()
    })
  })

  it("用单个 DOM 元素包裹", () => {
    const el = document.querySelector(".doublediv")
    d("p").wrap(el)
    const wrappers = document.querySelectorAll(".doublediv:not(:last-of-type)")
    expect(wrappers).toHaveLength(3)
  })

  it("用 domtify 对象包裹", () => {
    const domObj = d(".doublediv")
    d("p").wrap(domObj)
    const wrappers = document.querySelectorAll(".doublediv:not(:last-of-type)")
    expect(wrappers).toHaveLength(3)
  })

  it("用函数返回 HTML 字符串包裹", () => {
    d("p").wrap(function (index) {
      return `<div class="wrap-${index}"></div>`
    })
    const wrappers = document.querySelectorAll("[class^=wrap-]")
    expect(wrappers).toHaveLength(3)
    wrappers.forEach((w, i) => {
      expect(w.className).toBe(`wrap-${i}`)
      expect(w.querySelector("p")).not.toBeNull()
    })
  })

  it("用函数返回 domtify 对象包裹", () => {
    d("p").wrap(function () {
      return d(".doublediv")
    })
    const wrappers = document.querySelectorAll(".doublediv:not(:last-of-type)")
    expect(wrappers).toHaveLength(3)
  })

  it("如果没找到元素,则不进行任何操作提前返回this", () => {
    const instance = d("p")
    const returned = instance.wrap(".no-exist")
    expect(returned).toBe(instance)
  })
})
