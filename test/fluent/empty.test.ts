import { beforeEach, describe, expect, it } from 'vitest'

import { dom } from '@/core/dom'
import { empty } from '@/fluent/empty'

describe('empty', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <div class="hello">Hello</div>
        <div class="goodbye">Goodbye</div>
      </div>
    `
  })

  it('移除所有的子节点', () => {
    const helloEl = document.querySelector('.hello')

    // 之前
    expect(helloEl.childNodes.length).toBeGreaterThan(0) // 有文本节点 "Hello"

    empty()(dom('.hello'))

    // 之后
    expect(helloEl.childNodes.length).toBe(0)
    expect(helloEl.innerHTML).toBe('')
  })

  it('如果元素没有子元素，则不应执行任何操作', () => {
    const goodbyeEl = document.querySelector('.goodbye')
    goodbyeEl.innerHTML = '' // 本来就空
    expect(goodbyeEl.childNodes.length).toBe(0)

    empty()(dom('.goodbye')) // 不报错
    expect(goodbyeEl.childNodes.length).toBe(0)
  })
})
