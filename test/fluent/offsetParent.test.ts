import { beforeEach, describe, expect, it } from 'vitest'

import { dom } from '@/core/dom'
import { offsetParent } from '@/fluent/offsetParent'

describe('offsetParent', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul class="level-1">
      <li class="item-i">I</li>
      <li class="item-ii" style="position: relative">
        II
        <ul class="level-2">
          <li class="item-a">A</li>
          <li class="item-b" style="display: none">
            B
            <ul class="level-3">
              <li class="item-1">1</li>
              <li class="item-2">2</li>
              <li class="item-3">3</li>
            </ul>
          </li>
          <li class="item-c">C</li>
        </ul>
      </li>
      <li class="item-iii">III</li>
    </ul>
    `
  })

  it('返回最近的已定位父元素', () => {
    const res = offsetParent()(dom('li.item-a'))
    expect(res[0].classList.contains('item-ii')).toBe(true)
  })

  it('对 display:none 的元素返回 documentElement', () => {
    const res = offsetParent()(dom('li.item-b'))
    expect(res[0]).toBe(document.documentElement)
  })

  it('多个元素时返回去重后的 offsetParent', () => {
    const res = offsetParent()(dom('li.item-a, li.item-c'))
    expect(res.length).toBe(1)
    expect(res[0]).toBe(document.querySelector('li.item-ii'))
  })

  it('元素本身不存在时返回空', () => {
    const res = offsetParent()(dom('.not-exist'))
    expect(res.length).toBe(0)
  })
})
