import { AppProps } from "next/app";
import "../src/sass/main.scss";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default MyApp;
