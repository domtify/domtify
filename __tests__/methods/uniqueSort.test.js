import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/uniqueSort.js"
import "@/methods/get.js"

describe("uniqueSort", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="item-1">1</div>
      <div class="item-2">2</div>
      <div class="dup">3</div>
      <div class="dup">4</div>
      <div class="dup">5</div>
      <div class="item-6">6</div>
    `
  })

  it("能正确去重", () => {
    const divs = d("div").get().concat(d(".dup").get()) // 共 9 个
    const res = d(divs).uniqueSort()
    expect(res.result.length).toBe(6) // 最终只有 6 个
  })

  it("能过滤掉非 Element 节点", () => {
    const arr = [document.querySelector(".item-1"), 123, "abc", null]
    const res = d(arr).uniqueSort()
    expect(res.result.length).toBe(1)
    expect(res.result[0].className).toBe("item-1")
  })

  it("能按文档顺序排序", () => {
    const res = d([
      document.querySelector(".item-6"),
      document.querySelector(".item-1"),
      document.querySelector(".item-2"),
    ]).uniqueSort()

    const classNames = res.result.map((el) => el.className)
    expect(classNames).toEqual(["item-1", "item-2", "item-6"])
  })

  it("如果集合里全是重复元素，最后只保留一个", () => {
    const el = document.querySelector(".item-1")
    const res = d([el, el, el]).uniqueSort()
    expect(res.result.length).toBe(1)
    expect(res.result[0]).toBe(el)
  })

  it("空集合调用也能返回自身，不报错", () => {
    const res = d([]).uniqueSort()
    expect(res.result.length).toBe(0)
  })
})
