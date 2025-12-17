export const empty = () => (els) => {
  for (const element of els) {
    element.replaceChildren()
  }
  return els
}
