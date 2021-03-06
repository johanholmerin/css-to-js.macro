import { css, keyframes } from '../../plugin.macro';

css`
  animation: ${keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
  `};
`;
