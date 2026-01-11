import { describe, it, expect, beforeEach } from 'vitest'

import { dom } from '@/core.js'
import { has } from '@/methods/has.js'

describe('has', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul>
      <li>list item 1</li>
      <li>
        list item 2
        <ul class="ul">
          <li>list item 2-a</li>
          <li>list item 2-b</li>
        </ul>
      </li>
      <li>list item 3</li>
      <li>list item 4</li>
    </ul>
    `
  })
  it('支持使用 CSS 选择器字符串作为参数', () => {
    const result = has('.ul')(dom('li'))
    expect(result.length).toBe(1)
    expect(result[0].textContent).toContain('list item 2')
  })

  it('支持使用 DOM 元素作为参数', () => {
    const ulElement = document.querySelector('.ul')
    const result = has(ulElement)(dom('li'))
    expect(result.length).toBe(1)
    expect(result[0].textContent).toContain('list item 2')
  })

  it('支持使用元素数组作为参数', () => {
    const result = has(dom('.ul'))(dom('li'))
    expect(result.length).toBe(1)
    expect(result[0].textContent).toContain('list item 2')
  })

  it('没有匹配的后代应返回空数组', () => {
    const result = has('.not-exist')(dom('li'))
    expect(result.length).toBe(0)
  })
})
