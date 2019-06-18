const createTests = require('./create-tests');

const tests = fnName => {
  const operator = fnName === 'allPass' ? '&&' : '||';

  return [
    {
      title: 'works with named functions',
      code: `
        import { ${fnName} } from '../fast-fp.macro';
        const pred = ${fnName}(isQueen, isSpade);
      `,
      output: `
        const pred = (...args) => isQueen(...args) ${operator} isSpade(...args);
      `
    },
    {
      title: 'works with inline arrow functions',
      code: `
        import { ${fnName} } from '../fast-fp.macro';
        const pred = ${fnName}(str => str.includes('foo'), someFn);
      `,
      output: `
        const pred = (...args) => (str => str.includes('foo'))(...args) ${operator} someFn(...args);
      `
    },
    {
      title: 'works with inline es5 functions',
      code: `
        import { ${fnName} } from '../fast-fp.macro';
        const pred = ${fnName}(
          function (str) { return str.includes('foo'); },
          someFn
        );
      `,
      output: `
        const pred = (...args) => (function (str) {
          return str.includes('foo');
        })(...args) ${operator} someFn(...args);
      `
    },
    {
      title: 'works with higher-order functions',
      code: `
        import { ${fnName} } from '../fast-fp.macro';
        const pred = ${fnName}(someFn, someFn('arg'));
      `,
      output: `
        const pred = (...args) => someFn(...args) ${operator} someFn('arg')(...args);
      `
    }
  ];
};

createTests('allPass', tests('allPass'));
createTests('anyPass', tests('anyPass'));
