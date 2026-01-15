import { beforeEach, describe, expect, it, vi } from 'vitest'

import { dom } from '@/core/dom'
import { append } from '@/method/append'
import { clone } from '@/method/clone'
import { data } from '@/method/data'
import { on } from '@/method/on'
import { trigger } from '@/method/trigger'

describe('clone', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="parent" class="box">
      父容器
      <button id="btn">点击我</button>
    </div>
    <div id="result"></div>
    `
  })

  it('clone(false) 只克隆DOM，不复制事件和data', () => {
    data('info', { count: 1 })(dom('#btn'))
    const handler = vi.fn()
    on('click', handler)(dom('#btn'))

    const cloneBtn = clone(false)(dom('#btn'))
    append(cloneBtn)(dom('#result'))

    // 克隆的DOM存在
    expect(document.querySelector('#result #btn')).not.toBeNull()
    // data 没被复制
    expect(data('info')(dom('#result #btn'))).toBeUndefined()
    // 事件没被复制
    trigger('click')(dom('#result #btn'))
    expect(handler).toHaveBeenCalledTimes(0)
  })

  it('clone(true) 克隆DOM + 自身事件和data，不复制子元素事件和data', () => {
    data('info', { count: 1 })(dom('#btn'))
    const handler = vi.fn()
    on('click', handler)(dom('#btn'))

    const cloneBtn = clone(true)(dom('#btn'))
    append(cloneBtn)(dom('#result'))

    // data 被复制
    expect(data('info')(dom('#result #btn'))).toEqual({ count: 1 })

    // 事件被复制
    trigger('click')(dom('#result #btn'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('clone(true, true) 克隆DOM + 自身事件和data + 子元素事件和data', () => {
    // 给 parent 和 btn 都加 data & event
    data('parent-info', { count: 2 })(dom('#parent'))
    const parentHandler = vi.fn()
    on('click', parentHandler)(dom('#parent'))

    data('info', { count: 1 })(dom('#btn'))
    const btnHandler = vi.fn()
    on('click', btnHandler)(dom('#btn'))

    const cloneParent = clone(true, true)(dom('#parent'))
    append(cloneParent)(dom('#result'))

    // data 复制成功
    expect(data('parent-info')(dom('#result #parent'))).toEqual({ count: 2 })
    expect(data('info')(dom('#result #btn'))).toEqual({ count: 1 })

    // 事件复制成功
    trigger('click')(dom('#result #parent'))
    trigger('click')(dom('#result #btn'))
    expect(parentHandler).toHaveBeenCalledTimes(2)
    expect(btnHandler).toHaveBeenCalledTimes(1)
  })
})
