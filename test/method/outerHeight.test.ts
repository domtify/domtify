import $ from 'jquery'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { dom } from '@/core/dom'
import { outerHeight } from '@/method/outerHeight'
import { mockViewport } from '../helper'

describe('outerHeight', () => {
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

  describe('获取window高度', () => {
    it('jquery ', () => {
      mockViewport({ height: 800 })
      expect($(window).outerHeight()).toBe(800)
      mockViewport({ height: 600 })
      expect($(window).outerHeight()).toBe(600)
    })

    it('domtify ', () => {
      mockViewport({ height: 800 })
      expect(outerHeight()(dom(window))).toBe(800)
      mockViewport({ height: 600 })
      expect(outerHeight()(dom(window))).toBe(600)
    })
  })

  describe('获取 document 高度', () => {
    it('jquery', () => {
      document.body.style.height = '1000px'
      expect($(document).outerHeight()).toBe(1020)
      document.body.style.height = '2000px'
      expect($(document).outerHeight()).toBe(2020)
    })

    it('domtify', () => {
      document.body.style.height = '1000px'
      expect(outerHeight()(dom(document))).toBe(1020)
      document.body.style.height = '2000px'
      expect(outerHeight()(dom(document))).toBe(2020)
    })
  })

  describe('border-box 元素', () => {
    it('jquery', () => {
      expect($('.border-box').outerHeight()).toBe(200)
    })

    it('domtify', () => {
      expect(outerHeight()(dom('.border-box'))).toBe(200)
    })
  })

  describe('border-box 元素,includeMargin=true', () => {
    it('jquery', () => {
      expect($('.border-box').outerHeight(true)).toBe(240)
    })

    it('domtify', () => {
      expect(outerHeight(true)(dom('.border-box'))).toBe(240)
    })
  })

  describe('content-box 元素', () => {
    it('jquery', () => {
      expect($('.content-box').outerHeight()).toBe(239.2)
    })

    it('domtify', () => {
      expect(outerHeight()(dom('.content-box'))).toBe(239.2)
    })
  })

  describe('content-box 元素,includeMargin=true', () => {
    it('jquery', () => {
      expect($('.content-box').outerHeight(true)).toBe(279.2)
    })

    it('domtify', () => {
      expect(outerHeight(true)(dom('.content-box'))).toBe(279.2)
    })
  })

  describe('setter:数字', () => {
    it('jquery', () => {
      $('.box').outerHeight(100)
      expect(borderBoxEl.style.height).toBe('100px')
      expect(contentBoxEl.style.height).toBe('60.8px')
    })

    it('domtify', () => {
      outerHeight(100)(dom('.box'))
      expect(borderBoxEl.style.height).toBe('100px')
      expect(contentBoxEl.style.height).toBe('60.8px')
    })
  })

  describe('setter-数字字符串', () => {
    it('jquery', () => {
      $('.box').outerHeight('100')
      expect(borderBoxEl.style.height).toBe('100px')
      expect(contentBoxEl.style.height).toBe('60.8px')
    })

    it('domtify', () => {
      outerHeight('100')(dom('.box'))
      expect(borderBoxEl.style.height).toBe('100px')
      expect(contentBoxEl.style.height).toBe('60.8px')
    })
  })

  describe('非px单位的情况(em,rem,％)', () => {
    it('jquery', () => {
      $('.box').outerHeight('10em')
      expect(borderBoxEl.style.height).toBe('10em')
      expect(contentBoxEl.style.height).toBe('120.8px')
    })
    it('domtify', () => {
      outerHeight('10em')(dom('.box'))
      expect(borderBoxEl.style.height).toBe('10em')
      expect(contentBoxEl.style.height).toBe('120.8px')
    })
  })

  describe('非px单位的情况(em,rem,％),includeMargin=true', () => {
    it('jquery', () => {
      $('.box').outerHeight('10em', true)
      expect(borderBoxEl.style.height).toBe('120px')
      expect(contentBoxEl.style.height).toBe('80.8px')
    })
    it('domtify', () => {
      outerHeight('10em', true)(dom('.box'))
      expect(borderBoxEl.style.height).toBe('120px')
      expect(contentBoxEl.style.height).toBe('80.8px')
    })
  })

  describe('setter-带错误单位的字符串', () => {
    it('jquery', () => {
      $('.box').outerHeight('10pq')
      expect(borderBoxEl.style.height).toBe('')
      expect(contentBoxEl.style.height).toBe('160.8px')
    })

    it('domtify', () => {
      outerHeight('10pq')(dom('.box'))
      expect(borderBoxEl.style.height).toBe('')
      expect(contentBoxEl.style.height).toBe('160.8px')
    })
  })

  describe('设置值时包括margin', () => {
    it('jquery', () => {
      $('.box').outerHeight(100, true)
      expect(borderBoxEl.style.height).toBe('60px')
      expect(contentBoxEl.style.height).toBe('20.8px')
    })
    it('domtify', () => {
      outerHeight(100, true)(dom('.box'))
      expect(borderBoxEl.style.height).toBe('60px')
      expect(contentBoxEl.style.height).toBe('20.8px')
    })
  })

  describe('setter-函数', () => {
    it('jquery', () => {
      const fn = vi.fn(() => '100')
      $('.box').outerHeight(fn)
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(200)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(239.2)
      expect(borderBoxEl.style.height).toBe('100px')
      expect(contentBoxEl.style.height).toBe('60.8px')
    })

    it('domtify', () => {
      const fn = vi.fn(() => '100')
      outerHeight(fn)(dom('.box'))
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(200)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(239.2)
      expect(borderBoxEl.style.height).toBe('100px')
      expect(contentBoxEl.style.height).toBe('60.8px')
    })
  })

  describe('setter-函数,includeMargin=true', () => {
    it('jquery', () => {
      const fn = vi.fn(() => '100')
      $('.box').outerHeight(fn, true)
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(240)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(279.2)
      expect(borderBoxEl.style.height).toBe('60px')
      expect(contentBoxEl.style.height).toBe('20.8px')
    })

    it('domtify', () => {
      const fn = vi.fn(() => '100')
      outerHeight(fn, true)(dom('.box'))
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(240)
      expect(fn.mock.calls[1][0]).toBe(1)
      expect(fn.mock.calls[1][1]).toBe(279.2)
      expect(borderBoxEl.style.height).toBe('60px')
      expect(contentBoxEl.style.height).toBe('20.8px')
    })
  })
})
