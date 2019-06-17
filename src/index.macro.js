const { createMacro } = require('babel-plugin-macros');
const pipe = require('./fns/pipe');
const compose = require('./fns/compose');

const methods = {
  compose, pipe
};

module.exports = createMacro(({ references, state, babel }) => {
  Object.entries(methods).forEach(([methodName, handler]) => {
    if (references[methodName]) {
      handler({ references: references[methodName], state, babel });
    }
  });
});
