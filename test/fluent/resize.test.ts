import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { dom } from '@/core/dom'
import { resize } from '@/fluent/resize'

// 这个应该用端到端的测试才能测试

// mock ResizeObserver
class ResizeObserverMock {
  static instances = []

  constructor(callback) {
    this.callback = callback
    this.elements = new Set()
    ResizeObserverMock.instances.push(this)
  }
  observe(element) {
    this.elements.add(element)
  }
  disconnect() {
    this.elements.clear()
    this.disconnected = true
  }
  trigger(entries) {
    this.callback(entries)
  }
}

describe('resize', () => {
  beforeEach(() => {
    ResizeObserver = ResizeObserverMock
    document.body.innerHTML = `
      <div class="resizable"></div>
      <div class="resizable"></div>
    `
  })
  afterEach(() => {
    ResizeObserverMock.instances = []
  })

  it('immediate为false时不会立即触发', () => {
    const callback = vi.fn()
    const elements = dom('.resizable')
    resize(callback, { immediate: false })(elements)

    ResizeObserverMock.instances[0].trigger([
      {
        target: elements[0],
        contentRect: { width: 110, height: 150 },
      },
    ])

    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('type both时宽度发生变化的情况', () => {
    const callback = vi.fn()
    const elements = dom('.resizable')
    resize(callback, { immediate: false })(elements)

    ResizeObserverMock.instances[0].trigger([
      {
        target: elements[0],
        contentRect: { width: 110, height: 150 },
      },
    ])
    // 模拟宽度拖动发生变化
    ResizeObserverMock.instances[0].trigger([
      {
        target: elements[0],
        contentRect: { width: 111, height: 150 },
      },
    ])
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback.mock.calls[0][0]).toBe(0) // index
    expect(callback.mock.calls[0][1]).toHaveProperty('contentRect')
    expect(callback.mock.calls[0][1].contentRect.width).toBe(111)
    expect(callback.mock.calls[0][1].contentRect.height).toBe(150)
  })

  it('type both时高度发生变化的情况', () => {
    const callback = vi.fn()
    const elements = dom('.resizable')
    resize(callback, { immediate: false })(elements)

    ResizeObserverMock.instances[0].trigger([
      {
        target: elements[0],
        contentRect: { width: 110, height: 150 },
      },
    ])
    // 模拟宽度拖动发生变化
    ResizeObserverMock.instances[0].trigger([
      {
        target: elements[0],
        contentRect: { width: 110, height: 151 },
      },
    ])
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback.mock.calls[0][0]).toBe(0) // index
    expect(callback.mock.calls[0][1]).toHaveProperty('contentRect')
    expect(callback.mock.calls[0][1].contentRect.width).toBe(110)
    expect(callback.mock.calls[0][1].contentRect.height).toBe(151)
  })

  it('取消尺寸改变的回调行为', () => {
    const callback = vi.fn()
    const elements = dom('.resizable')
    resize(callback)(elements)

    // 保存 observer 实例
    // const observer = ResizeObserverMock.instances[0]
    expect(ResizeObserverMock.instances.length).toBe(2)

    // 调用取消监听
    resize(null)(elements)

    expect(ResizeObserverMock.instances[0].disconnected).toBe(true)
    expect(ResizeObserverMock.instances[0].elements.size).toBe(0)

    expect(ResizeObserverMock.instances[1].disconnected).toBe(true)
    expect(ResizeObserverMock.instances[1].elements.size).toBe(0)
  })

  it('类型选项测试', () => {
    const callback = vi.fn()
    const elements = dom('.resizable')
    resize(callback, { immediate: true, type: 'width' })(elements)

    // 手动模拟元素被拖动触发事件,模拟entry对象的target和contentRect属性
    ResizeObserverMock.instances[0].trigger([
      {
        target: elements[0],
        contentRect: { width: 100, height: 200 },
      },
    ])

    // 只会被调用一次
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('选项-immediate-首次不触发', () => {
    const callback = vi.fn()
    const elements = dom('.resizable')
    resize(callback, { immediate: false })(elements)

    // 模拟触发回调
    for (const observer of ResizeObserverMock.instances) {
      for (const el of observer.elements) {
        observer.trigger([
          {
            target: el,
            contentRect: { width: 100, height: 100 },
          },
        ])
      }
    }

    // 断言不触发回调（因为首次不执行）
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it('type height 只触发高度变化', () => {
    const callback = vi.fn()
    const elements = dom('.resizable')
    resize(callback, { immediate: true, type: 'height' })(elements)

    ResizeObserverMock.instances[0].trigger([
      {
        target: elements[0],
        contentRect: { width: 100, height: 150 },
      },
    ])

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
