import { describe, it, expect, beforeEach } from 'vitest'

import { dom } from '@/core.js'
import { insertBefore } from '@/methods/insertBefore.js'

describe('insertBefore', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <h2>Greetings</h2>
        <div class="inner inner1">Hello</div>
        <div class="inner inner2">Goodbye</div>
      </div>
    `
  })

  it('支持选择器', () => {
    insertBefore('.inner')(dom('<p>Test</p>'))
    const container = document.querySelector('.container')
    const pList = container.querySelectorAll('p')
    expect(pList.length).toBe(2)
    expect(container.firstElementChild.tagName).toBe('H2')
    expect(container.children[1].tagName).toBe('P') // 在 inner1 前
  })

  it('支持字符串(字符串实际上不会有任何反应,还是原来的dom结构)', () => {
    insertBefore('<div>Fake</div>')(dom('<p>Invalid</p>'))
    expect(document.body.innerHTML).not.toContain('Invalid')
  })

  it('支持元素', () => {
    insertBefore(document.querySelector('h2'))(dom('<p>Before h2</p>'))
    const container = document.querySelector('.container')
    expect(container.firstElementChild.tagName).toBe('P')
    expect(container.firstElementChild.textContent).toBe('Before h2')
  })

  it('支持数组', () => {
    const targets = [
      document.querySelector('h2'),
      document.querySelectorAll('.inner'),
    ]
    insertBefore(targets)(dom('<span>Multi</span>'))
    const spans = document.querySelectorAll('span')
    expect(spans.length).toBe(3) // h2 + 2个 inner 前面各有一个
    expect(spans[0].nextElementSibling.tagName).toBe('H2')
    expect(spans[1].nextElementSibling.classList.contains('inner1')).toBe(true)
  })

  it('空集合: 不报错', () => {
    expect(() => insertBefore('.not-exist')(dom('<p>xx</p>'))).not.toThrow()
  })

  it('返回元素数组', () => {
    const pEl = dom('<p>Chain</p>')
    const res = insertBefore('h2')(pEl)

    expect(Array.isArray(res)).toBe(true)
  })
})
