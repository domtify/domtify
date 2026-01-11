import { beforeEach, describe, expect, it } from 'vitest'

import { dom } from '@/core/dom'
import { siblings } from '@/fluent/siblings'

describe('siblings', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <ul>
            <li>list item 1</li>
            <li class="item">list item 2</li>
            <li class="third-item">list item 3</li>
            <li class="item">list item 4</li>
            <li>list item 5</li>
        </ul>
    `
  })

  it('返回除了自己的所有的兄弟节点', () => {
    const res = siblings()(dom('li.third-item'))
    const texts = res.map(li => li.textContent.trim())

    expect(texts).toEqual([
      'list item 1',
      'list item 2',
      'list item 4',
      'list item 5',
    ])
  })

  it('传递选择器过滤', () => {
    const res = siblings('.item')(dom('li.third-item'))
    const texts = res.map(li => li.textContent.trim())

    expect(texts).toEqual(['list item 2', 'list item 4'])
  })
})
