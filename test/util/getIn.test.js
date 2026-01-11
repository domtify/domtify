import { describe, it, expect, beforeEach, vi } from 'vitest'

import { getIn } from '@/utilities/getIn.js'

describe('getIn', () => {
  let obj

  beforeEach(() => {
    obj = { a: [{ b: { c: 42 } }] }
  })

  it('字符串', () => {
    expect(getIn(obj, 'a[0].b.c')).toBe(42)
  })

  it('数组的方式', () => {
    expect(getIn(obj, ['a', 0, 'b', 'c'])).toBe(42)
  })

  it('默认值', () => {
    expect(getIn(obj, 'a[1].b.c', 'default')).toBe('default')
  })
})
