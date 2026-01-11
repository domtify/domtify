import {
  isArray,
  isBoolean,
  isEmptyString,
  isFunction,
  isInstanceOf,
  isPlainObject,
  isString,
  isUndefined,
} from 'is-what'

import DomtifyEvent from '@/core/DomtifyEvent.js'

const ORDER_DIRECT = 'direct'
const ORDER_DELEGATE = 'delegate'

// 用于存储所有事件监听器
const listenersMap = new Map()
const dispatchedWeakMap = new WeakMap()

// 数据存储的key
const DATA_KEYS = {
  SYM_EVENT_UUID: Symbol('eventUUID'),
  SYM_EVENT_TYPE: Symbol('type'),
  SYM_STOP_PROP: Symbol('stopPropagationCalled'),
  SYM_STOP_IMM: Symbol('stopImmediateCalled'),

  // 下面的KEY是为了和jQuery保持一致
  DELEGATE_TARGET: 'delegateTarget',
  CURRENT_TARGET: 'currentTarget',
  HANDLE_OBJ: 'handleObj',
  HANDLE_OBJ_KEYS: {
    NAMESPACE: 'namespace',
    SELECTOR: 'selector',
    TYPE: 'type',
    HANDLER: 'handler',
  },
}

class Event {
  // 命名空间分隔符
  #namespaceSeparator = '.'

  // 需要处理事件的元素数组
  #elements = []

  constructor(element) {
    let elements = isArray(element) ? element : [element]
    this.#elements = elements.filter(item => isInstanceOf(item, EventTarget))
  }

  // 获取元素的uuid
  #getUUID(element) {
    if (!Object.hasOwn(element, DATA_KEYS.SYM_EVENT_UUID)) {
      Reflect.set(element, DATA_KEYS.SYM_EVENT_UUID, this.#uuid())
    }
    return Reflect.get(element, DATA_KEYS.SYM_EVENT_UUID)
  }

  /**
   * 解析带命名空间的事件名
   *
   * @private
   * @param {string} eventName - 事件名，例如 "click.app1.ns2"
   * @returns {{ type: string, namespace?: string, full: string }}
   *          type:       基础事件类型
   *          namespace:  排序后的命名空间（如果没有则 undefined）
   *          full:       排序后的完整事件名
   *
   * @example
   * this.#parseEventName("click.ns2.app1")
   * // { type: "click", namespace: "app1.ns2", full: "click.app1.ns2" }
   */
  #parseEventName(eventName) {
    const parts = eventName.split(this.#namespaceSeparator)
    const type = parts.shift() // 第一个一定是事件类型
    const namespace = parts.length
      ? parts.sort().join(this.#namespaceSeparator)
      : ''
    const full = namespace
      ? `${type}${this.#namespaceSeparator}${namespace}`
      : type

    return { type, namespace, full }
  }

  // 获取事件数组
  #getEvents(eventName) {
    if (!isString(eventName)) return []

    // 将逗号替换为空格，然后按空格分割
    return eventName.replace(/,/g, ' ').trim().split(/\s+/).filter(Boolean) // 去掉空字符串
  }

  // 解析on方法的参数
  #parseOnArgs(eventNames, selector, listener, options = false) {
    if (isFunction(selector)) {
      // 函数表示没有传递委托的选择器
      options = listener || false
      listener = selector
      selector = null
    } else {
      if (!isFunction(listener)) return
    }

    if (!isFunction(listener)) return

