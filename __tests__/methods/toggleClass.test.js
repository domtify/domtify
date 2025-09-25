import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/toggleClass.js"

describe("toggleClass", () => {
  let ul

  beforeEach(() => {
    // 创建基础 DOM 节点
    document.body.innerHTML = `
      <ul>
        <li class="foo bar"></li>
        <li></li>
        <li class="baz"></li>
      </ul>
    `
    ul = document.querySelectorAll("li")
  })

  it("字符串切换", () => {
    d("li").toggleClass("foo")
    expect(ul[0].classList.contains("foo")).toBe(false)
    expect(ul[1].classList.contains("foo")).toBe(true)
  })

  it("空格分割的字符串", () => {
    d("li").toggleClass("foo bar")
    expect(ul[0].classList.contains("foo")).toBe(false)
    expect(ul[0].classList.contains("bar")).toBe(false)
    expect(ul[1].classList.contains("foo")).toBe(true)
    expect(ul[1].classList.contains("bar")).toBe(true)
  })

  it("字符串,第二个参数状态true(强制添加)", () => {
    d("li").toggleClass("foo", true)
    expect(ul[0].classList.contains("foo")).toBe(true)
    expect(ul[1].classList.contains("foo")).toBe(true)
  })

  it("字符串,第二个参数状态false(强制移除class)", () => {
    d("li").toggleClass("bar", false)
    expect(ul[0].classList.contains("bar")).toBe(false)
  })

  it("数组", () => {
    d("li").toggleClass(["foo bar", "test"])
    expect(ul[0].classList.contains("foo")).toBe(false)
    expect(ul[0].classList.contains("bar")).toBe(false)
    expect(ul[0].classList.contains("test")).toBe(true)
  })

  it("函数,第二个参数强制移除", () => {
    d("li").toggleClass(function (index) {
      return [`item-${index}`]
    }, false)

    expect(ul[0].classList.contains("item-0")).toBe(false)
  })

  it("如果是函数但是集合又不是正常元素的情况", () => {
    d(1).toggleClass(function (index, className) {
      expect(index).toBe(0)
      expect(typeof this).toBe("number")
      expect(this.valueOf()).toBe(1)
      expect(className).toBe("")
      return 1
    })
  })

  it("函数-state传递时形参应该和它保持相同", () => {
    d("li").toggleClass(function (index, className, state) {
      expect(state).toBe(true)
      return "foo"
    }, true)
  })
})
