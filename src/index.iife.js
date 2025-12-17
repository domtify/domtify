import { el } from "./core.js"
import * as methods from "./methods.js"
import * as utilities from "./utilities.js"

const $ = (selector, cxt) => {
  const state = { els: el(selector, cxt) }

  return new Proxy(() => {}, {
    get(_, prop) {
      return (...args) => {
        const fn = methods[prop]

        if (!fn) {
          throw new Error(`Unknown method: ${prop}`)
        }

        const result = fn(...args)(state.els)

        if (prop === "get") return result
        if (!Array.isArray(result)) return result

        state.els = result
        return $(result)
      }
    },
  })
}

// 注册助手
Object.assign($, utilities)

export default $
