import $ from 'jquery'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { dom } from '@/core/dom'
import { height } from '@/method/height'
import { mockViewport } from '../helper'

describe('height', () => {
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
      expect($(window).height()).toBe(800)
      mockViewport({ height: 600 })
      expect($(window).height()).toBe(600)
    })

    it('domtify', () => {
      mockViewport({ height: 800 })
      expect(height()(dom(window))).toBe(800)
      mockViewport({ height: 600 })
      expect(height()(dom(window))).toBe(600)
    })
  })

  describe('获取 document 高度', () => {
    it('jquery', () => {
      document.documentElement.style.height = '980px'
      document.body.style.height = '1000px'
      expect($(document).height()).toBe(1020)
    })
    it('domtify', () => {
      document.documentElement.style.height = '980px'
      document.body.style.height = '1000px'
      expect(height()(dom(document))).toBe(1020)
    })
  })

  describe('border-box 元素', () => {
    it('jquery', () => {
      expect($('.border-box').height()).toBe(160.8)
    })
    it('domtify', () => {
      expect(height()(dom('.border-box'))).toBe(160.8)
    })
  })

  describe('content-box 元素', () => {
    it('jquery', () => {
      expect($('.content-box').height()).toBe(200)
    })

    it('domtify', () => {
      expect(height()(dom('.content-box'))).toBe(200)
    })
  })

  describe('setter:number', () => {
    it('jquery', () => {
      $('.box').height(100)
      expect(borderBoxEl.style.height).toBe('139.2px')
      expect(contentBoxEl.style.height).toBe('100px')
    })

    it('domtify', () => {
      height(100)(dom('.box'))
      expect(borderBoxEl.style.height).toBe('139.2px')
      expect(contentBoxEl.style.height).toBe('100px')
    })
  })

  describe('setter: 数字字符串', () => {
    it('jquery', () => {
      $('.box').height('100')
      expect(borderBoxEl.style.height).toBe('139.2px')
      expect(contentBoxEl.style.height).toBe('100px')
    })

    it('domtify', () => {
      height('100')(dom('.box'))
      expect(borderBoxEl.style.height).toBe('139.2px')
      expect(contentBoxEl.style.height).toBe('100px')
    })
  })

  describe('设置高度-带单位的字符串 如“em”、“％”、“rem”等', () => {
    it('jquery', () => {
      $('.box').height('10em')

      expect(borderBoxEl.style.height).toBe('199.2px')
      expect(contentBoxEl.style.height).toBe('10em')
    })

    it('domtify', () => {
      height('10em')(dom('.box'))

      expect(borderBoxEl.style.height).toBe('199.2px')
      expect(contentBoxEl.style.height).toBe('10em')
    })
  })

  describe('设置高度-带错误单位的字符串', () => {
    it('jquery', () => {
      $('.box').height('10pq')
      expect(borderBoxEl.style.height).toBe('239.2px')
      expect(contentBoxEl.style.height).toBe('')
    })

    it('domtify', () => {
      height('10pq')(dom('.box'))
      expect(borderBoxEl.style.height).toBe('239.2px')
      expect(contentBoxEl.style.height).toBe('')
    })
  })

  describe('设置高度-函数', () => {
    it('jquery', () => {
      const fn = vi.fn(() => '100')

      $('.box').height(fn)

      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(160.8)

      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(200)

      expect(borderBoxEl.style.height).toBe('139.2px')
      expect(contentBoxEl.style.height).toBe('100px')
    })

    it('domtify', () => {
      const fn = vi.fn(() => '100')

      height(fn)(dom('.box'))

      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(160.8)

      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(200)

      expect(borderBoxEl.style.height).toBe('139.2px')
      expect(contentBoxEl.style.height).toBe('100px')
    })
  })
})
