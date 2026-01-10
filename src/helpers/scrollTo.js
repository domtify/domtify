import { isFunction, isUndefined } from "is-what"

const getScrollValue = (el, prop, isTop) => {
  if (el === window) return isTop ? window.scrollY : window.scrollX
  if (el.nodeType === Node.DOCUMENT_NODE) return el.scrollingElement[prop]
  return el[prop]
}

const setScrollValue = (el, prop, isTop, value) => {
  if (el === window) {
    window.scrollTo(
      isTop ? window.scrollX : value,
      isTop ? value : window.scrollY,
    )
  } else if (el.nodeType === Node.DOCUMENT_NODE) {
    el.scrollingElement[prop] = value
  } else {
    el[prop] = value
  }
}

export const scrollTo = (els, value, direction) => {
  const isTop = direction === "top"
  const prop = isTop ? "scrollTop" : "scrollLeft"

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
