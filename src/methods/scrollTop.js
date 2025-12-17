import { scrollTo } from "@/utils/scrollTo.js"

export const scrollTop = (value) => (els) => scrollTo(els, value, "top")
