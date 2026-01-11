import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import DomtifyEvent from '@/core/DomtifyEvent'
import { dom } from '@/core/dom'
import { off } from '@/fluent/off'
import { on } from '@/fluent/on'
import { one } from '@/fluent/one'
import { trigger } from '@/fluent/trigger'

describe('event', () => {
  describe('on', () => {
    beforeEach(() => {
      document.body.innerHTML = `
      <div class="box">
          <ul>
            <li id="foo">foo</li>
            <li id="bar">bar</li>
            <li id="link"><a href="https://github.com">github</a></li>
          </ul>
        </div>
      `
    })
    afterEach(() => {
      off()(dom(window))
    })

    it('集合对象的参数不合法', () => {
      const handler = vi.fn()
      expect(() => on('resize scroll', handler)(dom(10))).not.throw()
      expect(handler).not.toHaveBeenCalled()
    })

    it('window对象事件测试', () => {
      // global.EventTarget = window.constructor
      const handler = vi.fn()

      on('click', handler)(dom(window))

      // 触发事件
      window.dispatchEvent(new Event('click'))

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('参数不合法(为传递回调函数)', () => {
      const handler = vi.fn()
      on('click', 'li', 'errorAra')(dom('ul'))
      document.querySelector('#foo').click()
      expect(handler).not.toHaveBeenCalled()
    })

    it('最基础的直接绑定测试', () => {
      const handler = vi.fn()
      on('click', handler)(dom('#foo'))

      document.querySelector('#foo').click()
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('直接绑定监听时event对象上的属性和this', () => {
      const handler = vi.fn()
      on('click', handler)(dom('#foo'))

      document.querySelector('#foo').click()

      // 事件对象
      const event = handler.mock.calls[0][0]

      // this 指向
      const ctx = handler.mock.instances[0]

      expect(ctx).toBe(document.querySelector('#foo'))
      expect(event.currentTarget).toBe(ctx)
      expect(event.delegateTarget).toBe(ctx)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('直接绑定stopPropagation阻止往上冒泡', () => {
      const parentHandler = vi.fn()
      const handler1 = vi.fn(e => e.stopPropagation())
      const handler2 = vi.fn()

      on('click', parentHandler)(dom('ul'))
      on('click', handler1)(dom('li'))
      on('click', handler2)(dom('li'))

      document.querySelector('#foo').click()

      expect(handler1).toHaveBeenCalled()
      expect(handler2).toHaveBeenCalled()
      expect(parentHandler).not.toHaveBeenCalled()
    })

    it('直接绑定stopImmediatePropagation阻止往上冒泡和当前元素剩下的其它监听器', () => {
      const parentHandler = vi.fn()
      const handler1 = vi.fn(e => e.stopImmediatePropagation())
      const handler2 = vi.fn()

      on('click', parentHandler)(dom('ul'))
      on('click', handler1)(dom('li'))
      on('click', handler2)(dom('li'))

      document.querySelector('#foo').click()

      expect(handler1).toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
      expect(parentHandler).not.toHaveBeenCalled()
    })

    it('事件委托', () => {
      const handler = vi.fn()
      on('click', 'li', handler)(dom('ul'))

      // 点击已有 li
      document.querySelector('#bar').click()
      expect(handler).toHaveBeenCalledTimes(1)

      // 动态添加 li，再触发
      document
        .querySelector('.box')
        .insertAdjacentHTML('beforeend', `<li id="baz">baz</li>`)
      document.querySelector('#baz').click()
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('事件委托对象上的属性和this', () => {
      const handler = vi.fn()
      on('click', 'li', handler)(dom('ul'))

      document.querySelector('#foo').click()
      expect(handler).toHaveBeenCalledTimes(1)
      // 事件对象
      const event = handler.mock.calls[0][0]

      // this 指向
      const ctx = handler.mock.instances[0]

      expect(ctx).toBe(document.querySelector('#foo'))
      expect(event.currentTarget).toBe(ctx)
      expect(event.delegateTarget).toBe(document.querySelector('ul'))
    })

    it('事件冒泡时的触发顺序', () => {
      const calls = []

      on('click', function () {
        calls.push('ul click')
      })(dom('ul'))
      on('click.ns1', function () {
        calls.push('ul click.ns1')
      })(dom('ul'))
      on('mousedown.ns1', function () {
        calls.push('ul mousedown.ns1')
      })(dom('ul'))

      on('click', 'li', function () {
        calls.push('li click-1')
      })(dom('ul'))
      on('click', 'li', function () {
        calls.push('li click-2')
      })(dom('ul'))

      // 模拟用户操作
      const li = document.querySelector('#foo')
      li.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
      li.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(calls).toEqual([
        'ul mousedown.ns1',
        'li click-1',
        'li click-2',
        'ul click',
        'ul click.ns1',
      ])
    })

    it('事件委托-stopPropagation', () => {
      const handler0 = vi.fn()
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const handler3 = vi.fn(e => e.stopPropagation())
      const handler4 = vi.fn()

      const ulEl = dom('ul')

      on('click', handler0)(ulEl)
      on('click.ns1', handler1)(ulEl)
      on('mousedown.ns1', handler2)(ulEl)
      // 委托
      on('click', 'li', handler3)(ulEl)
      on('click', 'li', handler4)(ulEl)

      document.querySelector('#foo').click()

      expect(handler0).not.toHaveBeenCalled()
      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()

      expect(handler3).toHaveBeenCalled()
      expect(handler4).toHaveBeenCalled()
    })

    it('事件委托-stopImmediatePropagation', () => {
      const handler0 = vi.fn()
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const handler3 = vi.fn(e => e.stopImmediatePropagation())
      const handler4 = vi.fn()

      const ulEl = dom('ul')

      on('click', handler0)(ulEl)
      on('click.ns1', handler1)(ulEl)
      on('mousedown.ns1', handler2)(ulEl)
      // 委托
      on('click', 'li', handler3)(ulEl)
      on('click', 'li', handler4)(ulEl)

      document.querySelector('#foo').click()

      expect(handler0).not.toHaveBeenCalled()
      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
      expect(handler4).not.toHaveBeenCalled()

      expect(handler3).toHaveBeenCalled()
    })

    it('捕获阶段第三个选项为true或{capture:true}时的触发顺序', () => {
      const calls = []

      const ulEl = dom('ul')

      on(
        'click',
        function () {
          calls.push('ul click')
        },
        true,
      )(ulEl)
      on(
        'click.ns1',
        function () {
          calls.push('ul click.ns1')
        },
        true,
      )(ulEl)
      on(
        'mousedown.ns1',
        function () {
          calls.push('ul mousedown.ns1')
        },
        true,
      )(ulEl)
      on(
        'click',
        'li',
        function () {
          calls.push('li click-1')
        },
        true,
      )(ulEl)
      on(
        'click',
        'li',
        function () {
          calls.push('li click-2')
        },
        true,
      )(ulEl)

      // 模拟用户操作
      const li = document.querySelector('#foo')
      li.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
      li.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(calls).toEqual([
        'ul mousedown.ns1',
        'ul click',
        'ul click.ns1',
        'li click-1',
        'li click-2',
      ])
    })

    it('选项 once 只会执行一次', () => {
      const handler = vi.fn()
      on('click', handler, { once: true })(dom('#foo'))

      document.querySelector('#foo').click()
      document.querySelector('#foo').click()
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('选项 signal,在abort()后应该解除事件绑定', () => {
      const controller = new AbortController()
      const handler = vi.fn()

      on('click', handler, { signal: controller.signal })(dom('#foo'))
      document.querySelector('#foo').click()
      expect(handler).toHaveBeenCalledTimes(1)

      controller.abort()
      document.querySelector('#foo').click()
      expect(handler).toHaveBeenCalledTimes(1) // 没有再次触发
    })

    it('捕获阶段的-stopPropagation', () => {
      const handler0 = vi.fn(e => e.stopPropagation())
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const handler3 = vi.fn()
      const handler4 = vi.fn()

      const ulEl = dom('ul')

      on('click', handler0, true)(ulEl)
      on('click.ns1', handler1, true)(ulEl)
      on('mousedown.ns1', handler2, true)(ulEl)
      // 委托
      on('click', 'li', handler3, true)(ulEl)
      on('click', 'li', handler4, true)(ulEl)

      document
        .querySelector('#foo')
        .dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
      document.querySelector('#foo').click()

      expect(handler0).toHaveBeenCalled()
      expect(handler1).toHaveBeenCalled()
      expect(handler2).toHaveBeenCalled()
      expect(handler3).not.toHaveBeenCalled()
      expect(handler4).not.toHaveBeenCalled()
    })

    it('捕获阶段的-stopImmediatePropagation', () => {
      const handler0 = vi.fn(e => e.stopImmediatePropagation())
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const handler3 = vi.fn()
      const handler4 = vi.fn()

      const ulEl = dom('ul')

      on('click', handler0, true)(ulEl)
      on('click.ns1', handler1, true)(ulEl)
      on('mousedown.ns1', handler2, true)(ulEl)
      // 委托
      on('click', 'li', handler3, true)(ulEl)
      on('click', 'li', handler4, true)(ulEl)

      document
        .querySelector('#foo')
        .dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
      document.querySelector('#foo').click()

      expect(handler0).toHaveBeenCalled()
      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).toHaveBeenCalled()
      expect(handler3).not.toHaveBeenCalled()
      expect(handler4).not.toHaveBeenCalled()
    })

    // 在 passive: true 时调用 preventDefault 应该触发警告 这个需要用
    // Playwright、Cypress 等 e2e 测试
  })

  describe('one', () => {
    beforeEach(() => {
      document.body.innerHTML = `
      <ul>
        <li id="foo">foo</li>
        <li id="bar">bar</li>
      </ul>
      `
    })

    it('直接绑定测试', () => {
      const handler = vi.fn()
      one('click', handler)(dom('ul'))

      document.querySelector('#foo').click()
      document.querySelector('#foo').click()
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('事件委托', () => {
      const handler = vi.fn()
      one('click', 'li', handler)(dom('ul'))

      // 动态添加 li，再触发
      document
        .querySelector('ul')
        .insertAdjacentHTML('beforeend', `<li id="baz">baz</li>`)
      document.querySelector('#baz').click()
      document.querySelector('#baz').click()
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('也支持第三个参数传递对象', () => {
      const handler = vi.fn()
      one('click', handler, { capture: false })(dom('ul'))

      document.querySelector('#foo').click()
      document.querySelector('#foo').click()
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('边缘情况,第三个参数传递任意其它值', () => {
      const handler = vi.fn()
      one('click', handler, [])(dom('ul'))

      document.querySelector('#foo').click()
      document.querySelector('#foo').click()
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('参数不合法', () => {
      const handler = vi.fn()
      one('click', 'li', 'errorAra')(dom('ul'))
      document.querySelector('#foo').click()
      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('trigger', () => {
    beforeEach(() => {
      document.body.innerHTML = `
      <ul class="u2">
        <li id="bar">bar</li>
      </ul>
      `
    })

    it('基本的trigger触发2', () => {
      const handler = vi.fn()
      on('click', handler)(dom('.u2'))

      // trigger触发
      trigger('click')(dom('.u2'))
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler.mock.calls[0][0]).toBeInstanceOf(DomtifyEvent)
    })

    it('非trigger触发', () => {
      const handler = vi.fn()
      on('click', handler)(dom('.u2'))

      document.querySelector('#bar').click()
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler.mock.calls[0][0]).toBeInstanceOf(MouseEvent)
    })

    it('只触发ns1命名空间的事件 ', () => {
      const handler0 = vi.fn()
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const handler3 = vi.fn()

      on('click', handler0)(dom('.u2'))

      const barEl = dom('#bar')

      on('click.ns2', handler1)(barEl)
      on('click.ns1', handler2)(barEl)
      on('click.ns1.a.b.c', handler3)(barEl)

      // 触发
      trigger('click.ns1')(barEl)

      expect(handler0).not.toHaveBeenCalled()
      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).toHaveBeenCalled()
      expect(handler3).toHaveBeenCalled()
    })

    it('触发所有的click类型的事件 ', () => {
      const handler0 = vi.fn()
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const handler3 = vi.fn()

      const barEl = dom('#bar')

      on('click', handler0)(dom('.u2'))
      on('click.ns2', handler1)(barEl)
      on('click.ns1', handler2)(barEl)
      on('click.ns1.a.b.c', handler3)(barEl)

      // 触发
      trigger('click')(barEl)

      expect(handler0).toHaveBeenCalled()
      expect(handler1).toHaveBeenCalled()
      expect(handler2).toHaveBeenCalled()
      expect(handler3).toHaveBeenCalled()
    })

    it('如果是多级的命名空间可以不限制顺序触发', () => {
      const handler0 = vi.fn()
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const handler3 = vi.fn()

      const barEl = dom('#bar')

      on('click', handler0)(dom('.u2'))
      on('click.ns2', handler1)(barEl)
      on('click.ns1', handler2)(barEl)
      on('click.ns1.a.b.c', handler3)(barEl)

      // 触发

      trigger('click.a')(barEl)
      trigger('click.b')(barEl)
      trigger('click.c')(barEl)
      trigger('click.a.b')(barEl)
      trigger('click.a.b.c')(barEl)
      trigger('click.a.c')(barEl)
      trigger('click.a.c.b')(barEl)

      expect(handler0).not.toHaveBeenCalled()
      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
      expect(handler3).toHaveBeenCalled(7)
    })

    it('只传递命名空间无法触发', () => {
      const handler3 = vi.fn()

      const barEl = dom('#bar')

      on('click.ns1.a.b.c', handler3)(barEl)
      trigger('.b')(barEl)
      expect(handler3).not.toHaveBeenCalled()
    })

    it('支持传递参数', () => {
      const handler = vi.fn()
      on('click', handler)(dom('.u2'))
      trigger('click', 'test')(dom('#bar'))
      expect(handler).toHaveBeenCalled()
      expect(handler.mock.calls[0][1]).toEqual('test')

      // 支持其它数据-对象测试
      const handler1 = vi.fn()
      on('click', handler1)(dom('.u2'))
      trigger('click', { foo: 123 })(dom('#bar'))
      expect(handler1.mock.calls[0][1]).toEqual({ foo: 123 })
    })

    it('如果传递的是数组接收时可以分开单独接收', () => {
      const handler = vi.fn()
      on('click', handler)(dom('.u2'))
      trigger('click', ['test', 'test2'])(dom('#bar'))
      expect(handler).toHaveBeenCalled()
      expect(handler.mock.calls[0][1]).toEqual('test')
      expect(handler.mock.calls[0][2]).toEqual('test2')
    })

    it('给事件对象上绑定自定义属性', () => {
      const handler = vi.fn()

      on('click', handler)(dom('.u2'))
      const handler2 = vi.fn(function () {
        this.foo = 'foo'
        this.bar = 'bar'
        return ['test', 'test2']
      })
      trigger('click', handler2)(dom('#bar'))
      expect(handler).toHaveBeenCalled()
      expect(handler.mock.calls[0][1]).toEqual('test')
      expect(handler.mock.calls[0][2]).toEqual('test2')

      // 拿到事件对象
      const event = handler.mock.calls[0][0]
      expect(event.foo).toBe('foo')
      expect(event.bar).toBe('bar')
    })

    it('支持通过选项来控制触发的行为', () => {
      const handler0 = vi.fn()
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const handler3 = vi.fn()

      on('click', handler0)(dom('.u2'))

      const barEl = dom('#bar')

      on('click.ns2', handler1)(barEl)
      on('click.ns1', handler2)(barEl)
      on('click.ns1.a.b.c', handler3)(barEl)

      trigger('click', {
        bubbles: false,
      })(barEl)

      expect(handler0).not.toHaveBeenCalled()
      expect(handler1).toHaveBeenCalled()
      expect(handler2).toHaveBeenCalled()
      expect(handler3).toHaveBeenCalled()
    })
  })

  describe('off', () => {
    beforeEach(() => {
      document.body.innerHTML = `
      <ul class="u2">
        <li>foo</li>
        <li>bar</li>
      </ul>
      `
    })

    it('无参数,移除当前元素上所有绑定事件', () => {
      const handle0 = vi.fn()
      const handle1 = vi.fn()
      const handle2 = vi.fn()
      const u2El = dom('.u2')
      on('click.ns click.ns1 click.ns2 mousedown.ns', 'li', handle0)(u2El)
      on('click.ns1.a.t', 'li', handle1)(u2El)
      on('click.ns1.a.t', handle2)(u2El)

      // 解绑
      off()(u2El)

      // 触发事件
      document.querySelector('li').click()

      expect(handle0).toHaveBeenCalledTimes(0)
      expect(handle1).toHaveBeenCalledTimes(0)
      expect(handle2).toHaveBeenCalledTimes(0)
    })

    it('按照事件名称，会移除所有的点击事件', () => {
      const handle0 = vi.fn()
      const handle1 = vi.fn()
      const handle2 = vi.fn()

      const u2El = dom('.u2')

      on('click.ns click.ns1 click.ns2 mousedown.ns', 'li', handle0)(u2El)
      on('click.ns1.a.t', 'li', handle1)(u2El)
      on('click.ns1.a.t', handle2)(u2El)

      // 解绑
      off('click')(u2El)

      // 触发事件
      const liEl = document.querySelector('li')
      liEl.click()
      liEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

      expect(handle0).toHaveBeenCalledTimes(1)
      expect(handle1).toHaveBeenCalledTimes(0)
      expect(handle2).toHaveBeenCalledTimes(0)
    })

    it('移除特定的命名空间的事件', () => {
      const handle0 = vi.fn()
      const handle1 = vi.fn()
      const handle2 = vi.fn()

      const u2El = dom('.u2')

      on('click.ns click.ns1 click.ns2 mousedown.ns', 'li', handle0)(u2El)
      on('click.ns1.a.t', 'li', handle1)(u2El)
      on('click.ns1.a.t', handle2)(u2El)

      // 解绑
      off('click.ns1 click.ns2')(u2El)

      // 触发事件
      const liEl = document.querySelector('li')
      liEl.click()
      liEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

      expect(handle0).toHaveBeenCalledTimes(2)
      expect(handle1).toHaveBeenCalledTimes(0)
      expect(handle2).toHaveBeenCalledTimes(0)
    })

    it('多级的命名空间,支持按照不同的命名空间和不限制顺序解绑', () => {
      const handle0 = vi.fn()
      const handle1 = vi.fn()
      const handle2 = vi.fn()
      const handle3 = vi.fn()
      const handle4 = vi.fn()
      const handle5 = vi.fn()

      const u2El = dom('.u2')

      on('click.ns1.a.t', handle0)(u2El)
      on('click.ns1.a.t', handle1)(u2El)
      on('click.ns1.a.t', handle2)(u2El)
      on('click.ns1.a.t', handle3)(u2El)
      on('click.ns1.a.t', handle4)(u2El)
      on('click.ns1.a.t', handle5)(u2El)

      // 解绑
      off('.ns1.a.t')(u2El)
      off('.a')(u2El)
      off('.ns1')(u2El)
      off('.t')(u2El)
      off('.a.t')(u2El)
      off('.t.a')(u2El)

      // 触发
      document.querySelector('li').click()

      expect(handle0).not.toHaveBeenCalled()
      expect(handle1).not.toHaveBeenCalled()
      expect(handle2).not.toHaveBeenCalled()
      expect(handle3).not.toHaveBeenCalled()
      expect(handle4).not.toHaveBeenCalled()
      expect(handle5).not.toHaveBeenCalled()
    })

    it('支持句柄进一步过滤', () => {
      const handle0 = vi.fn()
      const handle1 = vi.fn()
      const handle2 = vi.fn()

      const u2El = dom('.u2')

      on('click.ns click.ns1 click.ns2 mousedown.ns', 'li', handle0)(u2El)
      on('click.ns1.a.t', 'li', handle1)(u2El)
      on('click.ns1.a.t', handle2)(u2El)

      // 解绑
      off('click', handle2)(u2El)

      // 触发事件
      const liEl = document.querySelector('li')
      liEl.click()
      liEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

      expect(handle0).toHaveBeenCalledTimes(4)
      expect(handle1).toHaveBeenCalledTimes(1)
      expect(handle2).toHaveBeenCalledTimes(0)
    })

    it('通过对象的方式批量传入要移除的事件', () => {
      const handle0 = vi.fn()
      const handle1 = vi.fn()
      const handle2 = vi.fn()

      const u2El = dom('.u2')

      on('click.ns click.ns1 click.ns2 mousedown.ns', 'li', handle0)(u2El)
      on('click.ns1.a.t', 'li', handle1)(u2El)
      on('click.ns1.a.t', handle2)(u2El)

      // 解绑
      off({ click: handle2, 'mousedown.ns': handle0 })(u2El)

      // 触发事件
      const liEl = document.querySelector('li')
      liEl.click()
      liEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

      expect(handle0).toHaveBeenCalledTimes(3)
      expect(handle1).toHaveBeenCalledTimes(1)
      expect(handle2).toHaveBeenCalledTimes(0)
    })

    it('支持直接通过绑定的句柄来解绑', () => {
      const handle0 = vi.fn()
      const handle1 = vi.fn()
      const handle2 = vi.fn()

      const u2El = dom('.u2')

      on('click.ns click.ns1 click.ns2 mousedown.ns', 'li', handle0)(u2El)
      on('click.ns1.a.t', 'li', handle1)(u2El)
      on('click.ns1.a.t', handle2)(u2El)

      // 解绑
      off(handle0)(u2El)

      // 触发事件
      const liEl = document.querySelector('li')
      liEl.click()
      liEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

      expect(handle0).toHaveBeenCalledTimes(0)
      expect(handle1).toHaveBeenCalledTimes(1)
      expect(handle2).toHaveBeenCalledTimes(1)
    })
  })
})
