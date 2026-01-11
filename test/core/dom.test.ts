import { beforeEach, describe, expect, it, vi } from 'vitest'

import { dom } from '@/core/dom.js'

describe('core', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app">
        <p class="item">hello</p>
        <span class="item">world</span>
      </div>
    `
  })

  it('支持直接传入element', () => {
    const elApp = document.getElementById('app')
    const res = dom(elApp)
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(1)
    expect(res[0]).toBe(elApp)
  })

  it('支持传入选择器', () => {
    const res = dom('.item')
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(2)
    expect(res[0].textContent).toBe('hello')
  })

  it('支持HTML字符串', () => {
    const res = dom("<div class='new'>test</div>")
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(1)
    expect(res[0].className).toBe('new')
  })

  it('不支持jQuery中的特殊选择器', () => {
    const res = dom(':checkbox')
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(0)
  })

  it('支持NodeList/HTMLCollection', () => {
    const nodeList = document.querySelectorAll('.item')
    const res = dom(nodeList)
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(2)
  })

  it('支持包含元素的数组', () => {
    const arr = [document.createElement('a'), document.createElement('b')]
    const res = dom(arr)
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(2)
  })

  it('支持解析元素数组', () => {
    const d1 = dom('.item')
    const res = dom(d1)
    expect(Array.isArray(res)).toBe(true)
  })

  it('传递函数表示页面加载完成后触发回调', () => {
    const fn = vi.fn()
    dom(fn)
    // 这里需要手动触发 DOMContentLoaded，因为 Vitest 的 jsdom 不会自然触发
    document.dispatchEvent(new Event('DOMContentLoaded'))
    expect(fn).toHaveBeenCalled()
  })

  it('null或者undefined', () => {
    const res = dom(null)
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(0)
  })

  it('字符串非id选择器和html字符串都会绑定prevObject属性', () => {
    const res = dom('.item', document.querySelector('#app'))

    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(2)
  })

  it('非假的其它值,比如转换为boolean非假的数字', () => {
    const res = dom(1)

    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(1)
    expect(res[0]).toBe(1)
  })
})
