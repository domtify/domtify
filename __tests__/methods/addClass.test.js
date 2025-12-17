import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { addClass } from "@/methods/addClass.js"

describe("addClass", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    `
  })

  it("添加单个字符串类名", () => {
    addClass("foo")(el("li"))
    for (const element of document.querySelectorAll("li")) {
      expect(element.classList.contains("foo")).toBe(true)
    }
  })

  it("添加多个类名（空格分隔字符串）", () => {
    addClass("foo bar")(el("li"))

    for (const element of document.querySelectorAll("li")) {
      expect(element.classList.contains("foo")).toBe(true)
      expect(element.classList.contains("bar")).toBe(true)
    }
  })

  it("添加多个类名（数组，元素中有空格）", () => {
    addClass(["foo bar", "baz"])(el("li"))

    for (const element of document.querySelectorAll("li")) {
      expect(element.classList.contains("foo")).toBe(true)
      expect(element.classList.contains("bar")).toBe(true)
      expect(element.classList.contains("baz")).toBe(true)
    }
  })

  it("添加类名（回调函数返回字符串）", () => {
    addClass(function (index) {
      return "item-" + index
    })(el("li"))

    for (const [index, element] of document.querySelectorAll("li").entries()) {
      expect(element.classList.contains("item-" + index)).toBe(true)
    }
  })

  it("添加类名（回调函数返回数组）", () => {
    addClass(function (index) {
      return ["item-" + index, "common", "hello world"]
    })(el("li"))

    for (const [index, element] of document.querySelectorAll("li").entries()) {
      expect(element.classList.contains("item-" + index)).toBe(true)
      expect(element.classList.contains("common")).toBe(true)
      expect(element.classList.contains("hello")).toBe(true)
      expect(element.classList.contains("world")).toBe(true)
    }
  })

  it("添加类名（回调函数返回数组）", () => {
    addClass(function (index) {
      return ["item-" + index, "common", "hello world"]
    })(el("li"))

    for (const [index, element] of document.querySelectorAll("li").entries()) {
      expect(element.classList.contains("item-" + index)).toBe(true)
      expect(element.classList.contains("common")).toBe(true)
      expect(element.classList.contains("hello")).toBe(true)
      expect(element.classList.contains("world")).toBe(true)
    }
  })

  it("addClass 忽略 null 类型输入", () => {
    const div = document.createElement("div")
    div.className = "a"
    addClass(null)(el(div))
    expect(div.className).toBe("a")
  })
})
