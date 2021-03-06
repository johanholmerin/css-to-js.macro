const postcss = require('postcss');
const postcssJs = require('postcss-js');
const t = require('@babel/types');

const PLACEHOLDER = '@__PLACEHOLDER__';

function parseCSS(taggedTemplateExpression) {
  const expressions = taggedTemplateExpression.node.quasi.expressions;
  const join = taggedTemplateExpression.node.quasi.quasis
    .map(part => part.value.raw)
    .join(PLACEHOLDER);

  let index = 0;
  function walk(node) {
    const props = [];

    for (let key in node) {
      let value = node[key];

      // Object
      while (key.startsWith(PLACEHOLDER)) {
        key = key.replace(PLACEHOLDER, '').trim();
        props.push(t.spreadElement(expressions[index]));
        index++;
      }

      if (value === true) {
        const parts = key.split(':');
        key = parts[0].trim();
        value = parts.slice(1).join(':').trim();
      }

      if (key === '' && value === '') continue;

      // Property
      if (value === PLACEHOLDER) {
        props.push(t.objectProperty(t.stringLiteral(key), expressions[index]));
        index++;
      } else if (typeof value === 'object') {
        props.push(t.objectProperty(t.stringLiteral(key), walk(value)));
      } else {
        const nodeValue =
          typeof value === 'string'
            ? t.stringLiteral(value)
            : t.numericLiteral(value);
        props.push(t.objectProperty(t.stringLiteral(key), nodeValue));
      }
    }

    return t.objectExpression(props);
  }

  const ast = postcss.parse(join);
  const objExpr = walk(postcssJs.objectify(ast));
  taggedTemplateExpression.replaceWith(objExpr);
}

module.exports = parseCSS;
