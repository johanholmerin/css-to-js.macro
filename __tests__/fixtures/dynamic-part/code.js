import { css } from '../../plugin.macro';

css`
  ${props.isBlue &&
  css`
    color: blue;
  `}
`;
