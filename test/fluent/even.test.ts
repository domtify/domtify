import { beforeEach, describe, expect, it, vi } from 'vitest'

import { dom } from '@/core/dom'
import { even } from '@/fluent/even'

describe('even', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul>
      <li>list item 0</li>
      <li>list item 1</li>
      <li>list item 2</li>
      <li>list item 3</li>
      <li>list item 4</li>
      <li>list item 5</li>
    </ul>
    `
  })

  it('应该返回索引为奇数的元素', () => {
    const items = even()(dom('li'))
    expect(items.length).toBe(3)
    expect(items[0].textContent).toBe('list item 0')
    expect(items[1].textContent).toBe('list item 2')
    expect(items[2].textContent).toBe('list item 4')
  })
})
