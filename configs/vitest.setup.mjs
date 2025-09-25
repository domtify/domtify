import { expect } from "vitest"

// 该函数只是为了兼容无头模式
globalThis.expectPixelEqual = (actual, expected, tolerance = 1) => {
  const actualNum = parseFloat(actual)
  const expectedNum = parseFloat(expected)
  expect(Math.abs(actualNum - expectedNum)).toBeLessThan(tolerance)
}
