module.exports = ({ references, babel: { types: t } }) => {
  references.forEach(({ parentPath }) => {
    parentPath.replaceWith(
      t.arrowFunctionExpression(
        [t.restElement(t.identifier('args'))],
        parentPath.node.arguments.reduceRight((folded, fn) => {
          return t.callExpression(
            t.isFunctionExpression(fn) ? t.parenthesizedExpression(fn) : fn,
            [folded]
          );
        }, t.spreadElement(t.identifier('args')))
      )
    );
  });
};
