import { describe, it, expect, beforeEach, vi } from "vitest"

import { el } from "@/core.js"
import { uniqueSort } from "@/methods/uniqueSort.js"

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
    const divs = el("div").concat(el(".dup")) // 共 9 个
    const res = uniqueSort()(el(divs))
    expect(res.length).toBe(6) // 最终只有 6 个
  })

  it("能过滤掉非 Element 节点", () => {
    const arr = [document.querySelector(".item-1"), 123, "abc", null]
    const res = uniqueSort()(el(arr))
    expect(res.length).toBe(1)
    expect(res[0].className).toBe("item-1")
  })

  it("能按文档顺序排序", () => {
    const res = uniqueSort()(
      el([
        document.querySelector(".item-6"),
        document.querySelector(".item-1"),
        document.querySelector(".item-2"),
      ]),
    )

    const classNames = res.map((el) => el.className)
    expect(classNames).toEqual(["item-1", "item-2", "item-6"])
  })

  it("如果集合里全是重复元素，最后只保留一个", () => {
    const elItem = document.querySelector(".item-1")
    const res = uniqueSort()(el([elItem, elItem, elItem]))
    expect(res.length).toBe(1)
    expect(res[0]).toBe(elItem)
  })

  it("空集合调用也能返回自身，不报错", () => {
    const res = uniqueSort()(el([]))
    expect(res.length).toBe(0)
  })
})
