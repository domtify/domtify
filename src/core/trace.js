export const trace = (tag) => (v) => {
  console.log(tag, v)
  return v
}
