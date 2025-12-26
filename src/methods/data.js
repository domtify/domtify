import {
  isUndefined,
  isPlainObject,
  isString,
  isNull,
  isFullString,
} from "is-what"
import { DATA_KEY } from "@/constants/index.js"
import { toCamel } from "@/utils/toCamel.js"

const parseDataValue = (val) => {
  if (val === "true") return true
  if (val === "false") return false
  if (isNull(val)) return null
  if (isFullString(val) && !isNaN(val)) return Number(val)
  try {
    return JSON.parse(val)
  } catch {
    return val
  }
}

export const data = (key, value) => (els) => {
  const firstEl = els.at(0)
  if (!firstEl) return

  // 如果元素还没有专属 map，就给它创建一个
  let store = Reflect.get(firstEl, DATA_KEY)
  if (!store) {
    store = new Map()
    for (const el of els) {
      Reflect.set(el, DATA_KEY, store)
    }
  }

  // getter
  if (isUndefined(value) && !isPlainObject(key)) {
    let data = {
      ...firstEl.dataset,
      ...Object.fromEntries(store),
    }

    // 智能解析
    for (const [prop, val] of Object.entries(data)) {
      Reflect.set(data, prop, parseDataValue(val))
    }

    if (!isUndefined(key)) {
      data = isString(key) ? Reflect.get(data, toCamel(key)) : undefined
    }

    return data
  } else {
    // setter
    if (isPlainObject(key)) {
      for (const [prop, val] of Object.entries(key)) {
        store.set(toCamel(prop), val)
      }
    } else if (isString(key)) {
      store.set(toCamel(key), value)
    }

    return els
  }
}
