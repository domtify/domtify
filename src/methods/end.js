import { isInstanceOf } from "is-what"
import { fn, Domtify } from "@/core.js"

fn.end = function () {
  return isInstanceOf(this.prevObject, Domtify) ? this.prevObject : this
}
