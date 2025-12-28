import { describe, it, expect, beforeEach } from "vitest"

import { query } from "@/core.js"
import { toggleClass } from "@/methods/toggleClass.js"

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
    toggleClass("foo")(query("li"))
    expect(ul[0].classList.contains("foo")).toBe(false)
    expect(ul[1].classList.contains("foo")).toBe(true)
  })

  it("空格分割的字符串", () => {
    toggleClass("foo bar")(query("li"))
    expect(ul[0].classList.contains("foo")).toBe(false)
    expect(ul[0].classList.contains("bar")).toBe(false)
    expect(ul[1].classList.contains("foo")).toBe(true)
    expect(ul[1].classList.contains("bar")).toBe(true)
  })

  it("字符串,第二个参数状态true(强制添加)", () => {
    toggleClass("foo", true)(query("li"))
    expect(ul[0].classList.contains("foo")).toBe(true)
    expect(ul[1].classList.contains("foo")).toBe(true)
  })

  it("字符串,第二个参数状态false(强制移除class)", () => {
    toggleClass("bar", false)(query("li"))
    expect(ul[0].classList.contains("bar")).toBe(false)
  })

  it("数组", () => {
    toggleClass(["foo bar", "test"])(query("li"))
    expect(ul[0].classList.contains("foo")).toBe(false)
    expect(ul[0].classList.contains("bar")).toBe(false)
    expect(ul[0].classList.contains("test")).toBe(true)
  })

  it("函数,第二个参数强制移除", () => {
    toggleClass(function (index) {
      return [`item-${index}`]
    }, false)(query("li"))

    expect(ul[0].classList.contains("item-0")).toBe(false)
  })

  it("如果是函数但是集合又不是正常元素的情况", () => {
    toggleClass(function (index, className) {
      expect(index).toBe(0)
      expect(typeof this).toBe("number")
      expect(this.valueOf()).toBe(1)
      expect(className).toBe("")
      return 1
    })(query(1))
  })

  it("函数-state传递时形参应该和它保持相同", () => {
    toggleClass(function (index, className, state) {
      expect(state).toBe(true)
      return "foo"
    }, true)(query("li"))
  })
})
