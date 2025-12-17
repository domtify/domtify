import { dimension } from "@/utils/dimension.js"

export const width = (value) => (els) =>
  dimension(els, "width", { mode: "content" }, value)
