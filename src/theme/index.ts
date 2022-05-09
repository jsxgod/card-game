import { DefaultTheme } from "styled-components";
import {
  fonts,
  fontSizes,
  lineHeights,
  fontWeights,
  textStyles,
} from "./config/typography";
import breakpoints from "./config/breakpoints";
import sizes from "./config/sizes";
import space from "./config/space";
import defaultColors from "./config/colors";

const theme = {
  breakpoints,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  textStyles,
  colors: {},
  space,
  sizes,
};

export type Theme = typeof theme & DefaultTheme;

export default theme;
