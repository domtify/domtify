import { beforeEach, describe, expect, it, vi } from 'vitest'

import { dom } from '@/core/dom'
import { replaceClass } from '@/fluent/replaceClass'

describe('replaceClass', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li id="foo" class="foo bar">foo</li>
        <li id="bar" class="foo bar">bar</li>
      </ul>
    `
  })

  it('支持字符串替换', () => {
    replaceClass('foo', 'new-foo')(dom('li'))

    const foo = document.getElementById('foo')
    expect(foo.classList.contains('new-foo')).toBe(true)
    expect(foo.classList.contains('foo')).toBe(false)
  })

  it('支持 newClass 为函数', () => {
    replaceClass('foo', function (i, currClass) {
      expect(this).toBeInstanceOf(HTMLElement) // this 绑定正确
      expect(typeof currClass).toBe('string')
      return 'foo-' + i
    })(dom('li'))

    const foo = document.getElementById('foo')
    const bar = document.getElementById('bar')
    expect(foo.classList.contains('foo-0')).toBe(true)
    expect(bar.classList.contains('foo-1')).toBe(true)
  })

  it('支持对象替换', () => {
    replaceClass({
      foo: 'x-foo',
      bar: 'x-bar',
    })(dom('li'))

    const foo = document.getElementById('foo')
    expect(foo.classList.contains('x-foo')).toBe(true)
    expect(foo.classList.contains('x-bar')).toBe(true)
    expect(foo.classList.contains('foo')).toBe(false)
    expect(foo.classList.contains('bar')).toBe(false)
  })

  it('支持函数返回对象', () => {
    replaceClass(function (i, currClass) {
      return {
        foo: 'foo-' + i,
        bar: 'bar-' + i,
      }
    })(dom('li'))

    const foo = document.getElementById('foo')
    expect(foo.classList.contains('foo-0')).toBe(true)
    expect(foo.classList.contains('bar-0')).toBe(true)
  })

  it('不包含要替换的 class 时不报错', () => {
    replaceClass('not-exist', 'new-class')(dom('li'))

    const foo = document.getElementById('foo')
    expect(foo.classList.contains('not-exist')).toBe(false)
    expect(foo.classList.contains('new-class')).toBe(false)
  })

  it('返回数组', () => {
    const res = replaceClass('foo', 'replaced')(dom('li'))
    expect(res.length).toBe(2)
  })
  it('边缘情况数字测试,函数第二个参数应该是空字符串', () => {
    const res = replaceClass(function (index, currClass) {
      expect(index).toBeTypeOf('number') // 确认 index 是数字
      expect([0, 1]).toContain(index) // 确认 index 是 0 或 1
      expect(currClass).toEqual('')
    })(dom([10, 20]))
    expect(res.length).toBe(2)
  })
})
