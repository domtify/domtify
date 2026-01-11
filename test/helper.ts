function testOuterHeight(label, getHeight) {
  it(label, () => {
    mockViewport({ height: 800 })
    expect(getHeight()).toBe(800)

    mockViewport({ height: 600 })
    expect(getHeight()).toBe(600)
  })
}

export function mockViewport({ width = 1024, height = 768 } = {}) {
  Object.defineProperty(window, 'innerWidth', {
    value: width,
    configurable: true,
  })

  Object.defineProperty(window, 'innerHeight', {
    value: height,
    configurable: true,
  })

  Object.defineProperty(document.documentElement, 'clientWidth', {
    value: width,
    configurable: true,
  })

  Object.defineProperty(document.documentElement, 'clientHeight', {
    value: height,
    configurable: true,
  })
}
