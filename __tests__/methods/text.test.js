import { describe, it, expect, beforeEach } from "vitest"

import { el } from "@/core.js"
import { text } from "@/methods/text.js"

// 辅助函数：清理 HTML 中的标签和多余空格
const extractText = (html) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()

describe("text", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="demo-container">
      <div class="demo-box">Demonstration Box</div>
      <ul>
        <li>list item 1</li>
        <li>list <strong>item</strong> 2</li>
      </ul>
    </div>
    `
  })

  it("应获取所选元素的文本内容", () => {
    const result = text()(el(".demo-container"))
    expect(extractText(result)).toBe(
      "Demonstration Box list item 1 list item 2",
    )
  })

  it("会被正确的转义", () => {
    text("<p>This is a test.</p>")(el(".demo-container"))
    const textContent = document.querySelector(".demo-container").textContent
    expect(textContent).toBe("<p>This is a test.</p>")
  })

  it("数字", () => {
    text(10)(el(".demo-container"))
    expect(document.querySelector(".demo-container").textContent).toBe("10")
  })

  it("boolean值", () => {
    text(true)(el(".demo-container"))
    expect(document.querySelector(".demo-container").textContent).toBe("true")
  })

  it("使用函数来设置", () => {
    text((index, oldText) => {
      expect(index).toBe(0)
      expect(extractText(oldText)).toBe(
        "Demonstration Box list item 1 list item 2",
      )
      return "new str"
    })(el(".demo-container"))

    expect(document.querySelector(".demo-container").textContent).toBe(
      "new str",
    )
  })
})
