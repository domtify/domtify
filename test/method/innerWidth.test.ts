import $ from 'jquery'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { dom } from '@/core/dom'
import { innerWidth } from '@/method/innerWidth'
import { mockViewport } from '../helper'

describe('innerWidth', () => {
  let borderBoxEl
  let contentBoxEl

  beforeEach(() => {
    const style = document.createElement('style')
    style.textContent = `
      .box {
        height: 200px;
        width: 200px;
        padding: 10px;
        margin: 20px;
        border: 10px solid red;
      }
      .border-box {
        box-sizing: border-box;
      }
      .content-box {
        box-sizing: content-box;
      }
    `
    document.head.appendChild(style)

    document.body.innerHTML = `
    <div class="box border-box">.border-box</div>
    <div class="box content-box">.content-box</div>
    `

    borderBoxEl = document.querySelector('.border-box')
    contentBoxEl = document.querySelector('.content-box')
  })

  describe('获取 window 宽度', () => {
    it('jquery', () => {
      mockViewport({ width: 800 })
      expect($(window).innerWidth()).toBe(800)
      mockViewport({ width: 600 })
      expect($(window).innerWidth()).toBe(600)
    })

    it('domtify', () => {
      mockViewport({ width: 800 })
      expect(innerWidth()(dom(window))).toBe(800)
      mockViewport({ width: 600 })
      expect(innerWidth()(dom(window))).toBe(600)
    })
  })

  describe('获取 document 宽度', () => {
    it('jquery', () => {
      document.documentElement.style.width = '980px'
      document.body.style.width = '1000px'

      expect($(document).innerWidth()).toBe(1000)
    })

    it('domtify', () => {
      document.documentElement.style.width = '980px'
      document.body.style.width = '1000px'

      expect(innerWidth()(dom(document))).toBe(1000)
    })
  })

  describe('border-box 元素', () => {
    it('jquery', () => {
      expect($('.border-box').innerWidth()).toBe(180.8)
    })

    it('domtify', () => {
      expect(innerWidth()(dom('.border-box'))).toBe(180.8)
    })
  })

  describe('content-box 元素', () => {
    it('jquery', () => {
      expect($('.content-box').innerWidth()).toBe(220)
    })

    it('domtify', () => {
      expect(innerWidth()(dom('.content-box'))).toBe(220)
    })
  })

  describe('setter-数字', () => {
    it('jquery', () => {
      $('.box').innerWidth(100)
      expect(borderBoxEl.style.width).toBe('119.2px')
      expect(contentBoxEl.style.width).toBe('80px')
    })

    it('domtify', () => {
      innerWidth(100)(dom('.box'))
      expect(borderBoxEl.style.width).toBe('119.2px')
      expect(contentBoxEl.style.width).toBe('80px')
    })
  })

  describe('setter-数字字符串', () => {
    it('jquery', () => {
      $('.box').innerWidth('100')
      expect(borderBoxEl.style.width).toBe('119.2px')
      expect(contentBoxEl.style.width).toBe('80px')
    })

    it('domtify', () => {
      innerWidth('100')(dom('.box'))
      expect(borderBoxEl.style.width).toBe('119.2px')
      expect(contentBoxEl.style.width).toBe('80px')
    })
  })

  describe('setter-带单位的字符串 如“em”、“％”、“rem”等', () => {
    it('jquery', () => {
      $('.box').innerWidth('10em')
      expect(borderBoxEl.style.width).toBe('179.2px')
      expect(contentBoxEl.style.width).toBe('140px')
    })

    it('domtify', () => {
      innerWidth('10em')(dom('.box'))
      expect(borderBoxEl.style.width).toBe('179.2px')
      expect(contentBoxEl.style.width).toBe('140px')
    })
  })

  describe('setter-带错误单位的字符串', () => {
    it('jquery', () => {
      $('.box').innerWidth('10pq')
      expect(borderBoxEl.style.width).toBe('219.2px')
      expect(contentBoxEl.style.width).toBe('180px')
    })

    it('domtify', () => {
      innerWidth('10pq')(dom('.box'))
      expect(borderBoxEl.style.width).toBe('219.2px')
      expect(contentBoxEl.style.width).toBe('180px')
    })
  })

  describe('setter-函数', () => {
    it('jquery', () => {
      const fn = vi.fn(() => '100')
      $('.box').innerWidth(fn)
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(180.8)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(220)
      expect(borderBoxEl.style.width).toBe('119.2px')
      expect(contentBoxEl.style.width).toBe('80px')
    })

    it('domtify', () => {
      const fn = vi.fn(() => '100')

      innerWidth(fn)(dom('.box'))
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(180.8)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(220)
      expect(borderBoxEl.style.width).toBe('119.2px')
      expect(contentBoxEl.style.width).toBe('80px')
    })
  })
})
