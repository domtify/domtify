import { isNumber } from 'is-what'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { dom } from '@/core.js'
import { offset } from '@/methods/offset.js'
import $ from 'jquery'

describe('offset', () => {
  beforeEach(() => {
    const style = document.createElement('style')
    style.textContent = `
      body {
        padding-bottom: 3000px;
      }
      div {
        box-sizing: border-box;
        border: 10px solid red;
      }
    `
    document.head.appendChild(style)
    document.body.innerHTML = `
    <div class="box1"></div>
    <div class="box2" style="position: fixed"></div>
    <div class="box3" style="position: sticky">sticky盒子</div>
    `
  })

  describe('getter:返回 top/left', () => {
    it('jquery', () => {
      const { top, left } = $('.box1').offset()
      expect(isNumber(top)).toBe(true)
      expect(isNumber(left)).toBe(true)
    })

    it('domtify', () => {
      const { top, left } = offset()(dom('.box1'))
      expect(isNumber(top)).toBe(true)
      expect(isNumber(left)).toBe(true)
    })
  })

  describe('getter:无元素时返回 undefined', () => {
    it('jquery', () => {
      expect($('.not-found').offset()).toBeUndefined()
    })

    it('domtify', () => {
      expect(offset()(dom('.not-found'))).toBeUndefined()
    })
  })

  describe('getter:未脱离文档流元素不会受滚动条高度影响', () => {
    it('jquery', () => {
      document.documentElement.style.padding = '10px'

      const { top, left } = $('.box1').offset()
      expect(left).toBe(10)
      expect(top).toBe(10)
    })
    it('domtify', () => {
      document.documentElement.style.padding = '10px'

      const { top, left } = offset()(dom('.box1'))
      expect(left).toBe(10)
      expect(top).toBe(10)
    })
  })

  describe('getter:脱离文档流的元素会考虑到window窗口的滚动条的高度', () => {
    it('jquery', () => {
      // 设置上滚动高度
      window.scrollTo({
        top: 100,
      })

      const { top, left } = $('.box2').offset()

      expect(top, 129.2)
      expect(left, 10)
    })
    it('domtify', () => {
      // 设置上滚动高度
      window.scrollTo({
        top: 100,
      })

      const { top, left } = offset()(dom('.box2'))
      expect(top, 129.2)
      expect(left, 10)
    })
  })

  describe('setter:普通对象', () => {
    it('jquery', () => {
      $('div').offset({
        top: 30,
        left: 20,
      })

      const box1 = document.querySelector('.box1')
      expect(box1.style.position).toBe('relative')
      expect(box1.style.top).toBe('20px')
      expect(box1.style.left).toBe('10px')

      const box2 = document.querySelector('.box2')
      expect(box2.style.position).toBe('fixed')
      expect(box2.style.top).toBe('-70px')
      expect(box2.style.left).toBe('20px')

      const box3 = document.querySelector('.box3')
      expect(box3.style.position).toBe('sticky')

      expect(box3.style.top).toBe('0.800003px')

      expect(box3.style.left).toBe('10px')
    })

    it('domtify', () => {
      offset({
        top: 30,
        left: 20,
      })(dom('div'))

      const box1 = document.querySelector('.box1')
      expect(box1.style.position).toBe('relative')
      expect(box1.style.top).toBe('20px')
      expect(box1.style.left).toBe('10px')

      const box2 = document.querySelector('.box2')
      expect(box2.style.position).toBe('fixed')
      expect(box2.style.top).toBe('-70px')
      expect(box2.style.left).toBe('20px')

      const box3 = document.querySelector('.box3')
      expect(box3.style.position).toBe('sticky')

      expect(box3.style.top).toBe('0.800003px')

      expect(box3.style.left).toBe('10px')
    })
  })

  describe('setter:函数', () => {
    it('jquery', () => {
      const fn = vi.fn(() => ({ top: 30, left: 20 }))

      $('div').offset(fn)

      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBeTypeOf('object')
      expect(fn.mock.calls[0][1]).toHaveProperty('top')
      expect(fn.mock.calls[0][1]).toHaveProperty('left')

      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBeTypeOf('object')
      expect(fn.mock.calls[1][1]).toHaveProperty('top')
      expect(fn.mock.calls[1][1]).toHaveProperty('left')

      const box1 = document.querySelector('.box1')
      expect(box1.style.position).toBe('relative')
      expect(box1.style.top).toBe('20px')
      expect(box1.style.left).toBe('10px')

      const box2 = document.querySelector('.box2')
      expect(box2.style.position).toBe('fixed')
      expect(box2.style.top).toBe('-70px')
      expect(box2.style.left).toBe('20px')

      const box3 = document.querySelector('.box3')
      expect(box3.style.position).toBe('sticky')
      expect(box3.style.top).toBe('0.800003px')
      expect(box3.style.left).toBe('10px')
    })

    it('domtify', () => {
      const fn = vi.fn(() => ({ top: 30, left: 20 }))

      offset(fn)(dom('div'))

      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBeTypeOf('object')
      expect(fn.mock.calls[0][1]).toHaveProperty('top')
      expect(fn.mock.calls[0][1]).toHaveProperty('left')

      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBeTypeOf('object')
      expect(fn.mock.calls[1][1]).toHaveProperty('top')
      expect(fn.mock.calls[1][1]).toHaveProperty('left')

      const box1 = document.querySelector('.box1')
      expect(box1.style.position).toBe('relative')
      expect(box1.style.top).toBe('20px')
      expect(box1.style.left).toBe('10px')

      const box2 = document.querySelector('.box2')
      expect(box2.style.position).toBe('fixed')
      expect(box2.style.top).toBe('-70px')
      expect(box2.style.left).toBe('20px')

      const box3 = document.querySelector('.box3')
      expect(box3.style.position).toBe('sticky')
      expect(box3.style.top).toBe('0.800003px')
      expect(box3.style.left).toBe('10px')
    })
  })
})
