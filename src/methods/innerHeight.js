import { dimension } from "@/utils/dimension.js"

export const innerHeight = (value) => (els) =>
  dimension(els, "height", { mode: "inner" }, value)
