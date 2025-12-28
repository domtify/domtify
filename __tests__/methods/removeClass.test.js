import { describe, it, expect, beforeEach } from "vitest"

import { query } from "@/core.js"
import { removeClass } from "@/methods/removeClass.js"

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
    removeClass("foo")(query("li"))

    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("bar item-0")
    expect(lis[2].className).toBe("item-2")
  })

  it("空格分割的多个字符串", () => {
    removeClass("foo bar")(query("li"))
    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("item-0")
    expect(lis[1].className).toBe("item-1")
  })

  it("函数，返回字符串", () => {
    removeClass(function (index) {
      return "item-" + index
    })(query("li"))
    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("foo bar")
    expect(lis[1].className).toBe("bar")
    expect(lis[2].className).toBe("foo")
  })

  it("函数，返回数组", () => {
    removeClass(function (index) {
      return ["item-" + index, "bar"]
    })(query("li"))
    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("foo")
    expect(lis[1].className).toBe("")
  })

  it("不传递参数默认移除所有的类", () => {
    removeClass()(query("li"))
    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("")
    expect(lis[1].className).toBe("")
  })

  it("如果是函数但是集合又不是正常元素的情况", () => {
    removeClass(function (index, className) {
      expect(index).toBe(0)
      expect(typeof this).toBe("number")
      expect(this.valueOf()).toBe(1)
      expect(className).toBe("")
      return "test"
    })(query(1))
  })

  it("如果是数字", () => {
    removeClass(1)(query("li"))
    const lis = ul.querySelectorAll("li")
    expect(lis[0].className).toBe("foo bar item-0")
    expect(lis[1].className).toBe("bar item-1")
    expect(lis[2].className).toBe("foo item-2")
  })
})
