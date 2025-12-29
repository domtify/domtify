import { isUndefined, isPlainObject, isString } from "is-what"
import { DATA_KEY } from "@/constants/index.js"
import { toCamel } from "@/utils/toCamel.js"
import { parseDataValue } from "@/utils/parseDataValue.js"

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
  }
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
