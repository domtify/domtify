function testOuterHeight(label, getHeight) {
  it(label, () => {
    mockViewport({ height: 800 })
    expect(getHeight()).toBe(800)

    mockViewport({ height: 600 })
    expect(getHeight()).toBe(600)
  })
}
