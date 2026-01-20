import { isPlainObject, isString, isUndefined } from 'is-what'
import { DATA_KEY } from '@/core/constant'
import { parseDataValue } from '@/helpers/parseDataValue'
import { toCamel } from '@/helpers/toCamel'

type DataValue = any
type DataStore = Map<string, DataValue>
type DataKey = string | Record<string, any>

export const data = (key?: DataKey, value?: DataValue) => (els: Node[]) => {
  const firstEl = els.at(0) as HTMLHtmlElement
  if (!firstEl) return

  // 如果元素还没有专属 map，就给它创建一个
  let store: DataStore = Reflect.get(firstEl, DATA_KEY)
  if (!store) {
    store = new Map()
    for (const el of els) {
      Reflect.set(el, DATA_KEY, store)
    }
  }

  // getter
  if (isUndefined(value) && !isPlainObject(key)) {
    const data: Record<string, any> = {
      ...firstEl.dataset,
      ...Object.fromEntries(store),
    }

    // 智能解析
    for (const [prop, val] of Object.entries(data)) {
      Reflect.set(data, prop, parseDataValue(val))
    }

    if (!isUndefined(key)) {
      return isString(key) ? data[toCamel(key)] : undefined
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
