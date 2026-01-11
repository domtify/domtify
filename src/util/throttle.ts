import { isFunction } from 'is-what'
import { debounce } from './debounce'

const DEFAULT = {
  leading: true,
  trailing: true,
}

export const throttle = (func, wait, options = {}) => {
  if (!isFunction(func)) {
    throw new TypeError('Expected a function')
  }
  const { leading, trailing } = { ...DEFAULT, ...options }

  return debounce(func, wait, {
    leading: leading,
    maxWait: wait,
    trailing: trailing,
  })
}
