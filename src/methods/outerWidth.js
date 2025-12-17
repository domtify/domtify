import { dimension } from "@/utils/dimension.js"

export const outerWidth =
  (value, includeMargin = false) =>
  (els) =>
    dimension(els, "width", { mode: "outer", includeMargin }, value)
