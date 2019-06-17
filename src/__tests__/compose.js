const createTests = require('./create-tests');

createTests('compose', [
  {
    title: 'works with named functions',
    code: `
      import { compose } from '../fast-fp.macro';
      const composed = compose(toUpper, firstChar);
    `,
    output: `
      const composed = (...args) => toUpper(firstChar(...args));
    `
  },
  {
    title: 'works with inline arrow functions',
    code: `
      import { compose } from '../fast-fp.macro';
      const composed = compose(str => str.toUpperCase(), firstChar);
    `,
    output: `
      const composed = (...args) => (str => str.toUpperCase())(firstChar(...args));
    `
  },
  {
    title: 'works with inline es5 functions',
    code: `
      import { compose } from '../fast-fp.macro';
      const composed = compose(
        function (str) { return str.toUpperCase(); },
        firstChar
      );
    `,
    output: `
      const composed = (...args) => (function (str) {
        return str.toUpperCase();
      })(firstChar(...args));
    `
  },
  {
    title: 'works with higher-order functions',
    code: `
      import { compose } from '../fast-fp.macro';
      const composed = compose(toUpper, charAtIndex(0));
    `,
    output: `
      const composed = (...args) => toUpper(charAtIndex(0)(...args));
    `
  }
]);
