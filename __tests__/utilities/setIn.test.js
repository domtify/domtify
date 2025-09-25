import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/utilities/setIn.js"

describe("setIn", () => {
  it('字符串方式设置 "a[0].b.c"', () => {
    let object = { a: [{ b: { c: 3 } }] }
    const res = d.setIn(object, "a[0].b.c", 4)

    expect(object).toBe(res)
    expect(object.a[0].b.c).toBe(4)
  })

  it('数组的方式 ["x", "0", "y", "z"]', () => {
    let object = { a: [{ b: { c: 3 } }] }
    const res = d.setIn(object, ["x", "0", "y", "z"], 5)

    expect(object).toBe(res)
    expect(object.x[0].y.z).toBe(5)
  })

  it("返回值是被修改的对象", () => {
    let object = { a: [{ b: { c: 3 } }] }
    let res = d.setIn(object, ["x", "0", "y", "z"], 5)
    expect(res).toBe(object)
    expect(res).toStrictEqual({
      a: [
        {
          b: {
            c: 3,
          },
        },
      ],
      x: [
        {
          y: {
            z: 5,
          },
        },
      ],
    })
  })

  it("支持 Symbol", () => {
    const obj5 = { a: {} }
    const sym = Symbol("symKey")
    let res = d.setIn(obj5.a, sym, 7) // true
    expect(obj5.a).toBe(res)
  })
})
