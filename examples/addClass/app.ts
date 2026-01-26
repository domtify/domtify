// import $ from 'jquery'

import $ from 'cash-dom'
import { addClass, pipe } from '@/index'

let rwe = $('.a')

let res
// 一个或者多个空格分割的字符串
// res = $('li').addClass('myClass yourClass')
// res = pipe('li', addClass('myClass yourClass'))

// 支持类名数组
// res = $('li').addClass(['myClass yourClass', 'foo'])
// res = pipe('li', addClass(['myClass yourClass', 'foo']))

// 数组中的边缘情况(它内部会直接把null false都转换成字符串)
// @ts-ignore
// res = $('li').addClass(['myClass yourClass', 'foo', null, false, undefined])
// @ts-ignore
// res = pipe('li', addClass(['myClass yourClass', 'foo', null, false, undefined]))

// 函数,返回字符串
// res = $('li').addClass(function (index, currentClassName) {
//   console.log(this, currentClassName)
//   return `item-${index}`
// })
// res = pipe(
//   'li',
//   addClass((el, index, currentClassName) => {
//     console.log(el, currentClassName)
//     return `item-${index}`
//   }),
// )

// @ts-ignore 函数，返回数组
// res = $('li').addClass(function (index) {
//   console.log(this)
//   return [`item-${index}`, 'abc', 'hello domtify']
// })

res = $('li').addClass('a')

res = pipe(
  'li',
  addClass((el, index) => {
    console.log(el)
    return [`item-${index}`, 'abc', 'hello domtify']
  }),
)

console.log(res)
