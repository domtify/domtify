import { execSync } from 'node:child_process'
import fs, { globSync } from 'node:fs'
import path from 'node:path'

interface ExportOptions {
  pattern: string
  outFile: string
  exportName: string
  baseDir: string
  ignore?: string[]
}

function genExport({
  pattern,
  outFile,
  exportName,
  baseDir,
  ignore = ['**/index.ts', '**/methods.ts'],
}: ExportOptions) {
  const files = globSync(pattern, { exclude: ignore })

  const exports = files.map(file => {
    //  计算相对于 baseDir 的路径
    let relative = path.relative(baseDir, file)

    //  去掉扩展名
    relative = relative.replace(/\.[^.]+$/, '')

    //  统一为 POSIX 路径（避免 Windows 反斜杠）
    relative = relative.split(path.sep).join('/')

    return `export * from '${exportName}/${relative}'`
  })

  fs.writeFileSync(outFile, exports.join('\n'))

  execSync(`npx biome check --write ${outFile}`, {
    stdio: 'inherit',
  })
}

genExport({
  exportName: '@/method',
  baseDir: 'src/method',
  pattern: 'src/method/**/*.ts',
  outFile: 'src/method/index.ts',
})

genExport({
  exportName: '@/util',
  baseDir: 'src/util',
  pattern: 'src/util/**/*.ts',
  outFile: 'src/util/index.ts',
})
