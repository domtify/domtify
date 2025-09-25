import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/after.js"

describe("after", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <h2>h2-1</h2>
        <h2>h2-2</h2>
        <p>ppp</p>
        <div class="inner">Hello</div>
        <div class="inner">Goodbye</div>
      </div>
    `
  })

  it("插入 HTML 字符串", () => {
    d(".inner").after("<p>this is p</p>")
    const inner1 = document.querySelectorAll(".inner")[0]
    expect(inner1.nextElementSibling.tagName).toBe("P")
    expect(inner1.nextElementSibling.textContent).toBe("this is p")
  })

  it("插入 DOM 元素", () => {
    const el = document.createElement("span")
    el.textContent = "span-text"
    d(".inner").after(el)
    const inner1 = document.querySelectorAll(".inner")[0]
    expect(inner1.nextElementSibling.tagName).toBe("SPAN")
    expect(inner1.nextElementSibling.textContent).toBe("span-text")
  })

  it("插入文本节点", () => {
    d(".inner").after("TEXT")
    expect(document.querySelector(".inner").nextSibling.nodeValue).toContain(
      "TEXT",
    )
  })

  it("插入数组（元素 + 文本）", () => {
    const el = document.createElement("b")
    el.textContent = "BOLD"
    d(".inner").after([el, "TEXT"])
    const inner1 = document.querySelectorAll(".inner")[0]
    expect(inner1.nextElementSibling.tagName).toBe("B")
    expect(inner1.nextElementSibling.textContent).toBe("BOLD")
    expect(inner1.nextSibling.nextSibling.textContent).toBe("TEXT")
  })

  it("插入 domtify 对象", () => {
    const h2s = d("h2")
    d(".inner").after(h2s)
    const inner1 = document.querySelectorAll(".inner")[0]
    expect(inner1.nextElementSibling.tagName).toBe("H2")
    expect(inner1.nextElementSibling.textContent).toBe("h2-1")
  })

  it("函数返回HTML字符串", () => {
    d(".inner").after((index, html) => {
      return `<b>test-${index}</b>`
    })
    const nodeList = document.querySelectorAll("b")

    expect(nodeList[0].textContent).toBe("test-0")
    expect(nodeList[1].textContent).toBe("test-1")
  })

  it("函数返回HTMLCollection集合", () => {
    d(".inner").after(function (index, html) {
      return document.getElementsByTagName("p")
    })

    const container = document.querySelector(".container")

    expect(container.innerHTML.replace(/\s+/g, " ").trim()).toBe(
      `<h2>h2-1</h2> <h2>h2-2</h2> <div class="inner">Hello</div><p>ppp</p> <div class="inner">Goodbye</div><p>ppp</p>`,
    )
  })

  it("多个匹配元素都插入内容", () => {
    d(".inner").after("<i>italic</i>")
    const iTags = document.querySelectorAll("i")
    expect(iTags.length).toBe(2)
    expect(iTags[0].textContent).toBe("italic")
  })
})
