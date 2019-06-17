# fast-fp.macro

Zero runtime overhead functional programming library for projects using [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros).

* Zero runtime overhead - no hidden loops!
* Zero dependencies - no libraries after compilation!
* No boilerplate injected at compile time!

`fast-fp.macro` compiles itself out of your bundles!

**Warning**: Alpha release! Please play with it, and give feedback!

## Installation

Ensure that your project already has [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros) in it. If you are using [create-react-app](https://github.com/facebook/create-react-app) or [gatsby](https://www.gatsbyjs.org/), you already have `babel-plugin-macros`. If not, do the following:
```
npm install --save-dev babel-plugin-macros
```
and add the following to your babel config:
```json
{
  "plugins": ["macros"]
}
```

Finally, install this module:
```
npm install --save-dev fast-fp.macro@alpha
```

## Usage

`fast-fp.macro` exports two functions, `pipe` and `compose`.
```js
import { pipe, compose } from 'fast-fp.macro';
```

Depending on interest, more FP functions will be added. Please open an issue to let me know what you'd like! Ideally, I'll use [ramda's API](https://ramdajs.com/docs) as reference, but we could deviate as needed.

### `compose`

```js
import { compose } from 'fast-fp.macro';

const toUpper = str => str.toUpperCase();
const first = str => str[0];

const composed = compose(toUpper, first);

composed('foo'); // 'F'
composed('hello'); // 'H"
```

The code above gets compiled to:
```js
const toUpper = str => str.toUpperCase();
const first = str => str[0];

const composed = (...args) => toUpper(first(...args));

composed('foo'); // 'F'
composed('hello'); // 'H"
```

Note: No import! No additional library code!

### `pipe`

```js
import { pipe } from 'fast-fp.macro';

const toUpper = str => str.toUpperCase();
const first = str => str[0];

const piped = pipe(toUpper, first);

piped('foo'); // 'F'
piped('hello'); // 'H"
```

The code above gets compiled to:
```js
const toUpper = str => str.toUpperCase();
const first = str => str[0];

const piped = (...args) => first(toUpper(...args));

piped('foo'); // 'F'
piped('hello'); // 'H"
```

Note: No import! No additional library code!

## License
MIT