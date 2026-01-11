import { describe, it, expect, beforeEach } from 'vitest'

import { dom } from '@/core.js'
import { wrap } from '@/methods/wrap.js'

describe('wrap', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <p>Hello</p>
      <p>cruel</p>
      <p>World</p>
      <div class="doublediv"><div></div></div>
    `
  })
  it('用选择器包裹', () => {
    wrap('.doublediv')(dom('p'))
    const wrappers = document.querySelectorAll('.doublediv:not(:last-of-type)')
    expect(wrappers).toHaveLength(3)
    wrappers.forEach((wrapper, i) => {
      expect(
        wrapper.contains(
          document.querySelectorAll('.doublediv:not(:last-of-type)>div>p')[i],
        ),
      ).toBe(true)
    })
  })

  it('用 HTML 字符串包裹', () => {
    wrap("<div class='wrapper'><b></b></div>")(dom('p'))
    const wrappers = document.querySelectorAll('.wrapper')
    expect(wrappers).toHaveLength(3)
    wrappers.forEach(wrapper => {
      // <b> 是最深层元素
      const b = wrapper.querySelector('b')
      expect(b.querySelector('p')).not.toBeNull()
    })
  })

  it('用单个 DOM 元素包裹', () => {
    const res = document.querySelector('.doublediv')
    wrap(res)(dom('p'))
    const wrappers = document.querySelectorAll('.doublediv:not(:last-of-type)')
    expect(wrappers).toHaveLength(3)
  })

  it('元素数组', () => {
    wrap(dom('.doublediv'))(dom('p'))
    const wrappers = document.querySelectorAll('.doublediv:not(:last-of-type)')
    expect(wrappers).toHaveLength(3)
  })

  it('用函数返回 HTML 字符串包裹', () => {
    wrap(function (index) {
      return `<div class="wrap-${index}"></div>`
    })(dom('p'))
    const wrappers = document.querySelectorAll('[class^=wrap-]')
    expect(wrappers).toHaveLength(3)
    wrappers.forEach((w, i) => {
      expect(w.className).toBe(`wrap-${i}`)
      expect(w.querySelector('p')).not.toBeNull()
    })
  })

  it('用函数返回元素数组', () => {
    wrap(function () {
      return dom('.doublediv')
    })(dom('p'))
    const wrappers = document.querySelectorAll('.doublediv:not(:last-of-type)')
    expect(wrappers).toHaveLength(3)
  })

  it('如果没找到元素,则不进行任何操作提前返回传入的元素数组', () => {
    const res = dom('p')
    const res2 = wrap('.no-exist')(res)
    expect(res2).toBe(res)
  })
})
