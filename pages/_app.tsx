import { AppProps } from "next/app";
import "../src/sass/main.scss";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
