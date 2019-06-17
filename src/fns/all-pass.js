const createFunction = t => fn =>
  t.callExpression(
    t.isFunctionExpression(fn) ? t.parenthesizedExpression(fn) : fn,
    [t.spreadElement(t.identifier('args'))]
  );

module.exports = ({ references, babel: { types: t } }) => {
  const toFunction = createFunction(t);

  references.forEach(({ parentPath }) => {
    const [firstArg, ...restArgs] = parentPath.node.arguments;

    parentPath.replaceWith(
      t.arrowFunctionExpression(
        [t.restElement(t.identifier('args'))],
        restArgs.reduce((folded, fn) => {
          return t.logicalExpression(
            '&&',
            folded,
            toFunction(fn)
          );
        }, toFunction(firstArg))
      )
    );
  });
};
