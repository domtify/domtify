import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/addClass.js"

describe("addClass", () => {
  beforeEach(() => {
    // 添加初始 DOM，用于测试
    document.body.innerHTML = `
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    `
  })

  it("添加单个字符串类名", () => {
    d("li").addClass("foo")

    for (const element of document.querySelectorAll("li")) {
      expect(element.classList.contains("foo")).toBe(true)
    }
  })

  it("添加多个类名（空格分隔字符串）", () => {
    d("li").addClass("foo bar")

    for (const element of document.querySelectorAll("li")) {
      expect(element.classList.contains("foo")).toBe(true)
      expect(element.classList.contains("bar")).toBe(true)
    }
  })

  it("添加多个类名（数组，元素中有空格）", () => {
    d("li").addClass(["foo bar", "baz"])

    for (const element of document.querySelectorAll("li")) {
      expect(element.classList.contains("foo")).toBe(true)
      expect(element.classList.contains("bar")).toBe(true)
      expect(element.classList.contains("baz")).toBe(true)
    }
  })

  it("添加类名（回调函数返回字符串）", () => {
    d("li").addClass(function (index) {
      return "item-" + index
    })

    for (const [index, element] of document.querySelectorAll("li").entries()) {
      expect(element.classList.contains("item-" + index)).toBe(true)
    }
  })

  it("添加类名（回调函数返回数组）", () => {
    d("li").addClass(function (index) {
      return ["item-" + index, "common", "hello world"]
    })

    for (const [index, element] of document.querySelectorAll("li").entries()) {
      expect(element.classList.contains("item-" + index)).toBe(true)
      expect(element.classList.contains("common")).toBe(true)
      expect(element.classList.contains("hello")).toBe(true)
      expect(element.classList.contains("world")).toBe(true)
    }
  })

  it("添加类名（回调函数返回数组）", () => {
    d("li").addClass(function (index) {
      return ["item-" + index, "common", "hello world"]
    })

    for (const [index, element] of document.querySelectorAll("li").entries()) {
      expect(element.classList.contains("item-" + index)).toBe(true)
      expect(element.classList.contains("common")).toBe(true)
      expect(element.classList.contains("hello")).toBe(true)
      expect(element.classList.contains("world")).toBe(true)
    }
  })

  it("addClass 忽略 null 类型输入", () => {
    const el = document.createElement("div")
    el.className = "a"
    d(el).addClass(null)
    expect(el.className).toBe("a")
  })
})
