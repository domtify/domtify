# 介绍

<div class="badge">

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://www.lujiahao.com/sponsor)
[![npm](https://img.shields.io/npm/v/domtify)](https://www.npmjs.com/package/domtify)
[![cdn version](https://data.jsdelivr.com/v1/package/npm/domtify/badge)](https://www.jsdelivr.com/package/npm/domtify)
[![codecov](https://codecov.io/gh/domtify/domtify/graph/badge.svg?token=G2P1AI238H)](https://codecov.io/gh/domtify/domtify)
[![Test](https://img.shields.io/github/actions/workflow/status/domtify/domtify/test.yml?label=Unit%20Test&branch=main)](https://github.com/domtify/domtify/actions/workflows/test.yml)

</div>

---

一个现代化的真正支持单个方法树摇(Tree-shaking)优化的dom操作库,与[jQuery](https://github.com/jquery/jquery)
有着类似的API。

> [!NOTE]
> 和jQuery完全保持一致不是目标，可能会存在细微的差别(我把这部分称为优化),如果您要从 `jQuery` 迁移，请务必阅读我们的[迁移指南](./migration.md)。

## 使用场景

如果你热衷于开发JavaScript插件，那么有时难免会有操作dom的情况,自从[IE浏览器停止支持](https://blogs.windows.com/windowsexperience/2021/05/19/the-future-of-internet-explorer-on-windows-10-is-in-microsoft-edge/)后,哪怕现代化浏览器的API已经足够强大,但是用户体验方面还没有`jQuery`那么舒服和优雅(**链式方法**、**事件绑定和委托**),那么此时就会陷入非常尴尬的境地,你想使用`jQuery`提供的非常便利的API,但是又不想让你的插件依赖`jQuery`,那么此时`domtify`它在向你招手,它可以让你变得不那么痛苦,既可以享受到`jQuery`类似的API,同时不会让您的插件极度膨胀。这也是我设计`domtify`的主要目的,因为我自己就是一个喜欢js开发插件接近疯狂的人,如果您和我一样,那么就尽情享受`domtify`吧😉。

## 包名的由来

包名domtify的灵感来源于基于vue的ui组件库[vuetify](https://github.com/vuetifyjs/vuetify)

- vuetify = vue+tify
- domtify = dom+tify

分享包名的由来只是为了能让您的印象更加深刻。

## 浏览器支持

具体可以查看[.browserslistrc](https://github.com/domtify/domtify/blob/main/.browserslistrc)文件。

## 变更日志

每个版本的详细更改记录在[CHANGELOG.md](https://github.com/domtify/domtify/blob/main/CHANGELOG.md)中.

## License

[MIT](https://github.com/domtify/domtify/blob/main/LICENSE)

Copyright (c) 2025-present, ajiho
