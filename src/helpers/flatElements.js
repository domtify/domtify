import { isString } from "is-what"
import { dom } from "@/core.js"

export const flatElements = (args, filterStrings = true) =>
  [args]
    .flat(Infinity)
    .flatMap((v) => (filterStrings && isString(v) ? [v] : dom(v)))
