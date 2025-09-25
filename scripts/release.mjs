import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"
import { execa } from "execa"
import c from "picocolors"
import prompts from "prompts"
import semver from "semver"

const { version: currentVersion } = createRequire(import.meta.url)(
  "../package.json",
)
const { inc: _inc, valid } = semver

const versionIncrements = ["patch", "minor", "major"]

const tags = ["latest", "next"]

const dir = fileURLToPath(new URL(".", import.meta.url))
const inc = (i) => _inc(currentVersion, i)
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: "inherit", ...opts })
const step = (msg) => console.log(c.cyan(msg))

async function main() {
  let targetVersion

  //准备选项
  const versions = versionIncrements
    .map((i) => `${i} (${inc(i)})`)
    .concat(["custom"])

  const { release } = await prompts({
    type: "select",
    name: "release",
    message: "Select release type",
    choices: versions,
  })

  if (release === 3) {
    //选择了自定义
    targetVersion = (
      await prompts({
        type: "text",
        name: "version",
        message: "Input custom version",
        initial: currentVersion,
      })
    ).version
  } else {
    targetVersion = versions[release].match(/\((.*)\)/)[1]
  }

  if (!valid(targetVersion)) {
    //验证是否有效版本号
    throw new Error(`Invalid target version: ${targetVersion}`)
  }

  const { tag } = await prompts({
    type: "select",
    name: "tag",
    message: "Select tag type",
    choices: tags,
  })

  const { yes: tagOk } = await prompts({
    type: "confirm",
    name: "yes",
    message: `Releasing v${targetVersion} on ${tags[tag]}. Confirm?`,
  })

  if (!tagOk) {
    return
  }

  // 更新版本号
  step("\nUpdating the package version...")

  await run("npm", [
    "version",
    targetVersion,
    "--no-git-tag-version",
    "--no-commit-hooks",
    "--allow-same-version",
  ])

  //生成变更日志
  step("\nGenerating the changelog...")
  await run("npm", ["run", "changelog"])
  await run("npx", [
    "prettier",
    "--config",
    "configs/prettier.config.mjs",
    "--write",
    "CHANGELOG.md",
  ])

  const { yes: changelogOk } = await prompts({
    type: "confirm",
    name: "yes",
    message: `Changelog generated. Does it look good?`,
  })

  if (!changelogOk) {
    return
  }

  // 提交更改和创建tag
  step("\nCommitting changes...")
  await run("git", ["add", "CHANGELOG.md", "package.json", "package-lock.json"])
  await run("git", [
    "commit",
    "--no-verify",
    "-s",
    "-m",
    `release: v${targetVersion}`,
  ])
  await run("git", ["tag", `v${targetVersion}`])

  // 推送到远程仓库
  step("\nPushing to GitHub...")
  await run("git", ["push", "origin", `refs/tags/v${targetVersion}`])
  await run("git", ["push", "--no-verify"])
}

main().catch((err) => console.error(err))
