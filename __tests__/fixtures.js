const path = require('path');
const pluginTester = require('babel-plugin-tester').default;
const plugin = require('babel-plugin-macros');

pluginTester({
  plugin,
  pluginName: 'css-to-js.macro',
  fixtures: path.join(__dirname, 'fixtures')
});
