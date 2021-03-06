/* eslint-env jest */
const babel = require('@babel/core');
const plugin = require('babel-plugin-macros');

function compile(input) {
  return babel.transformSync(input, {
    plugins: [plugin],
    highlightCode: false,
    cwd: __dirname,
    filename: 'test.js'
  });
}

it('throws on default import', () => {
  const input = `
import css from './plugin.macro';
  `;
  expect(() => compile(input)).toThrow(
    'Import default not supported. Use css or keyframes'
  );
});

it('throws on unsupported named import', () => {
  const input = `
import { foo } from './plugin.macro';
  `;
  expect(() => compile(input)).toThrow(
    'Import foo not supported. Use css or keyframes'
  );
});

it('throws on non-tagged template use', () => {
  const input = `\
import { css } from './plugin.macro';
css();
  `;
  expect(() => compile(input)).toThrow(`\
SyntaxError: Import must be called as a tagged template literal
  1 | import { css } from './plugin.macro';
> 2 | css();
    | ^^^^^`);
});
