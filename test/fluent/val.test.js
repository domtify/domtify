import { describe, it, expect, beforeEach } from 'vitest'

import { dom } from '@/core.js'
import { val } from '@/methods/val.js'

describe('val', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <select id="single">
      <option>option1</option>
      <option>option2</option>
    </select>

    <select id="multiple" multiple>
      <option selected>option1</option>
      <option>option2</option>
      <option selected>option3</option>
    </select>

    <input type="text" value="some text" />
    <input type="checkbox" name="checkboxname" value="check1" />
    <input type="checkbox" name="checkboxname" value="check2" />
    <input type="radio" name="r" value="radio1" />
    <input type="radio" name="r" value="radio2" />
    `
  })

  it('获取input框的值', () => {
    expect(val()(dom('input'))).toBe('some text')
  })

  it('单选下拉框', () => {
    expect(val()(dom('#single'))).toBe('option1')
  })

  it('多选下拉框', () => {
    expect(val()(dom('#multiple'))).toEqual(['option1', 'option3'])
  })

  // ---- Setter ----
  it('input输入框-字符串', () => {
    const textInput = document.querySelector('input[type="text"]')
    const check1 = document.querySelector('input[value="check1"]')
    const check2 = document.querySelector('input[value="check2"]')
    const radio2 = document.querySelector('input[value="radio2"]')

    val('foo bar')(dom('input'))

    expect(textInput.value).toBe('foo bar')
    // 其它的输入框不受影响
    expect(check1.checked).toBe(false)
    expect(check2.checked).toBe(false)
    expect(radio2.checked).toBe(false)
  })

  it('input输入框-数字', () => {
    const textInput = document.querySelector('input[type="text"]')
    const check1 = document.querySelector('input[value="check1"]')
    const check2 = document.querySelector('input[value="check2"]')
    const radio2 = document.querySelector('input[value="radio2"]')

    val(100)(dom('input'))

    expect(textInput.value).toBe('100')
    // 其它的输入框不受影响
    expect(check1.checked).toBe(false)
    expect(check2.checked).toBe(false)
    expect(radio2.checked).toBe(false)
  })

  it('input输入框-数组', () => {
    const textInput = document.querySelector('input[type="text"]')
    const check1 = document.querySelector('input[value="check1"]')
    const check2 = document.querySelector('input[value="check2"]')
    const radio1 = document.querySelector('input[value="radio1"]')
    const radio2 = document.querySelector('input[value="radio2"]')

    val(['check1', 'check2', 'radio1'])(dom('input'))

    expect(textInput.value).toBe('check1,check2,radio1')
    // 其它的输入框不受影响
    expect(check1.checked).toBe(true)
    expect(check2.checked).toBe(true)
    expect(radio1.checked).toBe(true)
    expect(radio2.checked).toBe(false)
  })

  it('input输入框-函数', () => {
    const textInput = document.querySelector('input[type="text"]')
    const check1 = document.querySelector('input[value="check1"]')
    const check2 = document.querySelector('input[value="check2"]')
    const radio1 = document.querySelector('input[value="radio1"]')
    const radio2 = document.querySelector('input[value="radio2"]')
    const expected = ['some text', 'check1', 'check2', 'radio1', 'radio2']

    val((index, oldVal) => {
      if (index === 0) {
        expect(oldVal).toBe('some text')
      }
      expect(oldVal).toBe(expected[index]) // 可选：验证 oldVal 是正确的
      return 'foo'
    })(dom('input'))

    expect(textInput.value).toBe('foo')
    expect(check1.checked).toBe(false)
    expect(check2.checked).toBe(false)
    expect(radio1.checked).toBe(false)
    expect(radio1.checked).toBe(false)
    expect(radio2.checked).toBe(false)
  })

  it('select-字符串', () => {
    val('option2')(dom('select'))
    const selects = document.querySelectorAll('select')

    for (const sel of selects) {
      expect(sel.value).toBe('option2')
    }
  })

  it('select-数组', () => {
    val(['option2', 'option3'])(dom('select'))
    const multi = document.querySelector('#multiple')
    const selected = Array.from(multi.selectedOptions).map(o => o.value)
    expect(selected).toEqual(['option2', 'option3'])
  })

  it('select-函数', () => {
    val((index, oldVal) => {
      if (index === 0) return 'option1'
      else return ['option2', 'option3']
    })(dom('select'))
    expect(document.querySelector('#single').value).toBe('option1')
    const multi = document.querySelector('#multiple')
    const selected = Array.from(multi.selectedOptions).map(o => o.value)
    expect(selected).toEqual(['option2', 'option3'])
  })
})
