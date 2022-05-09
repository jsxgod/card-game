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
  colors: {
    white: defaultColors.white,
    black: defaultColors.black,
    primary: defaultColors.red,
    secondary: defaultColors.black,
    header: defaultColors.red,
    text: defaultColors.dark,
    sectionMark: defaultColors.darkRed,
    cardPrimary: defaultColors.cardRed,
    cardSecondary: defaultColors.cardBlue,
    primaryBackground: defaultColors.white,
    secondaryBackground: defaultColors.secondaryWhite,
    darkBackground: defaultColors.gray,
  },
  space,
  sizes,
};

export type Theme = typeof theme;

export default theme;
