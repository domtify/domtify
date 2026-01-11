import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { dom } from '@/core/dom'
import { data } from '@/fluent/data'

describe('data', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul>
        <li class="item-1" data-role-name="page" data-count="10" data-hidden="true" data-options='{"name":"John"}'>li</li>
        <li class="item-2" data-role-name="page" data-count="12" data-hidden="true" data-options='{"name":"John"}'>li</li>
      </ul>
    `
  })

  it('在没有元素时返回 undefined', () => {
    // 选择一个不存在的元素，result 会是空数组
    const res = data()(dom('.not-exist'))

    expect(res).toBeUndefined()
  })

  it('读取元素上的所有数据', () => {
    const res = data()(dom('li'))

    expect(res).toEqual({
      roleName: 'page',
      count: 10,
      hidden: true,
      options: { name: 'John' },
    })
  })

  it('读取单个属性', () => {
    const res = data('role-name')(dom('li'))
    expect(res).toBe('page')
  })

  it('取不存在的属性返回underfined', () => {
    const res = data('foo-bar')(dom('li'))

    expect(res).toBeUndefined()
  })

  // 这在jQuery中会报错
  it('取不存在的属性非字符串的属性返回underfined', () => {
    const res = data(123)(dom('li'))

    expect(res).toBeUndefined()
  })

  it('通过键值对的方式设置数据', () => {
    data('foo', 52)(dom('li'))
    data('bar', { isManual: true })(dom('li'))

    expect(data('foo')(dom('li'))).toBe(52)
    expect(data('bar')(dom('li'))).toEqual({ isManual: true })
  })

  it('设置数据应该返回domtify支持链式调用', () => {
    const instance = dom('li')
    const returned = data('foo', 52)(instance)
    expect(returned).toBe(instance)
  })

  it('通过对象的方式设置数据', () => {
    data({ foo: 53, bar: 'test' })(dom('li'))

    const fooRes = data('foo')(dom('li'))
    const barRes = data('bar')(dom('li'))

    expect(fooRes).toBe(53)
    expect(barRes).toBe('test')
  })

  it('覆盖DOM上已存在的data数据', () => {
    data('role-name', 20)(dom('li'))
    data('count', 'abc')(dom('li'))
    const res = data()(dom('li'))

    expect(res).toEqual({
      roleName: 20,
      count: 'abc',
      hidden: true,
      options: { name: 'John' },
    })
  })

  it('设置数据时键会小驼峰的方式存储', () => {
    data('role-name', 'ajiho')(dom('li'))

    expect(data('roleName')(dom('li'))).toBe('ajiho')
  })
})
