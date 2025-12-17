import { isUndefined } from "is-what"
import { get } from "./get.js"

export const eq = (index) => (els) =>
  ((v) => (isUndefined(v) ? [] : [v]))(get(index)(els))
