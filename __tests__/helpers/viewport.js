export function mockViewport({ width = 1024, height = 768 } = {}) {
  Object.defineProperty(window, "innerWidth", {
    value: width,
    configurable: true,
  })

  Object.defineProperty(window, "innerHeight", {
    value: height,
    configurable: true,
  })

  Object.defineProperty(document.documentElement, "clientWidth", {
    value: width,
    configurable: true,
  })

  Object.defineProperty(document.documentElement, "clientHeight", {
    value: height,
    configurable: true,
  })
}
