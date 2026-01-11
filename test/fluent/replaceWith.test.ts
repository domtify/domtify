import { beforeEach, describe, expect, it, vi } from 'vitest'

import { dom } from '@/core/dom'
import { replaceWith } from '@/fluent/replaceWith'

describe('replaceWith', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <p>this is p</p>
        <h1>this is h1</h1>
        <h2>this is h2</h2>
        <div class="inner first">Hello</div>
        <div class="inner second">And</div>
        <div class="inner third">Goodbye</div>
      </div>
    `
  })
  it('可以用 HTML 字符串替换元素', () => {
    replaceWith('<h2>New heading</h2>')(dom('div.second'))
    expect(document.querySelector('.inner.second')).toBeNull()
    expect(document.querySelector('h2').textContent).toBe('this is h2')
  })

  it('可以用 Element 替换元素', () => {
    const p = document.querySelector('p')
    replaceWith(p)(dom('div.second'))
    expect(document.querySelector('.inner.second')).toBeNull()
    expect(document.querySelector('p')).not.toBeNull()
  })

  it('可以用 TextNode 替换元素', () => {
    replaceWith(document.createTextNode('TextNode'))(dom('div.second'))
    expect(document.querySelector('.inner.second')).toBeNull()
    expect(document.body.textContent).toContain('TextNode')
  })

  it('可以用数组替换元素（包含 Element 和 HTML 字符串）', () => {
    const p = document.querySelector('p')
    replaceWith([p, '<h2>Array heading</h2>'])(dom('div.second'))
    expect(document.querySelector('.inner.second')).toBeNull()
    expect(document.querySelector('h2').textContent).toBe('this is h2')
  })

  it('可以用集合对象替换元素', () => {
    replaceWith(dom('p'))(dom('div.second'))
    expect(document.querySelector('.inner.second')).toBeNull()
    expect(document.querySelector('p')).not.toBeNull()
  })

  it('函数形式可以返回字符串', () => {
    const fn = vi.fn(() => `<span>Fn span</span>`)

    const secondEl = document.querySelector('.inner.second')
    replaceWith(fn)(dom('div.second'))

    expect(fn.mock.calls[0][0]).toBe(0)
    expect(fn.mock.calls[0][1]).toBe('And')
    expect(fn.mock.instances[0]).toBe(secondEl)

    // 已经被替换所以等于null
    expect(document.querySelector('.inner.second')).toBeNull()
    // 已经添加了新的元素
    expect(document.querySelector('span').textContent).toBe('Fn span')
  })

  it('函数形式可以返回集合对象', () => {
    replaceWith(() => dom('p'))(dom('div.second'))
    expect(document.querySelector('.inner.second')).toBeNull()
    expect(document.querySelector('p')).not.toBeNull()
  })

  it('非 Element 节点会被跳过（比如数字）', () => {
    replaceWith(() => '<b>ok</b>')(
      dom([10, document.querySelector('div.second')]),
    )
    expect(document.querySelector('b').textContent).toBe('ok')
  })

  it('空集合调用时不会报错', () => {
    const res = replaceWith('<span>noop</span>')(dom([]))
    expect(res.length).toBe(0)
  })
})
