import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { wrapAll } from "@/methods/wrapAll.js"

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
    const inners = el(".inner")
    wrapAll(".double")(inners)

    const wrapper = container.querySelector(".double")
    expect(wrapper).not.toBeNull()
    expect(wrapper.contains(inners[0])).toBe(true)
    expect(wrapper.contains(inners[1])).toBe(true)
  })

  it("用 HTML 字符串包装元素", () => {
    const inners = el(".inner")
    wrapAll("<div class='new'></div>")(inners)

    const wrapper = container.querySelector(".new")
    expect(wrapper).not.toBeNull()
    expect(wrapper.children.length).toBe(2)
    expect(wrapper.contains(inners[0])).toBe(true)
    expect(wrapper.contains(inners[1])).toBe(true)
  })

  it("用元素包装元素", () => {
    const inners = el(".inner")
    const existing = container.querySelector(".double")
    wrapAll(existing)(inners)

    const wrapper = container.querySelector(".double")
    expect(wrapper).not.toBeNull()
    expect(wrapper.contains(inners[0])).toBe(true)
    expect(wrapper.contains(inners[1])).toBe(true)
  })

  it("元素数组", () => {
    const inners = wrapAll(el(".double"))(el(".inner"))

    const existing = el(".double")
    wrapAll(existing)(inners)

    const wrapper = container.querySelector(".double")
    expect(wrapper).not.toBeNull()
    expect(wrapper.contains(inners[0])).toBe(true)
    expect(wrapper.contains(inners[1])).toBe(true)
  })

  it("数字边缘情况", () => {
    expect(() => wrapAll(10)(el(".inner"))).not.throw()
  })

  it("函数返回包装元素", () => {
    const inners = el(".inner")
    wrapAll(function () {
      return "<div class='new'></div>"
    })(inners)

    const wrapper = container.querySelector(".new")
    expect(wrapper).not.toBeNull()
    expect(wrapper.children.length).toBe(2)
    expect(wrapper.contains(inners[0])).toBe(true)
    expect(wrapper.contains(inners[1])).toBe(true)
  })

  it("没有父元素时不会报错", () => {
    // 移除 container
    const inners = el(".inner")
    const parent = container.querySelector(".container")
    parent.remove()

    const res = wrapAll("<div class='new'></div>")(inners)
    expect(res).toBe(inners)
  })

  it("如果没找到元素,则不进行任何操作提前返回this", () => {
    const res = el("p")
    const res2 = wrapAll(".no-exist")(res)
    expect(res2).toBe(res)
  })

  it("没有父级节点也应该提前返回this", () => {
    // 创建一个脱离 DOM 的元素
    const detached = document.createElement("div")
    detached.className = "inner"

    const collection = el([detached]) // 使用集合对象包装

    // 传入任何包装元素都可以
    const res = wrapAll("<div class='wrapper'></div>")(collection)

    // 应该直接返回原集合对象，不报错
    expect(res).toBe(collection)
  })
})
