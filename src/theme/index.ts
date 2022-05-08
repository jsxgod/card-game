import { DefaultTheme } from "styled-components";

const theme = { fonts: { body: "Times New Roman" } };

export type Theme = typeof theme & DefaultTheme;

export default theme;
