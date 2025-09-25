import { describe, it, expect, beforeEach, vi } from "vitest"

// 导入核心
import { domtify as d } from "@/core.js"

// 按需导入
import "@/methods/serialize.js"

describe("serialize", () => {
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

  it("遍历所有元素", () => {
    const result = d("form").serialize()
    expect(result).toBe(
      "email=123%40qq.com&single=Single&multiple=Multiple&multiple=Multiple3&check=check2&radio=radio1",
    )
  })
})
