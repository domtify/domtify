import { describe, it, expect, beforeEach } from 'vitest'

import { dom } from '@/core.js'
import { prev } from '@/methods/prev.js'

describe('prev', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li>list item 1</li>
        <li>list item 2</li>
        <li class="third-item">list item 3</li>
        <li>list item 4</li>
        <li>list item 5</li>
      </ul>
    `
  })
  it('获取每个元素的上一个兄弟元素', () => {
    const res = prev()(dom('li'))
    expect(res.length).toBe(4)
    expect(res[0].textContent).toBe('list item 1')
  })

  it('过滤掉 null/undefined', () => {
    const res = prev()(dom('li:first-child'))
    expect(res.length).toBe(0)
  })

  it('支持选择器过滤', () => {
    const res = prev('.third-item')(dom('li'))
    expect(res.length).toBe(1)
    expect(res[0].classList.contains('third-item')).toBe(true)
  })

  it('数组元素', () => {
    const elArr = dom('li')
    const res = prev()(elArr)

    expect(Array.isArray(elArr)).toBe(true)
    expect(Array.isArray(res)).toBe(true)
  })
})
