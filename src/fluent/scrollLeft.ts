import { scrollTo } from '@/helpers/scrollTo.js'

export const scrollLeft = value => els => scrollTo(els, value, 'left')
