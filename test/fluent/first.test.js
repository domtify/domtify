import { describe, it, expect, beforeEach } from 'vitest'

import { dom } from '@/core.js'
import { first } from '@/methods/first.js'

describe('first', () => {
  beforeEach(() => {
    // 设置 HTML 测试环境
    document.body.innerHTML = `
    <ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
    <li>item 4</li>
    <li>item 5</li>
    </ul>
    `
  })

  it('获取第一个元素', () => {
    const res = first()(dom('li'))
    expect(res.length).toBe(1)
    expect(res[0].textContent).toBe('item 1')
  })
})
