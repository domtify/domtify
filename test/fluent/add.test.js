import { beforeEach, describe, expect, it } from 'vitest'

import { dom } from '@/core.js'
import { add } from '@/methods/add.js'

describe('add', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li>list item 1</li>
        <li>list item 2</li>
        <li>list item 3</li>
      </ul>
      <p>a paragraph</p>
      <div class="empty">
        <p>this is empty p</p>
      </div>
    `
  })

  it('css选择器', () => {
    const result = add('p')(dom('li'))
    expect(result.length).toBe(5) // 3 li + 2 p
    expect(result[3].tagName).toBe('P')
    expect(result[4].tagName).toBe('P')
  })

  it('element', () => {
    const p = document.querySelector('p')
    const result = add(p)(dom('li'))
    expect(result.length).toBe(4)
    expect(result.at(-1)).toBe(p)
  })

  it('html代码片段', () => {
    const result = add("<p id='new'>new paragraph</p>")(dom('li'))

    expect(result.length).toBe(4)
    expect(result.at(-1).id).toBe('new')
  })

  it('支持元素数组', () => {
    const result = add(dom('p'))(dom('li'))
    expect(result.length).toBe(5)
    expect(result.some(el => el.tagName === 'P')).toBe(true)
  })

  it('context参数限制范围', () => {
    const context = document.querySelector('.empty')
    const result = add('p', context)(dom('li'))
    const addedP = result.filter(el => el.tagName === 'P')
    expect(addedP.length).toBe(1)
    expect(addedP[0].textContent).toBe('this is empty p')
  })

  it('返回一个新的元素数组', () => {
    const li = dom('li')
    const result = add('p')(li)
    expect(result).not.toBe(li) // 浅比较
  })
})
