import jQuery from 'jquery'
import { beforeEach, describe, expect, it } from 'vitest'
import { dom } from '@/core/dom'
import { appendTo } from '@/method/appendTo'

describe('appendTo', () => {
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
    appendTo('h2')(dom('.inner'))
    const h2 = document.querySelector('h2')

    expect(h2.firstElementChild.classList.contains('inner')).toBe(true)
    expect(h2.firstElementChild.textContent).toBe('Goodbye')
  })

  it('支持 HTML 字符串', () => {
    appendTo('<p>Test</p>')(dom('.inner'))

    expect(document.querySelector('.container .inner')).toBe(null)
  })

  it('支持单个 DOM 元素', () => {
    const h2 = document.querySelector('h2')
    appendTo(h2)(dom('.inner'))

    expect(h2.firstElementChild.classList.contains('inner')).toBe(true)
  })

  it('支持 HTMLCollection', () => {
    const ps = document.getElementsByTagName('p')
    appendTo([ps])(dom('.inner'))

    for (const p of ps) {
      expect(p.firstElementChild.classList.contains('inner')).toBe(true)
    }
  })

  it('支持数组 (多个目标)', () => {
    appendTo([document.querySelector('h2'), document.querySelector('h3')])(
      dom('.inner'),
    )

    const h2 = document.querySelector('h2')
    const h3 = document.querySelector('h3')

    expect(h2.firstElementChild.classList.contains('inner')).toBe(true)
    expect(h3.firstElementChild.classList.contains('inner')).toBe(true)
  })

  it('支持元素对象', () => {
    appendTo(dom('h2'))(dom('.inner'))
    const h2 = document.querySelector('h2')

    expect(h2.firstElementChild.classList.contains('inner')).toBe(true)
  })

  it('返回被插入的元素本身', () => {
    const res = appendTo('h2')(dom('.inner'))
    const res2 = jQuery('.inner').appendTo('h2')

    expect(res.length).toBe(2)
    expect(res2.length).toBe(2)
  })
})
