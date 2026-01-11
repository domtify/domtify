import { filter } from './filter'

export const is = selector => els => filter(selector)(els).length > 0
