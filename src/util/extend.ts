import { isBoolean, isFunction, isAnyObject, isNull } from 'is-what'

const merge = (target, src, deep, seen) => {
  // 避免 null/undefined
  if (src == null) return target

  // 循环引用检测
  const cached = seen.get(src)
  if (cached) {
    return cached
  }
  seen.set(src, target)

  // 只获取自身属性 (包括 Symbol)
  const keys = Reflect.ownKeys(src)

  for (const key of keys) {
    const value = src[key]

    if (deep && isAnyObject(value)) {
      let targetVal = target[key]

      // 避免重复创建空对象/数组
      if (!isAnyObject(targetVal)) {
        targetVal = Array.isArray(value) ? [] : {}
      }

      target[key] = merge(targetVal, value, true, seen)
    } else {
      target[key] = value
    }
  }

  return target
}

const isUnextendable = val => {
  return isNull(val) || (!isAnyObject(val) && !isFunction(val))
}

export const extend = (...args) => {
  let deep = false
  if (isBoolean(args[0])) {
    deep = args.shift()
  }

  let target = args.shift()
  if (isUnextendable(target)) {
    throw new Error('extendee must be an object')
  }

  const seen = new WeakMap() // 记录已处理的源对象

  for (const src of args) {
    if (!isUnextendable(src)) {
      merge(target, src, deep, seen)
    }
  }

  return target
}
