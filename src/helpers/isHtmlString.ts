import { isString } from 'is-what'

export const isHtmlString = (str: unknown): str is string =>
  isString(str) && str.trim().startsWith('<')
