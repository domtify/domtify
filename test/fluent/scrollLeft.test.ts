import $ from 'jquery'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { dom } from '@/core/dom'
import { scrollLeft } from '@/fluent/scrollLeft'

describe('scrollLeft', () => {
  let div
  beforeEach(() => {
    div = document.createElement('div')
    div.style.width = '100px'
    div.style.height = '50px'
    div.style.overflow = 'auto'
    div.style.whiteSpace = 'nowrap'

    // 塞一个很宽的内容让它能滚动
    const content = document.createElement('div')
    content.style.width = '1000px'
    content.style.height = '100px'
    div.appendChild(content)

    document.body.appendChild(div)
  })

  describe('getter:返回左侧滚动偏移量', () => {
    it('jquery', () => {
      div.scrollLeft = 123
      expect($(div).scrollLeft()).toBe(123.19999694824219)
    })
    it('domtify', () => {
      div.scrollLeft = 123
      expect(scrollLeft()(dom(div))).toBe(123.19999694824219)
    })
  })

  describe('getter:没有元素时返回 undefined', () => {
    it('jquery', () => {
      expect($().scrollLeft()).toBeUndefined()
    })
    it('domtify', () => {
      expect(scrollLeft()(dom())).toBeUndefined()
    })
  })

  describe('setter:数值', () => {
    it('jquery', () => {
      $(div).scrollLeft(200)
      expect(div.scrollLeft).toBe(200)
    })
    it('domtify', () => {
      scrollLeft(200)(dom(div))
      expect(div.scrollLeft).toBe(200)
    })
  })

  describe('setter:函数', () => {
    it('jquery', () => {
      div.scrollLeft = 50

      const fn = vi.fn(() => 50 + 25)

      $(div).scrollLeft(fn)
      expect(fn.mock.calls[0][0]).toBe(0)

      expect(fn.mock.calls[0][1]).toBe(50.400001525878906)
      expect(div.scrollLeft).toBe(75.19999694824219)
    })

    it('domtify', () => {
      div.scrollLeft = 50

      const fn = vi.fn(() => 50 + 25)

      scrollLeft(fn)(dom(div))
      expect(fn.mock.calls[0][0]).toBe(0)

      expect(fn.mock.calls[0][1]).toBe(50.400001525878906)
      expect(div.scrollLeft).toBe(75.19999694824219)
    })
  })
})
