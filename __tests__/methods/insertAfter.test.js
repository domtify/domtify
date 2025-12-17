import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { insertAfter } from "@/methods/insertAfter.js"

describe("insertAfter", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <h2>Greetings</h2>
        <div class="inner inner1">Hello</div>
        <div class="inner inner2">Goodbye</div>
      </div>
    `
  })

  it("支持选择器", () => {
    insertAfter(".inner")(el("<p>Test</p>"))
    const inners = document.querySelectorAll(".inner")
    expect(inners[0].nextElementSibling.tagName).toBe("P")
    expect(inners[1].nextElementSibling.tagName).toBe("P")
  })

  it("支持字符串(字符串实际上不会有任何反应,还是原来的dom结构)", () => {
    insertAfter("<div>Fake</div>")(el("<p>Invalid</p>"))
    expect(document.body.innerHTML).not.toContain("Invalid")
  })

  it("支持元素", () => {
    insertAfter(document.querySelector("h2"))(el("<p>After h2</p>"))
    expect(document.querySelector("h2").nextElementSibling.textContent).toBe(
      "After h2",
    )
  })

  it("支持数组", () => {
    const targets = [
      document.querySelector("h2"),
      document.querySelectorAll(".inner"),
    ]
    insertAfter(targets)(el("<span>Multi</span>"))
    const spans = document.querySelectorAll("span")
    expect(spans.length).toBe(3) // h2 + 2个 inner
  })

  it("空集合: 不报错", () => {
    expect(() => insertAfter(".not-exist")(el("<p>xx</p>"))).not.toThrow()
  })

  it("链式调用", () => {
    const p = el("<p>Chain</p>")
    const res = insertAfter("h2")(p)

    expect(Array.isArray(res)).toBe(true)
  })
})
