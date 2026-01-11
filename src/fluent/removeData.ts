import { isArray, isMap, isString, isUndefined } from 'is-what'
import { DATA_KEY } from '@/constants/index.js'
import { toCamel } from '@/helpers/toCamel.js'

export const removeData = name => els => {
  for (const el of els) {
    if (isUndefined(name)) {
      // 删除全部
      Reflect.deleteProperty(el, DATA_KEY)
    } else {
      let keys = []
      if (isArray(name)) {
        keys = name
      } else {
        keys = isString(name)
          ? name.replace(/,/g, ' ').trim().split(/\s+/).filter(Boolean)
          : [name]
      }

      // 获取出来
      const map = Reflect.get(el, DATA_KEY)

      if (isMap(map)) {
        for (const k of keys) {
          map.delete(toCamel(k))
        }
        map.size
          ? Reflect.set(el, DATA_KEY, map)
          : Reflect.deleteProperty(el, DATA_KEY)
      }
    }
  }
  return els
}
