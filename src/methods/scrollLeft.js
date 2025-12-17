import { scrollTo } from "@/utils/scrollTo.js"

export const scrollLeft = (value) => (els) => scrollTo(els, value, "left")
