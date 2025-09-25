import { describe, it, expect, beforeEach } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/removeClass.js"

describe("removeClass", () => {
  let ul

  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li class="foo bar item-0"></li>
        <li class="bar item-1"></li>
        <li class="foo item-2"></li>
      </ul>
    `
    ul = document.querySelector("ul")
  })

  it("移除单个类", () => {
    d("li").removeClass("foo")

    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("bar item-0")
    expect(lis[2].className).toBe("item-2")
  })

  it("空格分割的多个字符串", () => {
    d("li").removeClass("foo bar")
    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("item-0")
    expect(lis[1].className).toBe("item-1")
  })

  it("函数，返回字符串", () => {
    d("li").removeClass(function (index) {
      return "item-" + index
    })
    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("foo bar")
    expect(lis[1].className).toBe("bar")
    expect(lis[2].className).toBe("foo")
  })

  it("函数，返回数组", () => {
    d("li").removeClass(function (index) {
      return ["item-" + index, "bar"]
    })
    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("foo")
    expect(lis[1].className).toBe("")
  })

  it("不传递参数默认移除所有的类", () => {
    d("li").removeClass()
    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("")
    expect(lis[1].className).toBe("")
  })

  it("如果是函数但是集合又不是正常元素的情况", () => {
    d(1).removeClass(function (index, className) {
      expect(index).toBe(0)
      expect(typeof this).toBe("number")
      expect(this.valueOf()).toBe(1)
      expect(className).toBe("")
      return "test"
    })
  })

  it("如果是数字", () => {
    d("li").removeClass(1)
    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("foo bar item-0")
    expect(lis[1].className).toBe("bar item-1")
    expect(lis[2].className).toBe("foo item-2")
  })
})
