import $ from 'jquery'
import { beforeEach, describe, expect, it } from 'vitest'
import { dom } from '@/core/dom'
import { add } from '@/method/add'
import { html } from '@/method/html'

describe('add', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li>list item 1</li>
        <li>list item 2</li>
        <li>list item 3</li>
      </ul>
      <p>a paragraph</p>
      <div class="empty">
        <p>this is empty p</p>
      </div>
    `
  })

  describe('css选择器', () => {
    it('jquery', () => {
      const result = $('li').add('p')
      expect(result.length).toBe(5) // 3 li + 2 p
      expect(result[3].tagName).toBe('P')
      expect(result[4].tagName).toBe('P')
    })
    it('domtify', () => {
      const result = dom('li', [add('p')])
      expect(result.length).toBe(5) // 3 li + 2 p
      expect(result[3].tagName).toBe('P')
      expect(result[4].tagName).toBe('P')
    })
  })

  describe('element', () => {
    it('jquery', () => {
      const p = document.querySelector('p')!
      const result = $('li').add(p)
      expect(result.length).toBe(4)
      expect(result.toArray().at(-1)).toBe(p)
    })
    it('domtify', () => {
      const p = document.querySelector('p')!
      const result = dom('li', [add(p)])
      expect(result.length).toBe(4)
      expect(result.at(-1)).toBe(p)
    })
  })

  describe('html代码片段', () => {
    it('jquery', () => {
      const result = $('li').add("<p id='new'>new paragraph</p>")
      expect(result.length).toBe(4)
      expect(result.toArray().at(-1)!.id).toBe('new')
    })
    it('domtify', () => {
      const result = dom('li', [add("<p id='new'>new paragraph</p>")])
      expect(result.length).toBe(4)
      expect(result.at(-1)!.id).toBe('new')
    })
  })

  describe('支持元素数组', () => {
    it('jquery', () => {
      const result = $('li').add($('p'))
      expect(result.length).toBe(5)
      expect(result.toArray().some(el => el.tagName === 'P')).toBe(true)
    })

    it('domtify', () => {
      const result = dom('li', [add(dom('p'))])
      expect(result.length).toBe(5)
      expect(result.some(el => el.tagName === 'P')).toBe(true)
    })
  })

  describe('context参数限制范围', () => {
    it('jquery', () => {
      const context = document.querySelector('.empty')!
      const result = $('li').add('p', context)
      const addedP = result.toArray().filter(el => el.tagName === 'P')
      expect(addedP.length).toBe(1)
      expect(addedP[0].textContent).toBe('this is empty p')
    })
    it('domtify', () => {
      const context = document.querySelector('.empty')!
      const result = dom('li', [add('p', context)])
      const addedP = result.filter(el => el.tagName === 'P')
      expect(addedP.length).toBe(1)
      expect(addedP[0].textContent).toBe('this is empty p')
    })
  })

  describe('返回一个新的元素数组', () => {
    it('jquery', () => {
      const li = $('li')
      const result = $(li).add('p')
      expect(result).not.toBe(li)
    })
    it('domtify', () => {
      const li = dom('li')
      const result = dom(li, [add('p')])
      expect(result).not.toBe(li)
    })
  })
})
