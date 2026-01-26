import { $ } from '@/index'

// import $ from 'jquery'

for (const [index, el] of Object.entries($('li'))) {
  console.log(index, el)
}
