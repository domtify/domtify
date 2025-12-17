import { dimension } from "@/utils/dimension.js"

export const innerWidth = (value) => (els) =>
  dimension(els, "width", { mode: "inner" }, value)
