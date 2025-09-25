import { describe, it, expect, vi, beforeEach } from "vitest"
import { domtify as d, Domtify } from "@/core.js"

// 导入需要的方法
import "@/methods/get.js"

describe("core", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app">
        <p class="item">hello</p>
        <span class="item">world</span>
      </div>
    `
  })

  it("支持直接传入element", () => {
    const el = document.getElementById("app")
    const res = d(el)
    expect(res).toBeInstanceOf(Domtify)
    expect(res.length).toBe(1)
    expect(res[0]).toBe(el)
    expect(Reflect.has(res, "prevObject")).toBe(false)
  })

  it("支持传入选择器", () => {
    const res = d(".item")
    expect(res.length).toBe(2)
    expect(res[0].textContent).toBe("hello")
    expect(Reflect.has(res, "prevObject")).toBe(true)
  })

  it("支持HTML字符串", () => {
    const res = d("<div class='new'>test</div>")
    expect(res.length).toBe(1)
    expect(res[0].className).toBe("new")
    expect(Reflect.has(res, "prevObject")).toBe(false)
  })

  it("不支持jQuery中的特殊选择器", () => {
    const res = d(":checkbox")
    expect(res.length).toBe(0)
    expect(Reflect.has(res, "prevObject")).toBe(true)
  })

  it("支持NodeList/HTMLCollection", () => {
    const nodeList = document.querySelectorAll(".item")
    const res = d(nodeList)
    expect(res.length).toBe(2)
    expect(Reflect.has(res, "prevObject")).toBe(false)
  })

  it("支持包含元素的数组", () => {
    const arr = [document.createElement("a"), document.createElement("b")]
    const res = d(arr)
    expect(res.length).toBe(2)
    expect(Reflect.has(res, "prevObject")).toBe(false)
  })

  it("支持解析d实例对象", () => {
    const d1 = d(".item")
    const res = d(d1)
    expect(d1).toBe(res) // 相同实例
    expect(Reflect.has(res, "prevObject")).toBe(false)
  })

  it("传递函数表示页面加载完成后触发回调", () => {
    const fn = vi.fn()
    const res = d(fn)
    // 这里需要手动触发 DOMContentLoaded，因为 Vitest 的 jsdom 不会自然触发
    document.dispatchEvent(new Event("DOMContentLoaded"))
    expect(fn).toHaveBeenCalled()
    expect(Reflect.has(res, "prevObject")).toBe(false)
  })

  it("null或者undefined", () => {
    const res = d(null)
    expect(res.length).toBe(0)
    expect(Reflect.has(res, "prevObject")).toBe(false)
  })

  it("字符串非id选择器和html字符串都会绑定prevObject属性", () => {
    const res = d(".item", document.querySelector("#app"))

    expect(Reflect.has(res, "prevObject")).toBe(true)
  })

  it("非假的其它值,比如转换为boolean非假的数字", () => {
    const res = d(1)
    expect(res.length).toBe(1)
    expect(res[0]).toBe(1)
    expect(Reflect.has(res, "prevObject")).toBe(false)
  })
})
