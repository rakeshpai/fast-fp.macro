const { createMacro } = require('babel-plugin-macros');
const allPass = require('./fns/all-pass');
const pipe = require('./fns/pipe');
const compose = require('./fns/compose');

const methods = {
  allPass, compose, pipe
};

module.exports = createMacro(({ references, state, babel }) => {
  Object.entries(methods).forEach(([methodName, handler]) => {
    if (references[methodName]) {
      handler({ references: references[methodName], state, babel });
    }
  });
});
