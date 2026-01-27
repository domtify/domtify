import { moola } from '@/core/moola'
import * as methods from '@/method'

moola.use(methods)

window.$ = moola

export default moola
