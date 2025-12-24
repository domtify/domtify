import fs from "fs"
import path from "path"

function generateIndex({ dir, outFile, ext = ".js" }) {
  const absDir = path.resolve(dir)

  const code = fs
    .readdirSync(absDir)
    .filter((f) => f.endsWith(ext))
    .sort()
    .map((f) => `export * from './${dir.replace(`./src/`, "")}/${f}'`)
    .join("\n")

  fs.writeFileSync(path.resolve(outFile), code + "\n")
}

// methods
generateIndex({
  dir: "./src/methods",
  outFile: "./src/methods.js",
})

// utilities
generateIndex({
  dir: "./src/utilities",
  outFile: "./src/utilities.js",
})
