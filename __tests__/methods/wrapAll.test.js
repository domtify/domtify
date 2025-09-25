import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/wrapAll.js"
import "@/methods/get.js"

describe("wrapAll", () => {
  let container
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <div class="inner">Hello</div>
        <div class="inner">Goodbye</div>
      </div>
      <div class="double"><div></div></div>
    `
    container = document.body
  })

  it("用选择器包装元素", () => {
    const inners = d(".inner")
    inners.wrapAll(".double")

    const wrapper = container.querySelector(".double")
    expect(wrapper).not.toBeNull()
    expect(wrapper.contains(inners.get(0))).toBe(true)
    expect(wrapper.contains(inners.get(1))).toBe(true)
  })

  it("用 HTML 字符串包装元素", () => {
    const inners = d(".inner")
    inners.wrapAll("<div class='new'></div>")

    const wrapper = container.querySelector(".new")
    expect(wrapper).not.toBeNull()
    expect(wrapper.children.length).toBe(2)
    expect(wrapper.contains(inners.get(0))).toBe(true)
    expect(wrapper.contains(inners.get(1))).toBe(true)
  })

  it("用元素包装元素", () => {
    const inners = d(".inner")
    const existing = container.querySelector(".double")
    inners.wrapAll(existing)

    const wrapper = container.querySelector(".double")
    expect(wrapper).not.toBeNull()
    expect(wrapper.contains(inners.get(0))).toBe(true)
    expect(wrapper.contains(inners.get(1))).toBe(true)
  })

  it("集合对象", () => {
    const inners = d(".inner").wrapAll(d(".double"))

    const existing = d(".double")
    inners.wrapAll(existing)

    const wrapper = container.querySelector(".double")
    expect(wrapper).not.toBeNull()
    expect(wrapper.contains(inners.get(0))).toBe(true)
    expect(wrapper.contains(inners.get(1))).toBe(true)
  })

  it("数字边缘情况", () => {
    expect(() => d(".inner").wrapAll(10)).not.throw()
  })

  it("函数返回包装元素", () => {
    const inners = d(".inner")
    inners.wrapAll(function () {
      return "<div class='new'></div>"
    })

    const wrapper = container.querySelector(".new")
    expect(wrapper).not.toBeNull()
    expect(wrapper.children.length).toBe(2)
    expect(wrapper.contains(inners.get(0))).toBe(true)
    expect(wrapper.contains(inners.get(1))).toBe(true)
  })

  it("没有父元素时不会报错", () => {
    // 移除 container
    const inners = d(".inner")
    const parent = container.querySelector(".container")
    parent.remove()

    const res = inners.wrapAll("<div class='new'></div>")
    expect(res).toBe(inners)
  })

  it("如果没找到元素,则不进行任何操作提前返回this", () => {
    const instance = d("p")
    const returned = instance.wrapAll(".no-exist")
    expect(returned).toBe(instance)
  })

  it("没有父级节点也应该提前返回this", () => {
    // 创建一个脱离 DOM 的元素
    const detached = document.createElement("div")
    detached.className = "inner"

    const collection = d([detached]) // 使用集合对象包装

    // 传入任何包装元素都可以
    const res = collection.wrapAll("<div class='wrapper'></div>")

    // 应该直接返回原集合对象，不报错
    expect(res).toBe(collection)
  })
})
