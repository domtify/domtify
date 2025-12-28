import { describe, it, expect, beforeEach } from "vitest"

import { query } from "@/core.js"
import { nextAll } from "@/methods/nextAll.js"

describe("nextAll", () => {
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

  it("应当获取所有后续兄弟节点", () => {
    const res = nextAll()(query("li.third-item"))

    expect(res.map((li) => li.textContent.trim())).toEqual([
      "list item 4",
      "list item 5",
    ])
  })

  it("应当按选择器过滤结果", () => {
    const res = nextAll(".third-item")(query("li:first-child"))

    expect(res.map((li) => li.textContent.trim())).toEqual(["list item 3"])
  })
})
