import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import reset from "styled-reset";
import { Theme } from ".";

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  ${normalize};
  ${reset};
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
