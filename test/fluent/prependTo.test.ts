import { beforeEach, describe, expect, it } from 'vitest'

import { dom } from '@/core/dom'
import { prependTo } from '@/fluent/prependTo'

describe('prependTo', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <p>foo</p>
      <p>bar</p>
      <h2>Greetings</h2>
      <h3>Greetings-3</h3>
      <div class="container">
        <div class="inner">Hello</div>
        <div class="inner">Goodbye</div>
      </div>
    `
  })

  it('支持选择器', () => {
    prependTo('h2')(dom('.inner'))
    const h2 = document.querySelector('h2')

    expect(h2.firstElementChild.classList.contains('inner')).toBe(true)
    expect(h2.firstElementChild.textContent).toBe('Hello')
  })

  it('支持 HTML 字符串', () => {
    prependTo('<p>Test</p>')(dom('.inner'))
    const p = document.querySelector('p')

    expect(document.querySelector('.container .inner')).toBe(null)
  })

  it('支持单个 DOM 元素', () => {
    const h2 = document.querySelector('h2')
    prependTo(h2)(dom('.inner'))

    expect(h2.firstElementChild.classList.contains('inner')).toBe(true)
  })

  it('支持 HTMLCollection', () => {
    const ps = document.getElementsByTagName('p')
    prependTo([ps])(dom('.inner'))

    for (const p of ps) {
      expect(p.firstElementChild.classList.contains('inner')).toBe(true)
    }
  })

  it('支持数组 (多个目标)', () => {
    prependTo([document.querySelector('h2'), document.querySelector('h3')])(
      dom('.inner'),
    )

    const h2 = document.querySelector('h2')
    const h3 = document.querySelector('h3')

    expect(h2.firstElementChild.classList.contains('inner')).toBe(true)
    expect(h3.firstElementChild.classList.contains('inner')).toBe(true)
  })

  it('元素对象', () => {
    prependTo(dom('h2'))(dom('.inner'))
    const h2 = document.querySelector('h2')

    expect(h2.firstElementChild.classList.contains('inner')).toBe(true)
  })

  it('返回被插入的元素本身', () => {
    const res = prependTo('h2')(dom('.inner'))
    expect(res.length).toBe(2)
  })
})
