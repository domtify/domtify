import $ from 'jquery'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { dom } from '@/core/dom'
import { width } from '@/method/width'
import { mockViewport } from '../helper'

describe('width', () => {
  let borderBoxEl
  let contentBoxEl

  beforeEach(() => {
    const style = document.createElement('style')
    style.textContent = `
      .box {
        width: 200px;
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
      expect($(window).width()).toBe(800)
      mockViewport({ width: 600 })
      expect($(window).width()).toBe(600)
    })

    it('domtify', () => {
      mockViewport({ width: 800 })
      expect(width()(dom(window))).toBe(800)
      mockViewport({ width: 600 })
      expect(width()(dom(window))).toBe(600)
    })
  })

  describe('获取 document 宽度', () => {
    it('jquery', () => {
      document.documentElement.style.width = '980px'
      document.body.style.width = '1000px'
      expect($(document).width()).toBe(1000)
    })
    it('domtify', () => {
      document.documentElement.style.width = '980px'
      document.body.style.width = '1000px'
      expect(width()(dom(document))).toBe(1000)
    })
  })

  describe('border-box 元素', () => {
    it('jquery', () => {
      expect($('.border-box').width()).toBe(160.8)
    })
    it('domtify', () => {
      expect(width()(dom('.border-box'))).toBe(160.8)
    })
  })

  describe('content-box 元素', () => {
    it('jquery', () => {
      expect($('.content-box').width()).toBe(200)
    })

    it('domtify', () => {
      expect(width()(dom('.content-box'))).toBe(200)
    })
  })

  describe('setter:number', () => {
    it('jquery', () => {
      $('.box').width(100)
      expect(borderBoxEl.style.width).toBe('139.2px')
      expect(contentBoxEl.style.width).toBe('100px')
    })

    it('domtify', () => {
      width(100)(dom('.box'))
      expect(borderBoxEl.style.width).toBe('139.2px')
      expect(contentBoxEl.style.width).toBe('100px')
    })
  })

  describe('setter: 数字字符串', () => {
    it('jquery', () => {
      $('.box').width('100')
      expect(borderBoxEl.style.width).toBe('139.2px')
      expect(contentBoxEl.style.width).toBe('100px')
    })

    it('domtify', () => {
      width('100')(dom('.box'))
      expect(borderBoxEl.style.width).toBe('139.2px')
      expect(contentBoxEl.style.width).toBe('100px')
    })
  })

  describe('设置高度-带单位的字符串 如“em”、“％”、“rem”等', () => {
    it('jquery', () => {
      $('.box').width('10em')

      expect(borderBoxEl.style.width).toBe('199.2px')
      expect(contentBoxEl.style.width).toBe('10em')
    })

    it('domtify', () => {
      width('10em')(dom('.box'))

      expect(borderBoxEl.style.width).toBe('199.2px')
      expect(contentBoxEl.style.width).toBe('10em')
    })
  })

  describe('设置高度-带错误单位的字符串', () => {
    it('jquery', () => {
      $('.box').width('10pq')
      expect(borderBoxEl.style.width).toBe('239.2px')
      expect(contentBoxEl.style.width).toBe('')
    })

    it('domtify', () => {
      width('10pq')(dom('.box'))
      expect(borderBoxEl.style.width).toBe('239.2px')
      expect(contentBoxEl.style.width).toBe('')
    })
  })

  describe('设置高度-函数', () => {
    it('jquery', () => {
      const fn = vi.fn(() => '100')

      $('.box').width(fn)

      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(160.8)

      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(200)

      expect(borderBoxEl.style.width).toBe('139.2px')
      expect(contentBoxEl.style.width).toBe('100px')
    })

    it('domtify', () => {
      const fn = vi.fn(() => '100')

      width(fn)(dom('.box'))

      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(160.8)

      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(200)

      expect(borderBoxEl.style.width).toBe('139.2px')
      expect(contentBoxEl.style.width).toBe('100px')
    })
  })
})
