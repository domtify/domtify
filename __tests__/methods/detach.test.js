import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/detach.js"
import "@/methods/on.js"
import "@/methods/get.js"
import "@/methods/data.js"

describe("detach", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="container">
      <div class="hello">Hello</div>
      <div class="hello">Hello2</div>
      <div class="hello goodbye">Goodbye</div>
    </div>  
    `
  })

  it("删除选中的元素", () => {
    d(".hello").detach()

    expect(document.querySelectorAll(".hello").length).toBe(0)
  })

  it("选择器进一步过滤", () => {
    d(".hello").detach(".goodbye")

    expect(document.querySelectorAll(".hello").length).toBe(2) // 应该保留1个
    expect(document.querySelectorAll(".goodbye").length).toBe(0) // .goodbye 应该被移除
  })

  it("不会移除事件和数据", () => {
    /* 
      1.先给要移除的元素绑定一个事件用于测试以及设置上data数据
      2.移除该元素
      3. 重新插入到容器中
      4.再次点击则事件和数据不会丢失
    */

    const handler = vi.fn()

    const res = d(".goodbye").on("click", handler)
    d(".goodbye").data("foo", "bar")

    res.get(0).click()

    const removedElement = d(".goodbye").detach().get(0)
    document.querySelector(".container").appendChild(removedElement)
    removedElement.click()

    expect(handler).toHaveBeenCalledTimes(2)
    expect(d(".goodbye").data("foo")).toBe("bar")
  })
})
