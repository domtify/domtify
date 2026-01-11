import { describe, it, expect, beforeEach, vi } from 'vitest'

import { dom } from '@/core.js'
import { scrollTop } from '@/methods/scrollTop.js'
import $ from 'jquery'

describe('scrollTop', () => {
  let div
  beforeEach(() => {
    div = document.createElement('div')
    div.style.width = '100px'
    div.style.height = '50px'
    div.style.overflow = 'auto'
    div.style.whiteSpace = 'nowrap'

    // 塞一个很高的内容让它能滚动
    const content = document.createElement('div')
    content.style.width = '100px'
    content.style.height = '1000px'
    div.appendChild(content)

    document.body.appendChild(div)
  })

  describe('getter:返回距离顶部的滚动偏移量', () => {
    it('jquery', () => {
      div.scrollTop = 123

      expect($(div).scrollTop()).toBe(123.19999694824219)
    })
    it('domtify', () => {
      div.scrollTop = 123

      expect(scrollTop()(dom(div))).toBe(123.19999694824219)
    })
  })

  describe('getter:没有元素时返回 undefined', () => {
    it('jquery', () => {
      expect($().scrollTop()).toBeUndefined()
    })
    it('domtify', () => {
      expect(scrollTop()(dom())).toBeUndefined()
    })
  })

  describe('setter:数值', () => {
    it('jquery', () => {
      $(div).scrollTop(200)
      expect(div.scrollTop).toBe(200)
    })
    it('domtify', () => {
      scrollTop(200)(dom(div))
      expect(div.scrollTop).toBe(200)
    })
  })

  describe('setter:函数', () => {
    it('jquery', () => {
      div.scrollTop = 100
      const fn = vi.fn(() => 60 + 40)
      $(div).scrollTop(fn)
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(100)
      expect(div.scrollTop).toBe(100)
    })
    it('domtify', () => {
      div.scrollTop = 100
      const fn = vi.fn(() => 60 + 40)
      scrollTop(fn)(dom(div))
      expect(fn.mock.calls[0][0]).toBe(0)
      expect(fn.mock.calls[0][1]).toBe(100)
      expect(div.scrollTop).toBe(100)
    })
  })
})
