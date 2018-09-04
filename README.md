# UnassertPlugin
A fuse-box plugin for unassert: Encourages programming with assertions by providing tools to compile them away.

## Description

`UnassertPlugin` is a [fuse-box](https://github.com/fuse-box/fuse-box) plugin to remove assertions on production builds.

See [unassert](https://github.com/unassert-js/unassert) project for more documentation.


## Installation

Install `fusebox-unassert-plugin` via npm:

```console
$ npm install --save-dev fusebox-unassert-plugin
```

## Usage

### Setup

Import plugin

```js
const { UnassertPlugin } = require("fusebox-unassert-plugin");
```

Inject into a chain

```js
fuse.bundle("app").plugin(UnassertPlugin());
```

Or add it to the main config plugins list to make it available across bundles.

```js
FuseBox.init({
  plugins: [UnassertPlugin()],
});
```

The plugin will parse source files (.js, .jsx, .ts, .tsx) into syntax trees by using [esprima](http://esprima.org/), and then re-generate JavaScript using [escodegen](https://github.com/estools/escodegen). It is primarily intended for Quantum and uglified builds since the output will not have identical formatting to the input.

```js
FuseBox.init({
  plugins: [
    ...
    this.isProduction && UnassertPlugin(),
    this.isProduction && QuantumPlugin({ uglify:true })
  ],
});
```

### Options

You can pass unassert options, if not passed, default options (Same as [unassert.defaultOptions()](https://github.com/unassert-js/unassert#var-options--unassertdefaultoptions)) will be used.

```js
{
    assertionPatterns: [
        'assert(value, [message])',
        'assert.ok(value, [message])',
        'assert.equal(actual, expected, [message])',
        'assert.notEqual(actual, expected, [message])',
        'assert.strictEqual(actual, expected, [message])',
        'assert.notStrictEqual(actual, expected, [message])',
        'assert.deepEqual(actual, expected, [message])',
        'assert.notDeepEqual(actual, expected, [message])',
        'assert.deepStrictEqual(actual, expected, [message])',
        'assert.notDeepStrictEqual(actual, expected, [message])',
        'assert.fail(actual, expected, message, operator)',
        'assert.throws(block, [error], [message])',
        'assert.doesNotThrow(block, [message])',
        'assert.ifError(value)',
        'console.assert(value, [message])'
    ],
    requirePatterns: [
        'assert = require("assert")',
        'assert = require("power-assert")'
    ],
    importPatterns: [
        'import assert from "assert"',
        'import * as assert from "assert"',
        'import assert from "power-assert"',
        'import * as assert from "power-assert"'
    ]
}
```