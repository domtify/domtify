import { beforeEach, describe, expect, it, vi } from 'vitest'

import { dom } from '@/core/dom'
import { each } from '@/method/each'

describe('each', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="d1"></div>
      <div id="d2"></div>
      <div id="d3"></div>
      <div id="d4"></div>
    `
  })

  it('遍历所有元素', () => {
    const result = []
    each(function (index, el) {
      expect(index).toBeGreaterThanOrEqual(0)
      expect(index).toBe(result.length) // 这里每次 index 应该等于当前 result 长度

      expect(this).toBe(el) // 检查 this 是否是当前元素
      result.push(el.id)
    })(dom('div'))
    expect(result).toEqual(['d1', 'd2', 'd3', 'd4'])
  })

  it('return false 时中断循环', () => {
    const result = []
    each(function (index, el) {
      result.push(el.id)
      if (el.id === 'd2') return false
    })(dom('div'))
    expect(result).toEqual(['d1', 'd2']) // 应该在 d2 时终止
  })

  it('遍历后应该还继续返回原来的对象', () => {
    const $items = dom('div')
    const fn = vi.fn()
    const res = each(fn)($items)
    expect($items).toBe(res)
  })
})
