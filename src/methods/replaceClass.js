import { isFunction, isString, isPlainObject, isInstanceOf } from "is-what"

const callMaybeFunction = (value, el, index) =>
  isFunction(value) ? value.call(el, index, el?.classList?.value ?? "") : value
const resolveReplaceMap = (oldClassName, newClassName, el, index) => {
  if (isString(oldClassName)) {
    const v = callMaybeFunction(newClassName, el, index)
    return isString(v) ? { [oldClassName]: v } : {}
  }

  if (isPlainObject(oldClassName)) {
    return oldClassName
  }

  if (isFunction(oldClassName)) {
    const r = callMaybeFunction(oldClassName, el, index)
    return isPlainObject(r) ? r : {}
  }

  return {}
}
export const replaceClass = (oldClassName, newClassName) => (els) => {
  for (const [i, el] of els.entries()) {
    if (!isInstanceOf(el, Element)) continue

    const map = resolveReplaceMap(oldClassName, newClassName, el, i)

    for (const [from, to] of Object.entries(map)) {
      if (el.classList.contains(from)) {
        el.classList.replace(from, to)
      }
    }
  }

  return els
}
