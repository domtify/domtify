import { domtify } from "@/core.js"
import { isFunction } from "is-what"

const DEFAULT = {
  leading: true,
  trailing: true,
}

import "./debounce.js"

domtify.throttle = function (func, wait, options = {}) {
  if (!isFunction(func)) {
    throw new TypeError("Expected a function")
  }
  const { leading, trailing } = { ...DEFAULT, ...options }

  return domtify.debounce(func, wait, {
    leading: leading,
    maxWait: wait,
    trailing: trailing,
  })
}
