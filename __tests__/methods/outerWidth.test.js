import { describe, it, expect, beforeEach, vi } from "vitest"

import { dom } from "@/core.js"
import { outerWidth } from "@/methods/outerWidth.js"
import { mockViewport } from "../helpers/viewport.js"
import $ from "jquery"

describe("outerWidth", () => {
  let borderBoxEl
  let contentBoxEl
  beforeEach(() => {
    const style = document.createElement("style")
    style.textContent = `
      .box {
        width: 200px;
        width: 200px;
        padding: 10px;
        margin: 20px;
        border: 10px solid red;
      }
      .border-box {
        box-sizing: border-box;
      }
      .content-box {
        box-sizing: content-box;
      }
    `
    document.head.appendChild(style)

    document.body.innerHTML = `
    <div class="box border-box">.border-box</div>
    <div class="box content-box">.content-box</div>
    `

    borderBoxEl = document.querySelector(".border-box")
    contentBoxEl = document.querySelector(".content-box")
  })

  describe("获取window宽度", () => {
    it("jquery ", () => {
      mockViewport({ width: 800 })
      expect($(window).outerWidth()).toBe(800)
      mockViewport({ width: 600 })
      expect($(window).outerWidth()).toBe(600)
    })

    it("domtify ", () => {
      mockViewport({ width: 800 })
      expect(outerWidth()(dom(window))).toBe(800)
      mockViewport({ width: 600 })
      expect(outerWidth()(dom(window))).toBe(600)
    })
  })

  describe("获取 document 宽度", () => {
    it("jquery", () => {
      document.body.style.width = "1000px"
      expect($(document).outerWidth()).toBe(1000)
      document.body.style.width = "2000px"
      expect($(document).outerWidth()).toBe(2000)
    })

    it("domtify", () => {
      document.body.style.width = "1000px"
      expect(outerWidth()(dom(document))).toBe(1000)
      document.body.style.width = "2000px"
      expect(outerWidth()(dom(document))).toBe(2000)
    })
  })

  describe("border-box 元素", () => {
    it("jquery", () => {
      expect($(".border-box").outerWidth()).toBe(200)
    })

    it("domtify", () => {
      expect(outerWidth()(dom(".border-box"))).toBe(200)
    })
  })

  describe("border-box 元素,includeMargin=true", () => {
    it("jquery", () => {
      expect($(".border-box").outerWidth(true)).toBe(240)
    })

    it("domtify", () => {
      expect(outerWidth(true)(dom(".border-box"))).toBe(240)
    })
  })

  describe("content-box 元素", () => {
    it("jquery", () => {
      expect($(".content-box").outerWidth()).toBe(239.2)
    })

    it("domtify", () => {
      expect(outerWidth()(dom(".content-box"))).toBe(239.2)
    })
  })

  describe("content-box 元素,includeMargin=true", () => {
    it("jquery", () => {
      expect($(".content-box").outerWidth(true)).toBe(279.2)
    })

    it("domtify", () => {
      expect(outerWidth(true)(dom(".content-box"))).toBe(279.2)
    })
  })

  describe("setter:数字", () => {
    it("jquery", () => {
      $(".box").outerWidth(100)
      expect(borderBoxEl.style.width).toBe("100px")
      expect(contentBoxEl.style.width).toBe("60.8px")
    })

    it("domtify", () => {
      outerWidth(100)(dom(".box"))
      expect(borderBoxEl.style.width).toBe("100px")
      expect(contentBoxEl.style.width).toBe("60.8px")
    })
  })

  describe("setter-数字字符串", () => {
    it("jquery", () => {
      $(".box").outerWidth("100")
      expect(borderBoxEl.style.width).toBe("100px")
      expect(contentBoxEl.style.width).toBe("60.8px")
    })

    it("domtify", () => {
      outerWidth("100")(dom(".box"))
      expect(borderBoxEl.style.width).toBe("100px")
      expect(contentBoxEl.style.width).toBe("60.8px")
    })
  })

  describe("非px单位的情况(em,rem,％)", () => {
    it("jquery", () => {
      $(".box").outerWidth("10em")
      expect(borderBoxEl.style.width).toBe("10em")
      expect(contentBoxEl.style.width).toBe("120.8px")
    })
    it("domtify", () => {
      outerWidth("10em")(dom(".box"))
      expect(borderBoxEl.style.width).toBe("10em")
      expect(contentBoxEl.style.width).toBe("120.8px")
    })
  })

  describe("非px单位的情况(em,rem,％),includeMargin=true", () => {
    it("jquery", () => {
      $(".box").outerWidth("10em", true)
      expect(borderBoxEl.style.width).toBe("120px")
      expect(contentBoxEl.style.width).toBe("80.8px")
    })
    it("domtify", () => {
      outerWidth("10em", true)(dom(".box"))
      expect(borderBoxEl.style.width).toBe("120px")
      expect(contentBoxEl.style.width).toBe("80.8px")
    })
  })

  describe("setter-带错误单位的字符串", () => {
    it("jquery", () => {
      $(".box").outerWidth("10pq")
      expect(borderBoxEl.style.width).toBe("")
      expect(contentBoxEl.style.width).toBe("160.8px")
    })

    it("domtify", () => {
      outerWidth("10pq")(dom(".box"))
      expect(borderBoxEl.style.width).toBe("")
      expect(contentBoxEl.style.width).toBe("160.8px")
    })
  })

  describe("设置值时包括margin", () => {
    it("jquery", () => {
      $(".box").outerWidth(100, true)
      expect(borderBoxEl.style.width).toBe("60px")
      expect(contentBoxEl.style.width).toBe("20.8px")
    })
    it("domtify", () => {
      outerWidth(100, true)(dom(".box"))
      expect(borderBoxEl.style.width).toBe("60px")
      expect(contentBoxEl.style.width).toBe("20.8px")
    })
  })

  describe("setter-函数", () => {
    it("jquery", () => {
      const fn = vi.fn(() => "100")
      $(".box").outerWidth(fn)
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(200)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(239.2)
      expect(borderBoxEl.style.width).toBe("100px")
      expect(contentBoxEl.style.width).toBe("60.8px")
    })

    it("domtify", () => {
      const fn = vi.fn(() => "100")
      outerWidth(fn)(dom(".box"))
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(200)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(239.2)
      expect(borderBoxEl.style.width).toBe("100px")
      expect(contentBoxEl.style.width).toBe("60.8px")
    })
  })

  describe("setter-函数,includeMargin=true", () => {
    it("jquery", () => {
      const fn = vi.fn(() => "100")
      $(".box").outerWidth(fn, true)
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(240)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(279.2)
      expect(borderBoxEl.style.width).toBe("60px")
      expect(contentBoxEl.style.width).toBe("20.8px")
    })

    it("domtify", () => {
      const fn = vi.fn(() => "100")
      outerWidth(fn, true)(dom(".box"))
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(240)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(279.2)
      expect(borderBoxEl.style.width).toBe("60px")
      expect(contentBoxEl.style.width).toBe("20.8px")
    })
  })
})
