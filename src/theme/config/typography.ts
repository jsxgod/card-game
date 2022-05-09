export const fonts = {
  header: "'Clash Display'",
  bodyText: "'Poppins'",
  bodyTextLight: "PoppinsLight",
};

export const fontSizes = {
  "8": "0.5rem",
  "10": "0.625rem",
  "12": "0.75rem",
  "16": "1rem",
  "24": "1.5rem",
  "32": "2rem",
  "64": "4rem",
  "96": "6rem",
  "128": "8rem",
};

export const fontWeights = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
};

export const lineHeights = {
  XS: 1.1,
  S: 1.3,
  M: 1.5,
};

export const textStyles = {
  h1: {
    fontFamily: "header",
    fontWeight: "BOLD",
    fontSize: ["", "", "128"],
    lineHeight: "S",
  },
  h2: {
    fontFamily: "header",
    fontWeight: "BOLD",
    fontSize: ["", "", "96"],
    lineHeight: "S",
  },
  h3: {
    fontFamily: "header",
    fontWeight: "BOLD",
    fontSize: ["", "", "64"],
    lineHeight: "S",
  },
  h4: {
    fontFamily: "header",
    fontWeight: "BOLD",
    fontSize: ["", "", "48"],
    lineHeight: "S",
  },
  h5: {
    fontFamily: "header",
    fontWeight: "SEMIBOLD",
    fontSize: ["", "", "32"],
    lineHeight: "S",
  },
  h6: {
    fontFamily: "headers",
    fontWeight: "MEDIUM",
    fontSize: ["", "", "24"],
    lineHeight: "S",
  },
  paragraph: {
    fontSize: "16",
    fontWeight: "REGULAR",
    lineHeight: "M",
    fontFamily: "bodyText",
  },
  dictionaryEntry: {
    fontFamily: "bodyText",
    fontWeight: "LIGHT",
    fontSize: "12",
    lineHeight: "XS",
  },
};
