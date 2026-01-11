import fs, { globSync } from 'node:fs'
import path from 'node:path'

interface ExportOptions {
  pattern: string
  outFile: string
  exportName: string
  ignore?: string[]
}

function genExport({
  pattern = '**/*.js',
  outFile,
  exportName,
  ignore = ['**/index.ts', '**/methods.ts'],
}: ExportOptions) {
  let files = globSync(pattern, { exclude: ignore })

  files = files.map(f => path.basename(f))

  const fileCnt = []
  for (const file of files) {
    fileCnt.push(`export * from '${exportName}/${file}'`)
  }
  fs.writeFileSync(outFile, fileCnt.join('\n'))
}

genExport({
  exportName: '@/fluent',
  pattern: 'src/fluent/*.js',
  outFile: 'src/fluent/methods.ts',
})
genExport({
  exportName: '@/util',
  pattern: 'src/util/*.js',
  outFile: 'src/util/index.ts',
})
