import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { prevAll } from "@/methods/prevAll.js"

describe("prevAll", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li>list item 1</li>
        <li>list item 2</li>
        <li class="third-item">list item 3</li>
        <li>list item 4</li>
        <li>list item 5</li>
      </ul>
    `
  })

  it("应当获取所有前面兄弟节点", () => {
    const res = prevAll()(el("li.third-item"))

    expect(res.map((li) => li.textContent.trim())).toEqual([
      "list item 2",
      "list item 1",
    ])
  })

  it("应当按选择器过滤结果", () => {
    const res = prevAll(".third-item")(el("li:last-child"))

    expect(res.map((li) => li.textContent.trim())).toEqual(["list item 3"])
  })
})
