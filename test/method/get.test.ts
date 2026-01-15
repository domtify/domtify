import $ from 'jquery'
import { beforeEach, describe, expect, it } from 'vitest'
import { dom } from '@/core/dom'
import { get } from '@/method/get'

describe('get', () => {
  beforeEach(() => {
    // 设置 HTML 测试环境
    document.body.innerHTML = `
      <div class="item">A</div>
      <div class="item">B</div>
      <div class="item">C</div>
    `
  })

  describe('应返回指定索引处的元素', () => {
    it('jquery', () => {
      const res = $('.item').get(0)
      expect(res).toBeInstanceOf(HTMLElement)
      expect(res.textContent).toBe('A')
    })
    it('domtify', () => {
      const res = get(0)(dom('.item'))
      expect(res).toBeInstanceOf(HTMLElement)
      expect(res.textContent).toBe('A')
    })
  })

  describe('应返回最后一个索引为负的元素', () => {
    it('jquery', () => {
      const res = $('.item').get(-1)
      expect(res).toBeInstanceOf(HTMLElement)
      expect(res.textContent).toBe('C')
    })
    it('domtify', () => {
      const res = get(-1)(dom('.item'))
      expect(res).toBeInstanceOf(HTMLElement)
      expect(res.textContent).toBe('C')
    })
  })

  describe('当没有提供索引时，应返回完整的结果数组', () => {
    it('jquery', () => {
      const res = $('.item').get()
      expect(Array.isArray(res)).toBe(true)
      expect(res.length).toBe(3)
      expect(res.map(el => el.textContent)).toEqual(['A', 'B', 'C'])
    })
    it('domtify', () => {
      const res = get()(dom('.item'))
      expect(Array.isArray(res)).toBe(true)
      expect(res.length).toBe(3)
      expect(res.map(el => el.textContent)).toEqual(['A', 'B', 'C'])
    })
  })

  describe('为null时应该也返回result', () => {
    it('jquery', () => {
      const res = $('.item').get(null)
      expect(Array.isArray(res)).toBe(true)
      expect(res.length).toBe(3)
      expect(res.map(el => el.textContent)).toEqual(['A', 'B', 'C'])
    })
    it('domtify', () => {
      const res = get(null)(dom('.item'))
      expect(Array.isArray(res)).toBe(true)
      expect(res.length).toBe(3)
      expect(res.map(el => el.textContent)).toEqual(['A', 'B', 'C'])
    })
  })

  describe('数字字符串也支持', () => {
    // 这在jquery中行不通
    // it("jquery", () => {
    //   const res = $(".item").get("-1")
    //   expect(res).toBeUndefined()
    //   expect(res.textContent).toBe("C")
    // })
    it('domtify', () => {
      const res = get('-1')(dom('.item'))
      expect(res).toBeInstanceOf(HTMLElement)
      expect(res.textContent).toBe('C')
    })
  })

  describe('其它字符串都返回undefined', () => {
    it('jquery', () => {
      const res = $('.item').get('abc')
      expect(res).toBeUndefined()
    })
    it('domtify', () => {
      const res = get('abc')(dom('.item'))
      expect(res).toBeUndefined()
    })
  })
})
