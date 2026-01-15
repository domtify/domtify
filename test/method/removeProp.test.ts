import { beforeEach, describe, expect, it } from 'vitest'

import { dom } from '@/core/dom'
import { prop } from '@/method/prop'
import { removeProp } from '@/method/removeProp'

describe('removeProp', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <p></p>
    `
  })

  it('删除后应返回undefined', () => {
    let result = prop('foo', 'bar')(dom('p'))
    result = removeProp('foo')(result)
    result = prop('foo')(result)
    expect(result).toBeUndefined()
  })
})
