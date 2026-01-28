import { $, add, addClass, attr, get, prop, text } from '@/index'

$.use({ addClass, text, get, add, attr, prop })
// import $ from 'jquery'
// let res = $('li').addClass(function () {
//   console.log(this)

//   return 'ads'
// })

$(window).prop('a', 1)
let res = $(window).prop('a')

console.log(res)

// for (const [index, el] of $('li').get()) {
//   console.log(index, el)
// }
