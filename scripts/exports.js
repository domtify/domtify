import fs from "fs"

const files = fs.readdirSync("./src/methods")

const code = files
  .filter((f) => f.endsWith(".js"))
  .map((f) => `export * from './methods/${f}'`)
  .join("\n")

fs.writeFileSync("./src/methods.js", code)

const files2 = fs.readdirSync("./src/utilities")
const code2 = files2
  .filter((f) => f.endsWith(".js"))
  .map((f) => `export * from './utilities/${f}'`)
  .join("\n")

fs.writeFileSync("./src/utilities.js", code2)
