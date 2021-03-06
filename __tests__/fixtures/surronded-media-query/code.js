import { css } from '../../plugin.macro';

css`
  ${css`
    color: blue;
  `}
  @media (max-width: 800px) {
    color: orange;
  }
  ${css`
    opacity: 1;
  `}
`;
