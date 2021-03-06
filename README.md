# css-to-js.macro

**Not ready for production**

Babel macro to transform CSS tagged template literal to object

## Usage

### Input

```javascript
import { css, keyframes } from 'css-to-js.macro';

css`
  color: red;
  font-size: ${props.fontSize};
  ${props.isBlue && css`
    color: blue;
  `}
  animation-name: ${keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
  `};
`
```

### Output

```javascript
{
  color: 'red',
  'font-size': props.fontSize,
  ...(props.isBlue && { color: 'blue' }),
  'animation-name': {
    from: { opacity: 1 },
    to: { opacity: 0 }
  }
}
```

## Installation

```sh
# Yarn
yarn add -D css-to-js.macro babel-plugin-macros

# npm
npm install -D css-to-js.macro babel-plugin-macros
```

## Babel config

```json
{
  "plugins": ["macros"]
}
```
