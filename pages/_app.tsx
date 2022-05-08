import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import theme from "../src/theme/";
import GlobalStyles from "../src/theme/globalStyles";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
