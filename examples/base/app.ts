import { $, addClass, text } from '@/index'

// import $ from 'jquery'

// for (const [index, el] of Object.entries($('li'))) {
//   console.log(index, el)
// }

// $.use({ addClass, text })

let res = $('li').addClass('a').text()

console.log(res)
