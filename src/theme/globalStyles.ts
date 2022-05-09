import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import reset from "styled-reset";
import theme, { Theme } from ".";

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  ${normalize};
  ${reset};
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.bodyText};
    -webkit-font-smoothing: antialiased;
    background-color: ${({ theme }) => theme.colors.primaryBackground};
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Poppins';
    src: url("/assets/fonts/Poppins/Poppins-Regular.ttf") format('ttf');
  }
  @font-face {
    font-family: 'PoppinsLight';
    src: url("/assets/fonts/Poppins/Poppins-Light.ttf") format('ttf');
  }
  // Variable font
  @font-face { 
    font-family: 'Clash Display';
    src: url("/assets/fonts/ClashDisplay/ClashDisplay-Variable.ttf") format('variable');
    font-weight: 500 600 700;
  }
`;

export default GlobalStyles;
