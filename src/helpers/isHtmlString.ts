import { isString } from 'is-what'

export const isHtmlString = str => isString(str) && str.trim().startsWith('<')
