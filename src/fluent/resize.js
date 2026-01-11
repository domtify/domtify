import { isFunction, isNull, isPlainObject } from 'is-what'

const Default = {
  // 立即运行
  immediate: false,
  // 监听类型,支持width、height
  type: 'both',
}

const SYM_OBSERVER_KEY = Symbol('observer')

export const resize = (callback, options) => els => {
  if (isFunction(callback)) {
    const config = { ...Default, ...(isPlainObject(options) ? options : {}) }
    const lastSize = new WeakMap()

    for (const [index, element] of els.entries()) {
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          const prev = lastSize.get(element)
          const first = !prev

          if (!config.immediate && first) {
            lastSize.set(element, { width, height })
            continue
          }

          if (
            !prev ||
            (config.type === 'width' && width !== prev.width) ||
            (config.type === 'height' && height !== prev.height) ||
            (config.type === 'both' &&
              (width !== prev.width || height !== prev.height))
          ) {
            callback.call(element, index, entry)
          }

          lastSize.set(element, { width, height })
        }
      })

      observer.observe(element)
      Reflect.set(element, SYM_OBSERVER_KEY, observer)
    }
  }

  if (isNull(callback)) {
    for (const element of els) {
      const observer = Reflect.get(element, SYM_OBSERVER_KEY)
      if (observer) {
        observer.disconnect()
        Reflect.deleteProperty(element, SYM_OBSERVER_KEY)
      }
    }
  }

  return els
}
