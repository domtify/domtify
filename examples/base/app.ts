import { $, add, addClass, get, text } from '@/index'

// import $ from 'jquery'
$.use({ addClass, text, get, add })

// let res = $('li').addClass(function () {
//   console.log(this)

//   return 'ads'
// })

console.log($('li').add(document))

// for (const [index, el] of $('li').get()) {
//   console.log(index, el)
// }
