import { describe, it, expect, beforeEach, vi } from 'vitest'

import { dom } from '@/core.js'
import { map } from '@/methods/map.js'

describe('map', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <form method="post" action="">
      <fieldset>
        <div>
          <label for="two">2</label>
          <input type="checkbox" value="2" id="two" name="number[]" />
        </div>
        <div>
          <label for="four">4</label>
          <input type="checkbox" value="4" id="four" name="number[]" />
        </div>
        <div>
          <label for="six">6</label>
          <input type="checkbox" value="6" id="six" name="number[]" />
        </div>
        <div>
          <label for="eight">8</label>
          <input type="checkbox" value="8" id="eight" name="number[]" />
        </div>
      </fieldset>
    </form>
    `
  })

  it('返回input的id属性值数组', () => {
    const checkboxs = map(function () {
      return this.id // this === el
    })(dom(`input[type="checkbox"]`))

    expect(checkboxs).toEqual(['two', 'four', 'six', 'eight'])
  })

  it('map内部的话返回数组应该展开', () => {
    const checkboxs = map(() => [1, 2])(dom(`input[type="checkbox"]`))
    expect(checkboxs).toEqual([1, 2, 1, 2, 1, 2, 1, 2])
  })

  it('undefined/null 则不返回任何值', () => {
    const checkboxs = map(() => null)(dom(`input[type="checkbox"]`))
    expect(checkboxs).toEqual([])
  })

  it('回调参数index,element测试', () => {
    const mock = vi.fn(function (i, el) {
      return el.id
    })
    map(mock)(dom(`input[type="checkbox"]`))
    expect(mock).toHaveBeenCalledTimes(4)
    expect(mock.mock.calls[0][0]).toBe(0) // index
    expect(mock.mock.calls[0][1]).toBeInstanceOf(HTMLElement) // element
  })
})
