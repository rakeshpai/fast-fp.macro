const createTests = require('./create-tests');

createTests('pipe', [
  {
    title: 'works with named functions',
    code: `
      import { pipe } from '../src/fast-fp.macro';
      const piped = pipe(toUpper, firstChar);
    `,
    output: `
      const piped = (...args) => firstChar(toUpper(...args));
    `
  },
  {
    title: 'works with inline arrow functions',
    code: `
      import { pipe } from '../src/fast-fp.macro';
      const piped = pipe(str => str.toUpperCase(), firstChar);
    `,
    output: `
      const piped = (...args) => firstChar((str => str.toUpperCase())(...args));
    `
  },
  {
    title: 'works with inline es5 functions',
    code: `
      import { pipe } from '../src/fast-fp.macro';
      const piped = pipe(function (str) { return str.toUpperCase(); }, firstChar);
    `,
    output: `
      const piped = (...args) => firstChar((function (str) {
        return str.toUpperCase();
      })(...args));
    `
  },
  {
    title: 'works with higher-order functions',
    code: `
      import { pipe } from '../src/fast-fp.macro';
      const piped = pipe(toUpper, charAtIndex(0));
    `,
    output: `
      const piped = (...args) => charAtIndex(0)(toUpper(...args));
    `
  }
]);
