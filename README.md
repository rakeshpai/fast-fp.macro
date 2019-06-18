# fast-fp.macro

[![NPM version](https://img.shields.io/npm/v/fast-fp.macro.svg)](https://www.npmjs.com/package/fast-fp.macro)
[![Build Status](https://img.shields.io/travis/rakeshpai/fast-fp.macro/master.svg?label=Build%20Status)](https://travis-ci.org/rakeshpai/fast-fp.macro)
[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)


Zero overhead functional programming library for projects using [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros).

* Zero runtime overhead - no hidden loops!
* Zero dependencies - no libraries after compilation!
* No boilerplate injected at compile time!

`fast-fp.macro` compiles itself out of your bundles!

**Why is this better than using any other library?**

When using a typical library such as ramda or lodash (both great libraries, btw), you need to, well, ship the library as part of your bundle. Also, many functions like `pipe` and `compose` are implemented internally in these libraries by looping over the supplied arguments, further increasing runtime overhead. This doesn't matter too much if you're using very few functions here and there, but if you have a lot of composed functions the overhead quickly adds up. 

`fast-fp.macro` avoids both these issues: There's no library code shipped to the client, and all the loops are pre-evaluated at build-time so that there's no runtime overhead.

## Installation

```
npm install --save-dev fast-fp.macro@beta
```

You'll also have to ensure that your project already has [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros) configured. If you are using [create-react-app](https://github.com/facebook/create-react-app) or [gatsby](https://www.gatsbyjs.org/), you already have `babel-plugin-macros`. If not, do the following:
```
npm install --save-dev babel-plugin-macros
```
and add the following to your babel config:
```json
{
  "plugins": ["macros"]
}
```

## Usage

`fast-fp.macro` exports the following functions:

* [`allPass`](#allPass)
* [`compose`](#compose)
* [`pipe`](#pipe)

These functions are heavily inspired by the equivalent functions in [ramda](https://ramdajs.com/).

Depending on interest, more FP functions will be added. Please open an issue to let me know what you'd like!

### `allPass`

[Ramda](https://ramdajs.com/docs/#allPass)

Takes a list of predicates and returns a predicate that returns true for a given list of arguments if every one of the provided predicates is satisfied by those arguments.

Difference from ramda: The list of predicates is taken as a list of arguments, not as an array.

```js
import { allPass } from 'fast-fp.macro';

const isQueen = ({ rank }) => rank === 'Q';
const isSpade = ({ suit }) => suit === '♠︎';
const isQueenOfSpades = allPass(isQueen, isSpade);

isQueenOfSpades({ rank: 'Q', suit: '♠︎' }); // true
isQueenOfSpades({ rank: 'K', suit: '♠︎' }); // false
```

The code above gets compiled to:
```js
const isQueen = ({ rank }) => rank === 'Q';
const isSpade = ({ suit }) => suit === '♠︎';
const isQueenOfSpades = (...args) => isQueen(...args) && isSpade(...args);

isQueenOfSpades({ rank: 'Q', suit: '♠︎' }); // true
isQueenOfSpades({ rank: 'K', suit: '♠︎' }); // false
```

### `anyPass`

[Ramda](https://ramdajs.com/docs/#anyPass)

Takes a list of predicates and returns a predicate that returns true for a given list of arguments if at least one of the provided predicates is satisfied by those arguments.

Difference from ramda: The list of predicates is taken as a list of arguments, not as an array.

```js
import { anyPass } from 'fast-fp.macro';

const isClub = ({ suit }) => suit === '♣';
const isSpade = ({ suit }) => suit === '♠';
const isBlackCard = anyPass(isClub, isSpade);

isBlackCard({ rank: '10', suit: '♣' }); // true
isBlackCard({ rank: 'Q', suit: '♠' }); // true
isBlackCard({ rank: 'Q', suit: '♦' }); // false
```

The code above gets compiled to:
```js
const isClub = ({ suit }) => suit === '♣';
const isSpade = ({ suit }) => suit === '♠';
const isBlackCard = (...args) => isClub(...args) || isSpade(...args);

isBlackCard({ rank: '10', suit: '♣' }); // true
isBlackCard({ rank: 'Q', suit: '♠' }); // true
isBlackCard({ rank: 'Q', suit: '♦' }); // false
```

### `compose`

[Ramda](https://ramdajs.com/docs/#compose)

Performs right-to-left function composition. The rightmost function may have any arity; the remaining functions must be unary.

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

### `pipe`

[Ramda](https://ramdajs.com/docs/#pipe)

Performs left-to-right function composition. The leftmost function may have any arity; the remaining functions must be unary.

```js
import { pipe } from 'fast-fp.macro';

const first = str => str[0];
const toUpper = str => str.toUpperCase();

const piped = pipe(first, toUpper);

piped('foo'); // 'F'
piped('hello'); // 'H"
```

The code above gets compiled to:
```js
const toUpper = str => str.toUpperCase();
const first = str => str[0];

const piped = (...args) => toUpper(first(...args));

piped('foo'); // 'F'
piped('hello'); // 'H"
```

## License
MIT
