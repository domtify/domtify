import { isString } from "is-what"

export const removeProp = (propertyName) => (els) => {
  if (!isString(propertyName)) return els

  for (const element of els) {
    Reflect.deleteProperty(element, propertyName)
  }
  return els
}
