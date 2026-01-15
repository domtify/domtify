import {
  isArray,
  isFunction,
  isPlainObject,
  isString,
  isUndefined,
} from 'is-what'

function getCss(el, property) {
  const computed = getComputedStyle(el)

  if (isString(property)) {
    const val = computed.getPropertyValue(property)
    return val ? val.trim() : undefined
  }

  if (isArray(property)) {
    const result = {}
    for (const prop of property) {
      const val = computed.getPropertyValue(prop)
      result[prop] = val ? val.trim() : undefined
    }
    return result
  }
}

function normalizeValue(val) {
  if (isString(val) && val.endsWith('!important')) {
    return {
      value: val.replace(/\s*!important\s*$/, ''),
      priority: 'important',
    }
  }
  return { value: val, priority: '' }
}

function setCss(el, index, property, value, priority) {
  if (isString(property)) {
    let newValue = value

    if (isFunction(value)) {
      const oldValue = getComputedStyle(el).getPropertyValue(property).trim()
      newValue = value.call(el, index, oldValue)
    }

    el.style.setProperty(property, newValue, priority)
  } else if (isPlainObject(property)) {
    const computed = getComputedStyle(el)

    for (const [key, val] of Object.entries(property)) {
      let finalValue = val

      if (isFunction(val)) {
        const oldValue = computed.getPropertyValue(key).trim()
        finalValue = val.call(el, index, oldValue)
      }

      const normalized = normalizeValue(finalValue)
      el.style.setProperty(key, normalized.value, normalized.priority)
    }
  }
}

export const css = (property, value, priority) => els => {
  if (isUndefined(value) && !isPlainObject(property)) {
    const el = els[0]
    if (!el) return undefined
    return getCss(el, property)
  }

  for (const [index, el] of els.entries()) {
    setCss(el, index, property, value, priority)
  }
  return els
}
