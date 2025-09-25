import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d, Domtify } from "@/core.js"

// 按需导入
import "@/methods/get.js"
import "@/methods/children.js"

describe("children", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul class="level-1">
      <li class="item-i">I</li>
      <li class="item-ii">
        II
        <ul class="level-2">
          <li class="item-a">A</li>
          <li class="item-b">
            B
            <ul class="level-3">
              <li class="item-1">1</li>
              <li class="item-2">2</li>
              <li class="item-3">3</li>
            </ul>
          </li>
          <li class="item-c">C</li>
        </ul>
      </li>
      <li class="item-iii">III</li>
    </ul>
    `
  })

  it("无过滤选择器", () => {
    const children = d("ul.level-2").children()
    expect(children.length).toBe(3)
    expect(children.get(0).classList.contains("item-a")).toBe(true)
    expect(children.get(1).classList.contains("item-b")).toBe(true)
    expect(children.get(2).classList.contains("item-c")).toBe(true)
  })

  it("有选择器", () => {
    const children = d("ul.level-2").children(".item-a")
    expect(children.length).toBe(1)
    expect(children.get(0).classList.contains("item-a")).toBe(true)
  })

  it("选择器没有匹配：返回空集合", () => {
    const children = d("ul.level-2").children(".not-exist")
    expect(children.length).toBe(0)
  })

  it("空集合调用：不报错", () => {
    const children = d(".not-exist").children()
    expect(children.length).toBe(0)
  })

  it("链式调用：返回实例本身", () => {
    const el = d("ul.level-2")
    const res = el.children()
    expect(res instanceof Domtify).toBe(true)
    expect(el instanceof Domtify).toBe(true)
  })
})
