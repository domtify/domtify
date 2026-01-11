import { describe, it, expect } from 'vitest'
import { extend } from '@/utilities/extend.js'

describe('extend', () => {
  it('应该进行浅拷贝属性', () => {
    const obj1 = { a: 1 }
    const obj2 = { b: 2 }

    const result = extend(obj1, obj2)
    expect(result).toEqual({ a: 1, b: 2 })
    expect(result).toBe(obj1) // 浅拷贝会修改原对象
  })

  it('当 deep=true 时应该深拷贝嵌套对象', () => {
    const obj1 = { a: { x: 1 } }
    const obj2 = { a: { y: 2 } }

    const result = extend(true, obj1, obj2)
    expect(result).toEqual({ a: { x: 1, y: 2 } })
  })

  it('应该正确处理数组', () => {
    const obj1 = { arr: [1, 2] }
    const obj2 = { arr: [3] }

    const result = extend(true, obj1, obj2)
    expect(result.arr).toEqual([3])
  })

  it('应该合并多个源对象', () => {
    const result = extend({}, { a: 1 }, { b: 2 }, { c: 3 })
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('应该拷贝 Symbol 属性', () => {
    const sym = Symbol('test')
    const obj1 = {}
    const obj2 = { [sym]: 42 }

    const result = extend(obj1, obj2)
    expect(result[sym]).toBe(42)
  })

  it('非对象目标应该抛出错误', () => {
    expect(() => extend(null, { a: 1 })).toThrow('extendee must be an object')
    expect(() => extend(123, { a: 1 })).toThrow('extendee must be an object')
  })

  it('应该处理循环引用', () => {
    const obj1 = {}
    obj1.self = obj1

    const obj2 = {}
    obj2.self = obj2

    const result = extend(true, {}, obj1, obj2)
    expect(result.self).toBe(result)
  })

  it('应该忽略 null/undefined 源对象', () => {
    const result = extend({}, { a: 1 }, null, undefined)
    expect(result).toEqual({ a: 1 })
  })
})
