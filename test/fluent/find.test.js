import { describe, it, expect, beforeEach } from 'vitest'

import { dom } from '@/core.js'
import { find } from '@/methods/find.js'

describe('find', () => {
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
                <li class="item item-1">1</li>
                <li class="item item-2">2</li>
                <li class="item item-3">3</li>
                </ul>
            </li>
            <li class="item-c">C</li>
            </ul>
        </li>
        <li class="item-iii">III</li>
        </ul>
    `
  })

  it('字符串选择器', () => {
    const result = find('.item')(dom('li.item-ii'))
    expect(result).toHaveLength(3)
    expect(result[0].classList.contains('item-1')).toBe(true)
  })

  it('使用element', () => {
    const res = document.querySelector('.item-1')
    const result = find(res)(dom('li.item-ii'))
    expect(result).toHaveLength(1)
    expect(result[0]).toBe(res)
  })

  it('元素数组', () => {
    const result = find(dom('.item'))(dom('li.item-ii'))
    expect(result).toHaveLength(3)
  })

  it('返回结果中排除自身', () => {
    const result = find('.item')(dom('.item'))
    expect(result).toHaveLength(0)
  })

  it('禁止出现重复的结果', () => {
    const result = find('.item')(dom('.level-1'))
    const unique = [...new Set(result)]
    expect(result.length).toBe(unique.length)
  })
})
