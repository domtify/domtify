import { beforeEach, describe, expect, it, vi } from 'vitest'

import { dom } from '@/core/dom'
import { serializeArray } from '@/method/serializeArray'

describe('serializeArray', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          name="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value="123@qq.com"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <form>
      <select name="single">
        <option>Single</option>
        <option>Single2</option>
      </select>

      <br />
      <select name="multiple" multiple="multiple">
        <option selected="selected">Multiple</option>
        <option>Multiple2</option>
        <option selected="selected">Multiple3</option>
      </select>

      <br />
      <input type="checkbox" name="check" value="check1" id="ch1" />
      <label for="ch1">check1</label>
      <input
        type="checkbox"
        name="check"
        value="check2"
        checked="checked"
        id="ch2"
      />
      <label for="ch2">check2</label>

      <br />
      <input
        type="radio"
        name="radio"
        value="radio1"
        checked="checked"
        id="r1"
      />
      <label for="r1">radio1</label>
      <input type="radio" name="radio" value="radio2" id="r2" />
      <label for="r2">radio2</label>
    </form>
    `
  })

  it('得到序列化数据', () => {
    const res = serializeArray()(dom('form'))

    expect(res).toEqual([
      {
        name: 'email',
        value: '123@qq.com',
      },
      {
        name: 'single',
        value: 'Single',
      },
      {
        name: 'multiple',
        value: 'Multiple',
      },
      {
        name: 'multiple',
        value: 'Multiple3',
      },
      {
        name: 'check',
        value: 'check2',
      },
      {
        name: 'radio',
        value: 'radio1',
      },
    ])
  })
})
