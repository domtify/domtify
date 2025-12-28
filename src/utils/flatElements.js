import { isString } from "is-what"
import { query } from "@/core.js"

export const flatElements = (args, filterStrings = true) =>
  [args]
    .flat(Infinity)
    .flatMap((v) => (filterStrings && isString(v) ? [v] : query(v)))
