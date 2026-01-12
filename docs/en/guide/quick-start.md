# Quick Start

## Try It Online

You can try domtify directly on StackBlitz.

## Installation

::: code-group

```sh [npm]
$ npm add -D domtify
```

```sh [pnpm]
$ pnpm add -D domtify
```

```sh [yarn]
$ yarn add -D domtify
```

```sh [bun]
$ bun add -D domtify
```

:::

## Basic Usage

```js
import { dom, pipe, addClass, css, find, text, trace } from "domtify";
import { debounce } from "domtify/util";

const spanText = pipe(
  dom("#box"),
  addClass("active"),
  trace("after addClass:"), // trace logs the DOM data at this point in the pipeline
  css("color", "red"),
  find("span"),
  text()
);

pipe(
  dom(window),
  on(
    "resize",
    debounce(() => {
      // ...
    }, 300)
  )
);
```

## Browser Usage

Using domtify in the browser is very straightforward.
Just like using jQuery — simply replace `$` with `d`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>domtify demo</title>
  </head>
  <body>
    <div id="container">
      <p>Welcome to domtify!</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/domtify@latest/dist/domtify.min.js"></script>
    <script>
      d(() => {
        // Document is ready
        d("p").text("Hello, domtify!");
      });
    </script>
  </body>
</html>
```
