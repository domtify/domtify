import { isFunction } from "is-what"
import { domtify } from "@/core.js"

declare global {
  interface DomtifyStatic {
    isFunction(payload: unknown): boolean
  }
}

domtify.isFunction = isFunction
