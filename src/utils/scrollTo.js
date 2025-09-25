import { isFunction, isUndefined } from "is-what"

function scrollTo(ctx, value, direction) {
  const isTop = direction === "top"
  const prop = isTop ? "scrollTop" : "scrollLeft"

  if (isUndefined(value)) {
    //  getter
    const element = ctx.toArray().at(0)
    if (!element) return undefined
    if (element === window) return isTop ? window.scrollY : window.scrollX
    if (element.nodeType === Node.DOCUMENT_NODE) {
      return element.scrollingElement[prop]
    }
    return element[prop]
  } else {
    // setter
    for (const [index, element] of ctx.toArray().entries()) {
      let newValue = value

      if (isFunction(value)) {
        // 如果是函数
        let oldValue
        if (element === window) {
          oldValue = isTop ? window.scrollY : window.scrollX
        } else if (element.nodeType === Node.DOCUMENT_NODE) {
          oldValue = element.scrollingElement[prop]
        } else {
          oldValue = element[prop]
        }
        newValue = Reflect.apply(value, element, [index, oldValue])
      }

      if (element === window) {
        window.scrollTo(
          isTop ? window.scrollX : newValue,
          isTop ? newValue : window.scrollY,
        )
      } else if (element.nodeType === Node.DOCUMENT_NODE) {
        element.scrollingElement[prop] = newValue
      } else {
        element[prop] = newValue
      }
    }
    return ctx
  }
}

export { scrollTo }
