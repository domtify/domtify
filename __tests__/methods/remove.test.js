import { describe, it, expect, beforeEach, vi } from "vitest"

import { el } from "@/core.js"
import { remove } from "@/methods/remove.js"
import { on } from "@/methods/on.js"
import { data } from "@/methods/data.js"

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
    remove()(el(".hello"))

    expect(document.querySelectorAll(".hello").length).toBe(0)
  })

  it("选择器进一步过滤", () => {
    remove(".goodbye")(el(".hello"))

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

    const res = on("click", handler)(el(".goodbye"))
    data("foo", "bar")(el(".goodbye"))

    res[0].click()
    const removedElement = remove()(el(".goodbye"))[0]
    document.querySelector(".container").appendChild(removedElement)

    removedElement.click()

    // 再次点击，事件应该丢失,所以最终应该只触发一次
    expect(handler).toHaveBeenCalledTimes(1)
    expect(data("foo")(el(".goodbye"))).toBeUndefined()
  })
})
