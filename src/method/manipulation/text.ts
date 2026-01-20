import { isFunction, isUndefined } from 'is-what'

export const text = text => els => {
  if (isUndefined(text)) {
    //Getter:
    return els.map(el => el.textContent).join('')
  } else {
    // Setter:
    for (const [index, el] of els.entries()) {
      el.textContent = String(
        isFunction(text) ? text.call(el, index, el.textContent) : text,
      )
    }
    return els
  }
}
