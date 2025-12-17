import { dimension } from "@/utils/dimension.js"

export const height = (value) => (els) =>
  dimension(els, "height", { mode: "content" }, value)
