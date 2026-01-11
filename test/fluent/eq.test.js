import { describe, it, expect, beforeEach } from 'vitest'

import { dom } from '@/core.js'
import { eq } from '@/methods/eq.js'
import $ from 'jquery'

describe('eq', () => {
  beforeEach(() => {
    // 设置 HTML 测试环境
    document.body.innerHTML = `
    <ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
    <li>item 5</li>
    </ul>
    `
  })

  describe('应按索引获取正确的元素', () => {
    it('jquery', () => {
      const res = $('li').eq(2)
      expect(res.length).toBe(1)
      expect(res[0].textContent).toBe('item 3')
    })
    it('domtify', () => {
      const res = eq(2)(dom('li'))
      expect(res.length).toBe(1)
      expect(res[0].textContent).toBe('item 3')
    })
  })

  describe('支持负数从后往前数', () => {
    it('jquery', () => {
      const res = $('li').eq(-2)
      expect(res.length).toBe(1)
      expect(res[0].textContent).toBe('item 4')
    })
    it('domtify', () => {
      const res = eq(-2)(dom('li'))
      expect(res.length).toBe(1)
      expect(res[0].textContent).toBe('item 4')
    })
  })

  describe('如果超出了范围', () => {
    it('jquery', () => {
      const res = $('li').eq(10)
      expect(res.length).toBe(0)
    })
    it('domtify', () => {
      const res = eq(10)(dom('li'))
      expect(res.length).toBe(0)
    })
  })

  describe('倒着查找索引也超出范围', () => {
    it('jquery', () => {
      const res = $('li').eq(-10)
      expect(res.length).toEqual(0)
    })
    it('domtify', () => {
      const res = eq(-10)(dom('li'))
      expect(res.length).toEqual(0)
    })
  })

  describe('支持字符串数字', () => {
    it('jquery', () => {
      const res = $('li').eq('-2')
      expect(res.length).toBe(1)
      expect(res[0].textContent).toBe('item 4')
    })
    it('domtify', () => {
      const res = eq('-2')(dom('li'))
      expect(res.length).toBe(1)
      expect(res[0].textContent).toBe('item 4')
    })
  })

  describe('其它非数字字符串', () => {
    it('jquery', () => {
      const res = $('li').eq('abcd')
      expect(res.length).toEqual(0)
    })
    it('domtify', () => {
      const res = eq('abcd')(dom('li'))
      expect(res.length).toEqual(0)
    })
  })

  describe('如果没有传递参数', () => {
    it('jquery', () => {
      const res = $('li').eq()
      expect(res.length).toEqual(0)
    })
    it('domtify', () => {
      const res = eq()(dom('li'))
      expect(res.length).toEqual(0)
    })
  })
})
