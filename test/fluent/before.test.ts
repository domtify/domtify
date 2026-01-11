import { beforeEach, describe, expect, it } from 'vitest'

import { dom } from '@/core/dom'
import { before } from '@/fluent/before'

describe('before', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <h2>h2-1</h2>
        <h2>h2-2</h2>
        <p>ppp</p>
        <div class="inner">Hello</div>
        <div class="inner">Goodbye</div>
      </div>
    `
  })

  it('插入 HTML 字符串', () => {
    before('<p>this is p</p>')(dom('.inner'))
    const inner1 = document.querySelectorAll('.inner')[0]
    expect(inner1.previousElementSibling.tagName).toBe('P')
    expect(inner1.previousElementSibling.textContent).toBe('this is p')
  })

  it('插入 DOM 元素', () => {
    const spanEl = document.createElement('span')
    spanEl.textContent = 'span-text'
    before(spanEl)(dom('.inner'))
    const inner1 = document.querySelectorAll('.inner')[0]
    expect(inner1.previousElementSibling.tagName).toBe('SPAN')
    expect(inner1.previousElementSibling.textContent).toBe('span-text')
  })

  it('插入文本节点', () => {
    before('TEXT')(dom('.inner'))
    expect(
      document.querySelector('.inner').previousSibling.nodeValue,
    ).toContain('TEXT')
  })

  it('元素和文本节点数组', () => {
    before([document.querySelector('h2'), 'TEXT'])(dom('.inner'))

    const inner1 = document.querySelectorAll('.inner')[0]
    expect(inner1.previousElementSibling.tagName).toBe('H2')
    expect(inner1.previousElementSibling.textContent).toBe('h2-1')
    expect(inner1.previousSibling.previousSibling.textContent).toBe('h2-1')
  })

  it('插入元素数组', () => {
    const h2El = dom('h2')
    before(h2El)(dom('.inner'))
    const inner1 = document.querySelectorAll('.inner')[0]
    expect(inner1.previousElementSibling.tagName).toBe('H2')
    expect(inner1.previousElementSibling.textContent).toBe('h2-2')
  })

  it('函数返回HTML字符串', () => {
    before((index, html) => {
      return `<b>test-${index}</b>`
    })(dom('.inner'))
    const nodeList = document.querySelectorAll('b')

    expect(nodeList[0].textContent).toBe('test-0')
    expect(nodeList[1].textContent).toBe('test-1')
  })

  it('函数返回HTMLCollection集合', () => {
    before(function (index, html) {
      return document.getElementsByTagName('p')
    })(dom('.inner'))

    const container = document.querySelector('.container')

    expect(container.innerHTML.replace(/\s+/g, ' ').trim()).toBe(
      `<h2>h2-1</h2> <h2>h2-2</h2> <p>ppp</p><div class="inner">Hello</div> <p>ppp</p><div class="inner">Goodbye</div>`,
    )
  })

  it('多个匹配元素都插入内容', () => {
    before('<i>italic</i>')(dom('.inner'))
    const iTags = document.querySelectorAll('i')
    expect(iTags.length).toBe(2)
    expect(iTags[0].textContent).toBe('italic')
  })
})
