const createTests = require('./create-tests');

createTests('allPass', [
  {
    title: 'works with named functions',
    code: `
      import { allPass } from '../fast-fp.macro';
      const pred = allPass(isQueen, isSpade);
    `,
    output: `
      const pred = (...args) => isQueen(...args) && isSpade(...args);
    `
  },
  {
    title: 'works with inline arrow functions',
    code: `
      import { allPass } from '../fast-fp.macro';
      const pred = allPass(str => str.includes('foo'), someFn);
    `,
    output: `
      const pred = (...args) => (str => str.includes('foo'))(...args) && someFn(...args);
    `
  },
  {
    title: 'works with inline es5 functions',
    code: `
      import { allPass } from '../fast-fp.macro';
      const pred = allPass(
        function (str) { return str.includes('foo'); },
        someFn
      );
    `,
    output: `
      const pred = (...args) => (function (str) {
        return str.includes('foo');
      })(...args) && someFn(...args);
    `
  },
  {
    title: 'works with higher-order functions',
    code: `
      import { allPass } from '../fast-fp.macro';
      const pred = allPass(someFn, someFn('arg'));
    `,
    output: `
      const pred = (...args) => someFn(...args) && someFn('arg')(...args);
    `
  }
]);
