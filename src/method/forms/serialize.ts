import { eachFormEntry } from '@/helpers/eachFormEntry'

export const serialize = () => els => {
  const params = new URLSearchParams()

  eachFormEntry(els, ([name, value]) => {
    params.append(name, value)
  })

  return params.toString()
}
