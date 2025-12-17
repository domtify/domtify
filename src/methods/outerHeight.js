import { dimension } from "@/utils/dimension.js"

export const outerHeight =
  (value, includeMargin = false) =>
  (els) =>
    dimension(els, "height", { mode: "outer", includeMargin }, value)
