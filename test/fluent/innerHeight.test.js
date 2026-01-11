import { describe, it, expect, beforeEach, vi } from 'vitest'

import { dom } from '@/core.js'
import { innerHeight } from '@/methods/innerHeight.js'
import { mockViewport } from '../helpers/viewport.js'
import $ from 'jquery'

describe('innerHeight', () => {
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

  describe('获取 window 高度', () => {
    it('jquery', () => {
      mockViewport({ height: 800 })
      expect($(window).innerHeight()).toBe(800)
      mockViewport({ height: 600 })
      expect($(window).innerHeight()).toBe(600)
    })

    it('domtify', () => {
      mockViewport({ height: 800 })
      expect(innerHeight()(dom(window))).toBe(800)
      mockViewport({ height: 600 })
      expect(innerHeight()(dom(window))).toBe(600)
    })
  })

  describe('获取 document 高度', () => {
    it('jquery', () => {
      document.documentElement.style.height = '980px'
      document.body.style.height = '1000px'

      expect($(document).innerHeight()).toBe(1020)
    })

    it('domtify', () => {
      document.documentElement.style.height = '980px'
      document.body.style.height = '1000px'

      expect(innerHeight()(dom(document))).toBe(1020)
    })
  })

  describe('border-box 元素', () => {
    it('jquery', () => {
      expect($('.border-box').innerHeight()).toBe(180.8)
    })

    it('domtify', () => {
      expect(innerHeight()(dom('.border-box'))).toBe(180.8)
    })
  })

  describe('content-box 元素', () => {
    it('jquery', () => {
      expect($('.content-box').innerHeight()).toBe(220)
    })

    it('domtify', () => {
      expect(innerHeight()(dom('.content-box'))).toBe(220)
    })
  })

  describe('setter-数字', () => {
    it('jquery', () => {
      $('.box').innerHeight(100)
      expect(borderBoxEl.style.height).toBe('119.2px')
      expect(contentBoxEl.style.height).toBe('80px')
    })

    it('domtify', () => {
      innerHeight(100)(dom('.box'))
      expect(borderBoxEl.style.height).toBe('119.2px')
      expect(contentBoxEl.style.height).toBe('80px')
    })
  })

  describe('setter-数字字符串', () => {
    it('jquery', () => {
      $('.box').innerHeight('100')
      expect(borderBoxEl.style.height).toBe('119.2px')
      expect(contentBoxEl.style.height).toBe('80px')
    })

    it('domtify', () => {
      innerHeight('100')(dom('.box'))
      expect(borderBoxEl.style.height).toBe('119.2px')
      expect(contentBoxEl.style.height).toBe('80px')
    })
  })

  describe('setter-带单位的字符串 如“em”、“％”、“rem”等', () => {
    it('jquery', () => {
      $('.box').innerHeight('10em')
      expect(borderBoxEl.style.height).toBe('179.2px')
      expect(contentBoxEl.style.height).toBe('140px')
    })

    it('domtify', () => {
      innerHeight('10em')(dom('.box'))
      expect(borderBoxEl.style.height).toBe('179.2px')
      expect(contentBoxEl.style.height).toBe('140px')
    })
  })

  describe('setter-带错误单位的字符串', () => {
    it('jquery', () => {
      $('.box').innerHeight('10pq')
      expect(borderBoxEl.style.height).toBe('219.2px')
      expect(contentBoxEl.style.height).toBe('180px')
    })

    it('domtify', () => {
      innerHeight('10pq')(dom('.box'))
      expect(borderBoxEl.style.height).toBe('219.2px')
      expect(contentBoxEl.style.height).toBe('180px')
    })
  })

  describe('setter-函数', () => {
    it('jquery', () => {
      const fn = vi.fn(() => '100')
      $('.box').innerHeight(fn)
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(180.8)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(220)
      expect(borderBoxEl.style.height).toBe('119.2px')
      expect(contentBoxEl.style.height).toBe('80px')
    })

    it('domtify', () => {
      const fn = vi.fn(() => '100')

      innerHeight(fn)(dom('.box'))
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(180.8)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(220)
      expect(borderBoxEl.style.height).toBe('119.2px')
      expect(contentBoxEl.style.height).toBe('80px')
    })
  })
})
