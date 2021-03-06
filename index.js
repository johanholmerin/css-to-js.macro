const assert = require('assert');
const { createMacro, MacroError } = require('babel-plugin-macros');
const parseCSS = require('./parse-css');

module.exports = createMacro(cssToJSMacro, {
  configName: 'cssToJS'
});

const IMPORT_NAMES = ['css', 'keyframes'];

function replaceReferences(references) {
  if (!references) return;

  // TODO references are currently replaced by plain nodes during
  // transformation. Iterating backwards is a temporary solution
  // Also affects keyframes defined in CSS tag
  references
    .slice()
    .reverse()
    .forEach(ref => {
      assert(
        ref.parentPath.isTaggedTemplateExpression(),
        ref.parentPath.buildCodeFrameError(
          'Import must be called as a tagged template literal'
        )
      );
      parseCSS(ref.parentPath);
    });
}

function cssToJSMacro({ references }) {
  for (const name in references) {
    assert(
      IMPORT_NAMES.includes(name),
      new MacroError(
        `Import ${name} not supported. Use ${IMPORT_NAMES.join(' or ')}`
      )
    );
  }

  replaceReferences(references.keyframes);
  replaceReferences(references.css);
}
