const breakpoints = [0, "48.5rem", "64rem"];

export default breakpoints;

export const mediaQueries = {
  MOBILE: `@media screen and (min-width: ${breakpoints[0]})`,
  TABLET: `@media screen and (min-width: ${breakpoints[1]})`,
  DESKTOP: `@media screen and (min-width: ${breakpoints[2]})`,
};
