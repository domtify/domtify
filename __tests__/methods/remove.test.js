import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/remove.js"
import "@/methods/on.js"
import "@/methods/data.js"
import "@/methods/get.js"

describe("remove", () => {
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
    d(".hello").remove()

    expect(document.querySelectorAll(".hello").length).toBe(0)
  })

  it("选择器进一步过滤", () => {
    const res = d(".hello").remove(".goodbye")

    expect(document.querySelectorAll(".hello").length).toBe(2) // 应该保留1个
    expect(document.querySelectorAll(".goodbye").length).toBe(0) // .goodbye 应该被移除
  })

  it("应该移除事件和数据", () => {
    /* 
      1.先给要移除的元素绑定一个事件用于测试以及设置上data数据
      2.移除该元素
      3. 重新插入到容器中
      4.再次点击则事件丢失
    */

    const handler = vi.fn()

    const res = d(".goodbye").on("click", handler)
    d(".goodbye").data("foo", "bar")

    res.get(0).click()
    const removedElement = d(".goodbye").remove().get(0)
    document.querySelector(".container").appendChild(removedElement)

    removedElement.click()

    // 再次点击，事件应该丢失,所以最终应该只触发一次
    expect(handler).toHaveBeenCalledTimes(1)
    expect(d(".goodbye").data("foo")).toBeUndefined()
  })
})
