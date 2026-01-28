import { $, add, addClass, attr, get, text } from '@/index'

$.use({ addClass, text, get, add, attr })
// import $ from 'jquery'
// let res = $('li').addClass(function () {
//   console.log(this)

//   return 'ads'
// })

let res = $('li').attr({ a: 1 })

// for (const [index, el] of $('li').get()) {
//   console.log(index, el)
// }
