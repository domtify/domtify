import { beforeEach, describe, expect, it } from 'vitest'

import { dom } from '@/core/dom'
import { prop } from '@/method/prop'

describe('prop', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <input id="check1" type="checkbox" checked />
    <input id="check2" type="checkbox" />
    `
  })

  it('getter: 获取元素属性', () => {
    const checked = prop('checked')(dom('#check1'))
    expect(checked).toBe(true)
  })

  it('getter: 空集合返回 undefined', () => {
    const result = prop('checked')(dom('.not-exist'))
    expect(result).toBeUndefined()
  })

  it('setter: 单个设置属性', () => {
    prop('disabled', true)(dom('#check1'))
    expect(prop('disabled')(dom('#check1'))).toBe(true)
  })

  it('setter: 批量设置属性', () => {
    prop({
      disabled: true,
      checked: false,
    })(dom("input[type='checkbox']"))

    expect(prop('disabled')(dom('#check1'))).toBe(true)
    expect(prop('checked')(dom('#check1'))).toBe(false)
    expect(prop('disabled')(dom('#check2'))).toBe(true)
    expect(prop('checked')(dom('#check2'))).toBe(false)
  })

  it('setter: 使用函数动态设置', () => {
    prop('checked', function (i, val) {
      // this 应该是原生元素
      expect(this).toBeInstanceOf(HTMLElement)
      expect(typeof i).toBe('number')
      expect(typeof val).toBe('boolean')
      return !val
    })(dom('input'))

    // 原来 check1 是 true，check2 是 false，现在取反
    expect(prop('checked')(dom('#check1'))).toBe(false)
    expect(prop('checked')(dom('#check2'))).toBe(true)
  })

  it('setter: 函数返回 undefined 时不修改值', () => {
    prop('checked', () => undefined)(dom('#check1'))
    // 应该保持原值
    expect(prop('checked')(dom('#check1'))).toBe(true)
  })
})