    return { eventNames, selector, listener, options }
  }

  // 保持和jQuery相同的命名空间匹配机制
  #matchNamespace(namespace, offNs) {
    return offNs
      .split(this.#namespaceSeparator)
      .every(ns => namespace.split(this.#namespaceSeparator).includes(ns))
  }

  #addToGroup(groups, target, record) {
    let group = groups.find(g => g.currentTarget === target)
    if (!group) {
      group = { currentTarget: target, listeners: [] }
      groups.push(group)
    }
    group.listeners.push(record)
  }

  #collectGroups(records, el, event, order) {
    const groups = []

    for (const step of order) {
      if (step === ORDER_DIRECT) {
        // 直接绑定在 el 的 listener
        for (const record of records.filter(r => !r.selector)) {
          this.#addToGroup(groups, el, record)
        }
      } else if (step === ORDER_DELEGATE) {
        // 事件委托 listener
        for (const record of records.filter(r => r.selector)) {
          const matchedTarget = this.#closestUntil(
            event.target,
            record.selector,
            el,
          )
          if (matchedTarget) {
            this.#addToGroup(groups, matchedTarget, record)
          }
        }
      }
    }

    return groups
  }

  #executeGroups(groups, event) {
    for (const { currentTarget, listeners } of groups) {
      for (const record of listeners) {
        if (Reflect.get(event, DATA_KEYS.SYM_STOP_IMM)) break

        // 必须用defineProperty否则无法覆盖
        Reflect.defineProperty(event, DATA_KEYS.CURRENT_TARGET, {
          value: currentTarget,
          configurable: true, // 可修改
        })

        const isDomtifyEvent = isInstanceOf(event, DomtifyEvent)

        if (isDomtifyEvent) {
          const triggerEventName = Reflect.get(event, DATA_KEYS.SYM_EVENT_TYPE)

          // 获取触发事件的命名空间部分
          const triggerNamespace =
            this.#parseEventName(triggerEventName).namespace

          if (triggerNamespace) {
            if (!this.#matchNamespace(record.namespace, triggerNamespace))
              continue
          } else {
            // 直接事件名
            if (record.type !== triggerEventName) continue
          }
        }

        Reflect.set(event, DATA_KEYS.HANDLE_OBJ, {
          [DATA_KEYS.HANDLE_OBJ_KEYS.NAMESPACE]: record.namespace,
          [DATA_KEYS.HANDLE_OBJ_KEYS.SELECTOR]: record.selector,
          [DATA_KEYS.HANDLE_OBJ_KEYS.TYPE]: record.type,
          [DATA_KEYS.HANDLE_OBJ_KEYS.HANDLER]: record.listener,
        })

        // 正式调用
        Reflect.apply(
          record.listener,
          currentTarget,
          isDomtifyEvent
            ? [
                event,
                ...(isArray(event.detail) ? event.detail : [event.detail]),
              ]
            : [event],
        )

        // once
        if (isPlainObject(record.options) && record.options.once === true) {
          this.#cleanListenersMap(l => l === record)
        }
      }

      if (Reflect.get(event, DATA_KEYS.SYM_STOP_PROP)) break
    }
  }

  #processPhase(records, el, event, isCapture) {
    // 捕获：直绑 → 委托
    // 冒泡：委托 → 直绑
    const order = isCapture
      ? [ORDER_DIRECT, ORDER_DELEGATE]
      : [ORDER_DELEGATE, ORDER_DIRECT]

    const groups = this.#collectGroups(records, el, event, order)

    this.#executeGroups(groups, event)
  }

  #patchEvent(event) {
    const origStop = event.stopPropagation
    const origStopImmediate = event.stopImmediatePropagation

    event.stopPropagation = function () {
      Reflect.set(this, DATA_KEYS.SYM_STOP_PROP, true)
      return Reflect.apply(origStop, this, [])
    }

    event.stopImmediatePropagation = function () {
      Reflect.set(this, DATA_KEYS.SYM_STOP_IMM, true)
      Reflect.set(this, DATA_KEYS.SYM_STOP_PROP, true)
      return Reflect.apply(origStopImmediate, this, [])
    }

    return event
  }

  // 把事件绑定到某个元素中
  cloneTo(target) {
    for (const element of this.#elements) {
      this.#forEachListener(element, record => {
        new Event(target).on(record.full, record.listener, record.options)
      })
    }
  }

  #getRecords(uuid, type) {
    const records = listenersMap.get(uuid)[type] || []

    const captureRecords = []
    const bubbleRecords = []

    for (const recored of records) {
      const { options } = recored

      if (
        options === true ||
        (isPlainObject(options) && options.capture === true)
      ) {
        captureRecords.push(recored)
      } else {
        bubbleRecords.push(recored)
      }
    }

    return {
      captureRecords,
      bubbleRecords,
    }
  }

  on(...args) {
    const parsed = this.#parseOnArgs(...args)
    if (!parsed) return
    const { eventNames, selector, listener, options } = parsed
    for (const eventName of this.#getEvents(eventNames)) {
      const parsedEventInfo = this.#parseEventName(eventName)

      for (const el of this.#elements) {
        const uuid = this.#getUUID(el)

        const handler = event => {
          // 这里采用WeakMap方案会自动进行GC回收,而且不会污染event对象
          let dispatched = dispatchedWeakMap.get(event)
          if (!dispatched) {
            dispatched = new Set()
            dispatchedWeakMap.set(event, dispatched)
          }
          if (dispatched.has(uuid)) return
          dispatched.add(uuid)

          // 保持jQuery的行为
          Reflect.set(event, DATA_KEYS.DELEGATE_TARGET, el)

          // event对象打补丁
          this.#patchEvent(event)

          const { captureRecords, bubbleRecords } = this.#getRecords(
            uuid,
            parsedEventInfo.type,
          )

          this.#processPhase(captureRecords, el, event, true)
          this.#processPhase(bubbleRecords, el, event, false)
        }

        if (!listenersMap.has(uuid)) listenersMap.set(uuid, {})
        if (!listenersMap.get(uuid)[parsedEventInfo.type])
          listenersMap.get(uuid)[parsedEventInfo.type] = []

        const record = {
          handler,
          listener,
          selector,
          options,
          ...parsedEventInfo,
        }

        // 保存 record
        listenersMap.get(uuid)[parsedEventInfo.type].push(record)

        // 监听 signal.abort()
        if (isInstanceOf(options.signal, AbortSignal)) {
          options.signal.addEventListener(
            'abort',
            () => {
              this.#cleanListenersMap(l => l === record)
            },
            { once: true },
          )
        }

        el.addEventListener(parsedEventInfo.type, handler, options) // 绑定事件
      }
    }
  }

  one(...args) {
    const params = this.#parseOnArgs(...args)
    if (!params) return

    // 强制 once = true
    if (isBoolean(params.options)) {
      params.options = { capture: params.options, once: true }
    } else if (isPlainObject(params.options)) {
      params.options = { ...params.options, once: true }
    } else {
      params.options = { once: true }
    }
    const { eventNames, selector, listener, options } = params

    this.on(eventNames, selector, listener, options)
  }

  #forEachListener(el, callback) {
    const uuid = this.#getUUID(el)
    const listeners = listenersMap.get(uuid)
    if (!listeners) return

    for (const [, records] of Object.entries(listeners)) {
      for (const record of records) {
        callback(record)
      }
    }
  }

  #cleanListenersMap(predicate) {
    for (const [uuid, events] of listenersMap) {
      for (const type of Object.keys(events)) {
        // 过滤掉不要的
        events[type] = events[type].filter(listener => !predicate(listener))
        // 如果该事件类型数组空了，删除该事件类型
        if (events[type].length === 0) {
          Reflect.deleteProperty(events, type)
        }
        // 如果该 id 下没有任何事件类型，删除整个 key
        if (Object.keys(events).length === 0) {
          listenersMap.delete(uuid)
        }
      }
    }
  }

  #removeEventListener(el, record) {
    const records = isArray(record) ? record : [record]
    for (const record of records) {
      // 移除真实的监听器
      el.removeEventListener(record.type, record.handler, record.options)
      // 再移除掉listenersMap
      this.#cleanListenersMap(l => l === record)
    }
  }

  // 为元素生成uuid
  #uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  #closestUntil(el, selector, stopElm) {
    if (!el || !selector) return null

    while (el) {
      if (el.matches(selector)) return el
      if (el === stopElm || el === document.body) break
      el = el.parentElement
    }

    return null
  }

  // 强大的移除逻辑
  off(eventNames, handler) {
    for (const el of this.#elements) {
      if (isUndefined(eventNames)) {
        this.#forEachListener(el, record =>
          this.#removeEventListener(el, record),
        )
      } else {
        // 其它情况
        if (isString(eventNames)) {
          for (const eventName of this.#getEvents(eventNames)) {
            // 解析传入的事件名称
            const { type, namespace } = this.#parseEventName(eventName)

            let match = []

            this.#forEachListener(el, record => {
              if (type && namespace) {
                //既有事件名称又有命名空间
                if (
                  type === record.type &&
                  this.#matchNamespace(record.namespace, namespace)
                ) {
                  match.push(record)
                }
              } else if (type && isEmptyString(namespace)) {
                // 只有事件
                if (type === record.type) {
                  match.push(record)
                }
              } else {
                // 只有命名空间
                if (this.#matchNamespace(record.namespace, namespace)) {
                  match.push(record)
                }
              }

              // 传递了句柄,这是属于进一步过滤
              if (isFunction(handler)) {
                match = match.filter(item => item.listener === handler)
              }
            })

            this.#removeEventListener(el, match)
          }
        } else if (isPlainObject(eventNames)) {
          for (const [ev, fn] of Object.entries(eventNames)) {
            this.off(ev, fn)
          }
        } else if (isFunction(eventNames)) {
          this.#forEachListener(el, record => {
            if (record.listener === eventNames) {
              this.#removeEventListener(el, record)
            }
          })
        }
      }
    }
  }

  // 分发事件，支持命名空间
  trigger(eventNames, detail, options) {
    // 传参更灵活
    if (
      isPlainObject(detail) &&
      Object.keys(DomtifyEvent.DEFAULTS).some(key => Object.hasOwn(detail, key))
    ) {
      options = detail
      detail = undefined
    }

    for (const eventName of this.#getEvents(eventNames)) {
      const type = this.#parseEventName(eventName).type
      for (const element of this.#elements) {
        // 额外追加到事件对象的属性
        const attributes = {}

        detail = isFunction(detail)
          ? Reflect.apply(detail, attributes, [attributes])
          : detail

        const event = new DomtifyEvent(type, detail, options)
        // 再额外捆绑属性
        for (const [prop, value] of Object.entries(attributes)) {
          Reflect.set(event, prop, value)
        }

        Reflect.set(event, DATA_KEYS.SYM_EVENT_TYPE, eventName)
        element.dispatchEvent(event)
      }
    }
  }
}

export default Event
