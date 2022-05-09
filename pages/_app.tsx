import { ThemeProvider } from "styled-components";
import { AppProps } from "next/app";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
