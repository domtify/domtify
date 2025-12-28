import { describe, it, expect, beforeEach } from "vitest"

import { dom } from "@/core.js"
import { replaceAll } from "@/methods/replaceAll.js"

describe("replaceAll", () => {
  let container
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <p>this is p</p>
        <h1>this is h1</h1>
        <h2>this is h2</h2>
        <div class="inner first">Hello</div>
        <div class="inner second">And</div>
        <div class="inner third">Goodbye</div>
      </div>
    `

    container = document.querySelector(".container")
  })

  it("选择器", () => {
    const result = replaceAll("p")(dom(".second"))
    expect(document.querySelector("p")).toBeNull()
    expect(container.firstElementChild.textContent).toBe("And")

    expect(result.length).toBe(1)
    expect(result[0].textContent).toBe("And")
  })

  it("集合对象", () => {
    const result = replaceAll(dom("p"))(dom(".second"))

    expect(result.length).toBe(1)
    expect(container.childElementCount).toBe(5)
    expect(container.querySelector("p")).toBeNull()
    expect(container.children[0].textContent).toBe("And")
  })

  it("数组- 元素都是真实的在页面时存在的dom", () => {
    const result = replaceAll([dom("p"), dom("h1"), dom("h2")])(dom(".second"))
    expect(result.length).toBe(3)
    expect(container.childElementCount).toBe(5)
    expect(container.querySelector("p")).toBeNull()
    expect(container.querySelector("h1")).toBeNull()
    expect(container.querySelector("h2")).toBeNull()
    expect(container.children[0].textContent).toBe("And")
    expect(container.children[1].textContent).toBe("And")
    expect(container.children[2].textContent).toBe("And")
  })
  it("数组- 有的不是页面上存在的dom", () => {
    const result = replaceAll([
      dom("p"),
      `<p>New P</p>`,
      [`<p>New P</p>`, [`<p>New P</p>`]],
    ])(dom(".second"))

    // 只会返回页面上存在的元素
    expect(result.length).toBe(1)
    expect(container.querySelector("p")).toBeNull()
    expect(container.children[0].textContent).toBe("And")
  })

  it("非元素集合不会报错", () => {
    const result = replaceAll(dom("p"))(
      dom([10, 20, document.createTextNode("txt")]),
    )
    // 页面 p 被替换为 TextNode
    expect(document.querySelector("p")).toBeNull()
    // 栈里返回 TextNode 元素
    expect(result.length).toBe(1)
    expect(result[0].nodeType).toBe(Node.TEXT_NODE)
  })

  it("空集合调用时不会报错", () => {
    const result = replaceAll(dom("p"))(dom([]))
    expect(result.length).toBe(0)
  })
})
