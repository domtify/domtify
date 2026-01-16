import { isFunction, isUndefined } from 'is-what'

export const html = html => els => {
  // getter
  if (isUndefined(html)) {
    const el = els.at(0)
    return el?.innerHTML
  } else {
    // setter
    for (const [index, element] of els.entries()) {
      const newHtml = isFunction(html)
        ? html.call(element, index, element.innerHTML)
        : html

      if (newHtml) element.innerHTML = newHtml
    }
    return els
  }
}
