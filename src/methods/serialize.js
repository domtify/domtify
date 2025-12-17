import { eachFormEntry } from "@/utils/eachFormEntry.js"

export const serialize = () => (els) => {
  const params = new URLSearchParams()

  eachFormEntry(els, ([name, value]) => {
    params.append(name, value)
  })

  return params.toString()
}
