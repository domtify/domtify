import { isString, isUndefined, isFunction, isArray } from "is-what"

export const resolveClasses = (element, index, className, state) => {
  let value = isFunction(className)
    ? className.call(element, index, element?.classList?.value ?? "", state)
    : isUndefined(className)
      ? element.classList.value
      : className

  if (isArray(value)) {
    return value.flatMap((v) => String(v).split(" "))
  }

  if (isString(value)) {
    return value.split(" ")
  }

  return []
}
