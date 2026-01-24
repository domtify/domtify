import { addClass, html, pipe, text, trace } from '@/index'

// let res = dom('li', addClass('a'), [addClass('b'), trace('aa')], els => {
//   return els
// })

let res3 = pipe(
  'li',
  text((el, index, texta) => {
    console.log(el)
    console.log(index)
    console.log(texta)
    return 'aaaadd'
  }),
)

console.log(res3)
