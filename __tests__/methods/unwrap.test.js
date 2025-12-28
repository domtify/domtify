import { describe, it, expect, beforeEach, vi } from "vitest"

import { query } from "@/core.js"
import { unwrap } from "@/methods/unwrap.js"

describe("unwrap", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="wrapper">
        <p class="p1">Hello</p>
        <p class="p2">World</p>
      </div>
      <div class="other-wrapper">
        <span>Test</span>
      </div>
    `
  })

  it("移除父元素，保留子元素", () => {
    const paragraphs = query(".wrapper p")
    unwrap()(paragraphs)

    // 父元素被移除
    expect(document.querySelector(".wrapper")).toBeNull()

    // 子元素仍在 DOM 中
    const ps = document.querySelectorAll("p")
    expect(ps.length).toBe(2)
    expect(ps[0].textContent).toBe("Hello")
    expect(ps[1].textContent).toBe("World")
  })

  it("携带选择器时，只有匹配的父元素才会被移除", () => {
    const paragraphs = query(".wrapper p")
    unwrap(".non-exist")(paragraphs) // 不匹配

    // 父元素未被移除
    expect(document.querySelector(".wrapper")).not.toBeNull()
  })

  it("不移除 body 或 html", () => {
    // 将 p 直接放到 body 下
    document.body.innerHTML = `<p class="top">Top</p>`
    const p = query(".top")
    unwrap()(p)

    // body 不会被移除
    expect(document.querySelector("body")).not.toBeNull()
  })

  it("多个元素同时 unwrap", () => {
    const elements = query(".wrapper p, .other-wrapper span")
    unwrap()(elements)

    // 父元素都被移除
    expect(document.querySelector(".wrapper")).toBeNull()
    expect(document.querySelector(".other-wrapper")).toBeNull()

    // 子元素都在 body 下
    expect(document.querySelectorAll("p").length).toBe(2)
    expect(document.querySelectorAll("span").length).toBe(1)
  })
})
