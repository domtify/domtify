import { isFunction, isUndefined } from 'is-what'

const getScrollValue = (
  el: HTMLElement | Window | Document,
  prop: 'scrollTop' | 'scrollLeft',
  isTop: boolean,
): number => {
  if (el === window) return isTop ? window.scrollY : window.scrollX

  if ('nodeType' in el) {
    if (el.nodeType === Node.DOCUMENT_NODE) {
      return (el as Document).scrollingElement![prop]
    }
    return (el as HTMLElement)[prop]
  }

  return 0
}

const setScrollValue = (
  el: HTMLElement | Window | Document,
  prop: 'scrollTop' | 'scrollLeft',
  isTop: boolean,
  value: number,
): void => {
  if (el === window) {
    window.scrollTo(
      isTop ? window.scrollX : value,
      isTop ? value : window.scrollY,
    )
  } else if ('nodeType' in el) {
    if (el.nodeType === Node.DOCUMENT_NODE) {
      ;(el as Document).scrollingElement![prop] = value
    } else {
      ;(el as HTMLElement)[prop] = value
    }
  }
}

export const scrollTo =
  (direction: 'top' | 'left') => (value?: any) => (els: HTMLElement[]) => {
    const isTop = direction === 'top'
    const prop = isTop ? 'scrollTop' : 'scrollLeft'

    // getter
    if (isUndefined(value)) {
      const el = els.at(0)
      return el ? getScrollValue(el, prop, isTop) : undefined
    }

    // setter
    for (const [index, element] of els.entries()) {
      const oldValue = getScrollValue(element, prop, isTop)
      const newValue = isFunction(value)
        ? value.call(element, index, oldValue)
        : value

      setScrollValue(element, prop, isTop, newValue)
    }

    return els
  }
