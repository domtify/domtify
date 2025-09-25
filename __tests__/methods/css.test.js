import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/css.js"

describe("css", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="box1" style="width: 100px; color: yellow; background-color: blue;"></div>
    <div id="box2" style="width: 120px; color: white; background-color: rgb(15,99,30);"></div>
    `
  })

  it("获取单个css属性", () => {
    const color = d("#box1").css("color")
    expect(color).toBe("rgb(255, 255, 0)")
  })

  it("获取多个属性(返回的是属性值对象)", () => {
    const result = d("#box1").css(["width", "color", "background-color"])
    expect(result).toEqual({
      width: "100px",
      color: "rgb(255, 255, 0)",
      "background-color": "rgb(0, 0, 255)",
    })
  })

  it("设置单个css属性", () => {
    d("#box1").css("color", "red")
    const color = getComputedStyle(document.querySelector("#box1")).color
    expect(color).toBe("rgb(255, 0, 0)")
  })

  it("第三个参数priority", () => {
    d("#box1").css("color", "blue", "important")
    const box1El = document.querySelector("#box1")

    const colorPriority = box1El.style.getPropertyPriority("color")
    const colorValue = box1El.style.getPropertyValue("color")

    expect(colorPriority).toBe("important")
    expect(colorValue).toBe("blue")
  })

  it("批量设置css", () => {
    d("#box1").css({
      "background-color": "green",
      "font-weight": "bold",
    })

    const style = getComputedStyle(document.querySelector("#box1"))
    expect(style.backgroundColor).toBe("rgb(0, 128, 0)")
    expect(style.fontWeight).toBe("700")
  })

  it("批量设置属性支持!important", () => {
    d("#box1").css({
      color: "black !important",
      "font-size": "20px !important",
    })

    const el = document.querySelector("#box1")
    const colorPriority = el.style.getPropertyPriority("color")
    const fontSizePriority = el.style.getPropertyPriority("font-size")
    expect(colorPriority).toBe("important")
    expect(fontSizePriority).toBe("important")
  })

  it("设置时第二个参数支持函数", () => {
    d("#box1").css("width", (i, old) => {
      expect(i).toBe(0)
      expect(old).toBe("100px")
      return "300px"
    })

    const width = getComputedStyle(document.querySelector("#box1")).width
    expect(width).toBe("300px")
  })

  it("无匹配元素时返回 undefined", () => {
    const result = d(".not-found").css("color")
    expect(result).toBeUndefined()
  })

  it("无匹配元素时获取多个属性 computed 为 null", () => {
    const result = d(".not-found").css(["width", "color"])
    expect(result).toBeUndefined()
  })

  it("未知的css属性返回 undefined", () => {
    const result = d("#box1").css("foo")
    expect(result).toBeUndefined()
  })

  it("数组方式对于未知的css属性返回 undefined", () => {
    const result = d("#box1").css(["width", "foo"])
    expect(result).toEqual({
      foo: undefined,
      width: "100px",
    })
  })
})
