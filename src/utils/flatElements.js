import { isInstanceOf, isString } from "is-what"
import { domtify, Domtify } from "@/core.js"

// 处理参数
export const flatElements = (args, filterStrings = true) => {
  args = isInstanceOf(args, Domtify) ? args.toArray() : [args]

  return args.flat(Infinity).flatMap((node) => {
    if (filterStrings === true && isString(node)) {
      return node
    }
    return domtify(node).toArray()
  })
}
