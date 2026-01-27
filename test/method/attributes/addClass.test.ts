import jquery from 'jquery'
import { beforeEach, describe, expect, it } from 'vitest'
import { addClass, moola } from '@/index'

moola.use({ addClass })

describe('addClass', () => {
  beforeEach(() => {
    // 添加初始 DOM，用于测试
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
      jquery('li').addClass('foo')

      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
      }
    })

    it('moola', () => {
      moola('li').addClass('foo')
      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
      }
    })
  })

  describe('添加多个类名（空格分隔字符串）', () => {
    it('jquery', () => {
      jquery('li').addClass('foo bar')

      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
        expect(element.classList.contains('bar')).toBe(true)
      }
    })
    it('moola', () => {
      moola('li').addClass('foo bar')

      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
        expect(element.classList.contains('bar')).toBe(true)
      }
    })
  })

  describe('添加多个类名（数组，元素中有空格）', () => {
    it('jquery', () => {
      jquery('li').addClass(['foo bar', 'baz'])

      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
        expect(element.classList.contains('bar')).toBe(true)
        expect(element.classList.contains('baz')).toBe(true)
      }
    })

    it('moola', () => {
      moola('li').addClass(['foo bar', 'baz'])

      for (const element of document.querySelectorAll('li')) {
        expect(element.classList.contains('foo')).toBe(true)
        expect(element.classList.contains('bar')).toBe(true)
        expect(element.classList.contains('baz')).toBe(true)
      }
    })
  })

  describe('添加类名（回调函数返回字符串）', () => {
    it('jquery', () => {
      jquery('li').addClass(index => `item-${index}`)

      for (const [index, element] of document
        .querySelectorAll('li')
        .entries()) {
        expect(element.classList.contains(`item-${index}`)).toBe(true)
      }
    })
    it('moola', () => {
      moola('li').addClass(index => `item-${index}`)

      for (const [index, element] of document
        .querySelectorAll('li')
        .entries()) {
        expect(element.classList.contains(`item-${index}`)).toBe(true)
      }
    })
  })

  describe('添加类名（回调函数返回数组）', () => {
    it('jquery', () => {
      // @ts-ignore jquery支持这种用法,但是类型系统会报错
      jquery('li').addClass(index => [`item-${index}`, 'common', 'hello world'])

      for (const [index, element] of document
        .querySelectorAll('li')
        .entries()) {
        expect(element.classList.contains(`item-${index}`)).toBe(true)
        expect(element.classList.contains('common')).toBe(true)
        expect(element.classList.contains('hello')).toBe(true)
        expect(element.classList.contains('world')).toBe(true)
      }
    })
    it('moola', () => {
      moola('li').addClass(index => [`item-${index}`, 'common', 'hello world'])

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

  describe('添加类名（回调函数返回数组）', () => {
    it('jquery', () => {
      // @ts-ignore
      jquery('li').addClass(index => [`item-${index}`, 'common', 'hello world'])

      for (const [index, element] of document
        .querySelectorAll('li')
        .entries()) {
        expect(element.classList.contains(`item-${index}`)).toBe(true)
        expect(element.classList.contains('common')).toBe(true)
        expect(element.classList.contains('hello')).toBe(true)
        expect(element.classList.contains('world')).toBe(true)
      }
    })
    it('moola', () => {
      moola('li').addClass(index => [`item-${index}`, 'common', 'hello world'])

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
      const el = document.createElement('div')
      el.className = 'a'
      // @ts-ignore
      jquery(el).addClass(null)
      expect(el.className).toBe('a')
    })
    it('moola', () => {
      const el = document.createElement('div')
      el.className = 'a'
      // @ts-ignore
      moola(el).addClass(null)
      expect(el.className).toBe('a')
    })
  })
})
