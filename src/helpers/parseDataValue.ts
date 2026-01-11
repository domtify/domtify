import { isFullString, isNull } from 'is-what'

export const parseDataValue = val => {
  if (val === 'true') return true
  if (val === 'false') return false
  if (isNull(val)) return null
  if (isFullString(val) && !isNaN(val)) return Number(val)
  try {
    return JSON.parse(val)
  } catch {
    return val
  }
}
