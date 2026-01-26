import $ from 'jquery'
import { beforeEach, describe, expect, it } from 'vitest'
import { append, pipe } from '@/index'

describe('append', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <h2>h2-1</h2>
    <p>ppp</p>
    <div class="container">
      <div class="inner">Hello</div>
      <div class="inner">Goodbye</div>
    </div>
    `
  })

  describe('支持 HTML 字符串', () => {
    it('jquery', () => {
      $('.inner').append('<span>Test</span>')
      const html = document.querySelector('.container')!.innerHTML
      expect(html).toContain('<span>Test</span>')
    })

    it('domtify', () => {
      pipe('.inner', append('<span>Test</span>'))
      const html = document.querySelector('.container')!.innerHTML
      expect(html).toContain('<span>Test</span>')
    })
  })

  describe('HTMLCollection集合', () => {
    it('jquery', () => {
      const ps = document.getElementsByTagName('p')
      // @ts-expect-error
      $('.inner').append(ps)
      expect(document.querySelectorAll('.inner p').length).toBe(2)
    })
    it('domtify', () => {
      const ps = document.getElementsByTagName('p')
      let res = dom('.inner', [append(ps)])
      expect(document.querySelectorAll('.inner p').length).toBe(2)
    })
  })

  describe('元素', () => {
    it('jquery', () => {
      const h2 = document.querySelector('h2')
      // @ts-expect-error
      $('.inner').append(h2)
      expect(document.querySelectorAll('h2').length).toBe(2) // 被 clone 了一份
    })
    it('domtify', () => {
      const h2 = document.querySelector('h2')!
      dom('.inner', [append(h2)])
      expect(document.querySelectorAll('h2').length).toBe(2) // 被 clone 了一份
    })
  })

  describe('文本节点', () => {
    it('jquery', () => {
      $('.inner').append('TEXT')
      expect(document.querySelector('.inner')!.textContent).toContain('TEXT')
    })
    it('domtify', () => {
      dom('.inner', [append('TEXT')])
      expect(document.querySelector('.inner')!.textContent).toContain('TEXT')
    })
  })

  describe('数组', () => {
    it('jquery', () => {
      const h2 = document.querySelector('h2')
      // @ts-expect-error
      $('.inner').append([h2, 'X', '<i>italic</i>'])
      const inner = document.querySelector('.inner')
      expect(inner!.innerHTML).toMatch(/h2-1|X|<i>italic<\/i>/)
    })
    it('domtify', () => {
      const h2 = document.querySelector('h2')!
      dom('.inner', [append([h2, 'X', '<i>italic</i>'])])
      const inner = document.querySelector('.inner')
      expect(inner!.innerHTML).toMatch(/h2-1|X|<i>italic<\/i>/)
    })
  })

  describe('元素数组', () => {
    it('jquery', () => {
      const h2s = $('h2')
      $('.inner').append(h2s)
      expect(document.querySelectorAll('h2').length).toBe(2)
    })
    it('domtify', () => {
      const h2s = dom('h2')
      dom('.inner', [append(h2s)])
      expect(document.querySelectorAll('h2').length).toBe(2)
    })
  })

  describe('支持函数返回字符串', () => {
    it('jquery', () => {
      $('.inner').append((i, _html) => `<b>idx-${i}</b>`)

      const bolds = document.querySelectorAll('.inner b')
      expect(bolds.length).toBe(2)
      expect(bolds[0].textContent).toBe('idx-0')
    })

    it('domtify', () => {
      dom('.inner', [append((_element, i, _html) => `<b>idx-${i}</b>`)])
      const bolds = document.querySelectorAll('.inner b')
      expect(bolds.length).toBe(2)
      expect(bolds[0].textContent).toBe('idx-0')
    })
  })

  describe('函数返回HTMLCollection集合', () => {
    it('jquery', () => {
      // @ts-expect-error
      $('.inner').append(() => document.getElementsByTagName('p'))
      // 注意：在jquery这里为1,因为它没有缓存导致移动了
      expect(document.querySelectorAll('.inner p').length).toBe(1)
    })
    it('domtify', () => {
      dom('.inner', [append(() => document.getElementsByTagName('p'))])
      expect(document.querySelectorAll('.inner p').length).toBe(2)
    })
  })

  describe('支持函数返回数组', () => {
    it('jquery', () => {
      // @ts-expect-error
      $('.inner').append(() => ['123', '<em>456</em>'])
      const inner = document.querySelector('.inner')!
      expect(inner.textContent).toContain('123')
      expect(inner.innerHTML).toContain('<em>456</em>')
    })
    it('domtify', () => {
      dom('.inner', [append(() => ['123', '<em>456</em>'])])
      const inner = document.querySelector('.inner')!
      expect(inner.textContent).toContain('123')
      expect(inner.innerHTML).toContain('<em>456</em>')
    })
  })
})
