import $ from 'jquery'
import { beforeEach, describe, expect, it } from 'vitest'

import { parent, pipe } from '@/index'

describe('parent', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <ul class="level-1">
          <li class="item-i">I</li>
          <li class="item-ii">
            II
            <ul class="level-2">
              <li class="item-a">A</li>
              <li class="item-b">
                B
                <ul class="level-3">
                  <li class="item-1">1</li>
                  <li class="item-2">2</li>
                  <li class="item-3">3</li>
                </ul>
              </li>
              <li class="item-c">C</li>
            </ul>
          </li>
          <li class="item-iii">III</li>
        </ul>

        <div><p>Hello</p></div>
        <div class="selected"><p>Hello Again</p></div>

        <div class="wrapper">
          <span class="child"></span>
          <span class="child"></span>
        </div>
    `
  })

  describe('不携带选择器的父级', () => {
    it('jquery', () => {
      const res = $('li.item-a').parent()
      expect(res[0]).toBeInstanceOf(HTMLElement)
      expect(res[0].classList.contains('level-2')).toBe(true)
    })
    it('domtify', () => {
      const res = pipe('li.item-a', parent())
      expect(res[0]).toBeInstanceOf(HTMLElement)
      expect(res[0].classList.contains('level-2')).toBe(true)
    })
  })

  describe('携带选择器的父级', () => {
    it('jquery', () => {
      const res = $('p').parent('.selected')
      expect(res.length).toBe(1)
      expect(res[0].classList.contains('selected')).toBe(true)
    })
    it('domtify', () => {
      const res = dom('p', [parent('.selected')])
      expect(res.length).toBe(1)
      expect(res[0].classList.contains('selected')).toBe(true)
    })
  })

  describe('不匹配父级为空', () => {
    it('jquery', () => {
      const res = $('p').parent('.non-exist')
      expect(res.length).toBe(0)
    })
    it('domtify', () => {
      const res = dom('p', [parent('.non-exist')])
      expect(res.length).toBe(0)
    })
  })

  describe('多个相同父级应该去重', () => {
    it('jquery', () => {
      const result = $('.child').parent()
      expect(result.length).toBe(1)
      expect(result[0].classList.contains('wrapper')).toBe(true)
    })
    it('domtify', () => {
      const result = dom('.child', [parent()])
      expect(result.length).toBe(1)
      expect(result[0].classList.contains('wrapper')).toBe(true)
    })
  })

  describe('html选择器则返回一个包含document的合集', () => {
    it('jquery', () => {
      const result = $('html').parent()
      expect(result.length).toBe(1)
      expect(result[0]).toBe(document)
    })
    it('domtify', () => {
      const result = dom('html', [parent()])
      expect(result.length).toBe(1)
      expect(result[0]).toBe(document)
    })
  })

  describe('对于字符串创建的dom应该排除', () => {
    it('jquery', () => {
      const result = $(`<p>Foo</p>`).parent()
      expect(result.length).toBe(0)
    })

    it('domtify', () => {
      const result = dom(`<p>Foo</p>`, [parent()])
      expect(result.length).toBe(0)
    })
  })
})
