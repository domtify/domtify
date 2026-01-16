import $ from 'jquery'
import { beforeEach, describe, expect, it } from 'vitest'

import { dom } from '@/core/dom'
import { addClass } from '@/method/addClass'

describe('addClass', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    `
  })

  describe('添加单个字符串类名', () => {
    it('jquery', () => {
      $('li').addClass('foo')
      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
      }
    })

    it('domtify', () => {
      dom('li', [addClass('foo')])
      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
      }
    })
  })

  describe('添加多个类名（空格分隔字符串）', () => {
    it('jquery', () => {
      $('li').addClass('foo bar')

      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
        expect(element.classList.contains('bar')).toBe(true)
      }
    })
    it('domtify', () => {
      dom('li', [addClass('foo bar')])
      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
        expect(element.classList.contains('bar')).toBe(true)
      }
    })
  })

  describe('添加多个类名（数组，元素中有空格）', () => {
    it('jquery', () => {
      $('li').addClass(['foo bar', 'baz'])
      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
        expect(element.classList.contains('bar')).toBe(true)
        expect(element.classList.contains('baz')).toBe(true)
      }
    })

    it('domtify', () => {
      dom('li', [addClass(['foo bar', 'baz'])])
      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
        expect(element.classList.contains('bar')).toBe(true)
        expect(element.classList.contains('baz')).toBe(true)
      }
    })
  })

  describe('添加类名（回调函数返回字符串）', () => {
    it('jquery', () => {
      $('li').addClass(index => `item-${index}`)

      for (const [index, element] of document
        .querySelectorAll('li')
        .entries()) {
        expect(element.classList.contains(`item-${index}`)).toBe(true)
      }
    })

    it('domtify', () => {
      dom('li', [addClass(index => `item-${index}`)])

      for (const [index, element] of document
        .querySelectorAll('li')
        .entries()) {
        expect(element.classList.contains(`item-${index}`)).toBe(true)
      }
    })
  })

  describe('添加类名（回调函数返回数组）', () => {
    it('jquery', () => {
      // @ts-expect-error 实际上jq支持这种用法
      $('li').addClass(index => [`item-${index}`, 'common', 'hello world'])

      for (const [index, element] of document
        .querySelectorAll('li')
        .entries()) {
        expect(element.classList.contains(`item-${index}`)).toBe(true)
        expect(element.classList.contains('common')).toBe(true)
        expect(element.classList.contains('hello')).toBe(true)
        expect(element.classList.contains('world')).toBe(true)
      }
    })
    it('domtify', () => {
      dom('li', [addClass(index => [`item-${index}`, 'common', 'hello world'])])

      for (const [index, element] of document
        .querySelectorAll('li')
        .entries()) {
        expect(element.classList.contains(`item-${index}`)).toBe(true)
        expect(element.classList.contains('common')).toBe(true)
        expect(element.classList.contains('hello')).toBe(true)
        expect(element.classList.contains('world')).toBe(true)
      }
    })
  })

  describe('addClass 忽略 null 类型输入', () => {
    it('jquery', () => {
      const div = document.createElement('div')
      div.className = 'a'
      // @ts-expect-error
      $(div).addClass(null)
      expect(div.className).toBe('a')
    })

    it('domtify', () => {
      const div = document.createElement('div')
      div.className = 'a'
      // @ts-expect-error
      dom(div, [addClass(null)])
      expect(div.className).toBe('a')
    })
  })
})
