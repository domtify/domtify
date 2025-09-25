import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/position.js"

describe("position", () => {
  beforeEach(() => {
    const style = document.createElement("style")
    style.textContent = `
      html {
        margin: 100px;
      }
    `
    document.head.appendChild(style)
    document.body.innerHTML = `
    <div class="container0">
      <div class="child" style="display: none"></div>
    </div>

    <div class="container1" style="padding: 10px; margin: 10px">
      <div class="child"></div>
    </div>

    <div
      class="container2"
      style="
        position: relative;
        padding-left: 10px;
        padding-top: 20px;
        margin: 5px;
      "
    >
      <div class="child"></div>
    </div>

    <div class="container3">
      <div
        class="child"
        style="position: fixed; left: 10px; top: 20px; margin: 10px"
      ></div>
    </div>

    <div class="container4">
      <div
        class="child"
        style="position: absolute; left: 10px; top: 20px; margin: 10px"
      ></div>
    </div>

    <div class="container5" style="position: relative; border: 10px solid red">
      <div class="child" style="position: absolute; top: 0; left: 0"></div>
    </div>

    <div
      class="container6"
      style="position: relative; width: 100px; height: 100px; overflow: scroll"
    >
      <div style="width: 300px; height: 300px"></div>
      <div
        class="child"
        style="
          position: absolute;
          top: 50px;
          left: 50px;
          width: 20px;
          height: 20px;
        "
      ></div>
    `
  })

  it("不存在的集合", () => {
    let res
    expect(() => {
      res = d(".not-exist").position()
    }).not.toThrow()
    expect(res).toBeUndefined()
  })

  it("边缘情况数字", () => {
    const result = d(10).position()
    expect(result).toBeUndefined()
  })

  it("元素不可见", () => {
    const res = d(".container0 .child").position()
    expect(res).toEqual({
      top: 0,
      left: 0,
    })
  })

  it("不会考虑html标签上的 margin", () => {
    const res = d("html").position()
    expect(res).toEqual({
      top: 0,
      left: 0,
    })
  })

  it("子元素相对 static 父容器,会自动找到顶级doc", () => {
    const res = d(".container1 .child").position()
    expect(res).toEqual({
      top: 120,
      left: 120,
    })
  })

  it("子元素相对 relative 父容器", () => {
    const res = d(".container2 .child").position()
    expect(res).toEqual({
      top: 20,
      left: 10,
    })
  })

  it("父容器有边框", () => {
    const { top, left } = d(".container5 .child").position()

    expectPixelEqual(top, 0.000006103515630684342)
    expectPixelEqual(left, -0.0000015258789005656581)
  })

  it("固定定位", () => {
    const res = d(".container3 .child").position()
    expect(res).toEqual({
      top: 20,
      left: 10,
    })
  })

  it("绝对定位", () => {
    const res = d(".container4 .child").position()
    expect(res).toEqual({
      top: 20,
      left: 10,
    })
  })

  it("父元素有滚动条", () => {
    const parent = document.querySelector(".container6")
    parent.scrollTop = 60
    parent.scrollLeft = 32

    const res = d(".container6 .child").position()
    expect(res).toEqual({
      top: -10,
      left: 18,
    })
  })
})
