import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/get.js"
import "@/methods/add.js"

describe("add", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li>list item 1</li>
        <li>list item 2</li>
        <li>list item 3</li>
      </ul>
      <p>a paragraph</p>
      <div class="empty">
        <p>this is empty p</p>
      </div>
    `
  })

  it("css选择器", () => {
    const result = d("li").add("p")
    expect(result.get().length).toBe(5) // 3 li + 2 p
    expect(result.get(3).tagName).toBe("P")
    expect(result.get(4).tagName).toBe("P")
  })

  it("element", () => {
    const el = document.querySelector("p")
    const result = d("li").add(el)
    expect(result.get().length).toBe(4)
    expect(result.get().at(-1)).toBe(el)
  })

  it("html代码片段", () => {
    const result = d("li").add("<p id='new'>new paragraph</p>")
    const nodes = result.get()
    expect(nodes.length).toBe(4)
    expect(nodes.at(-1).id).toBe("new")
  })

  it("domtify对象", () => {
    const result = d("li").add(d("p"))
    expect(result.get().length).toBe(5)
    expect(result.get().some((el) => el.tagName === "P")).toBe(true)
  })

  it("context参数限制范围", () => {
    const context = document.querySelector(".empty")
    const result = d("li").add("p", context)
    const addedP = result.get().filter((el) => el.tagName === "P")
    expect(addedP.length).toBe(1)
    expect(addedP[0].textContent).toBe("this is empty p")
  })

  it("返回一个新的domtify实例", () => {
    const li = d("li")
    const result = li.add("p")
    expect(result).not.toBe(li) // 浅比较
  })
})
