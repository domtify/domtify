import { isArray, isMap, isString, isUndefined } from "is-what"
import { fn } from "@/core.js"
import Constants from "@/constants/index.js"
import { toCamel } from "@/utils/data.js"

import "./toArray.js"

fn.removeData = function (name) {
  for (const el of this.toArray()) {
    if (isUndefined(name)) {
      // 删除全部
      Reflect.deleteProperty(el, Constants.DATA_KEY)
    } else {
      let keys = []
      if (isArray(name)) {
        keys = name
      } else {
        keys = isString(name)
          ? name.replace(/,/g, " ").trim().split(/\s+/).filter(Boolean)
          : [name]
      }

      // 获取出来
      const map = Reflect.get(el, Constants.DATA_KEY)

      if (isMap(map)) {
        for (const k of keys) {
          map.delete(toCamel(k))
        }
        map.size
          ? Reflect.set(el, Constants.DATA_KEY, map)
          : Reflect.deleteProperty(el, Constants.DATA_KEY)
      }
    }
  }
  return this
}
