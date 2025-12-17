import { describe, it, expect, beforeEach, vi } from "vitest"

import { el } from "@/core.js"
import { removeProp } from "@/methods/removeProp.js"
import { prop } from "@/methods/prop.js"

describe("removeProp", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <p></p>
    `
  })

  it("删除后应返回undefined", () => {
    let result = prop("foo", "bar")(el("p"))
    result = removeProp("foo")(result)
    result = prop("foo")(result)
    expect(result).toBeUndefined()
  })
})
