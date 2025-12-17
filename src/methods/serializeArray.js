import { eachFormEntry } from "@/utils/eachFormEntry.js"

export const serializeArray = () => (els) => {
  const params = []

  eachFormEntry(els, ([name, value]) => {
    params.push({ name, value })
  })

  return params
}
