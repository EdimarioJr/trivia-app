import "@/styles/globals.scss";
import "@/styles/nprogress.scss";
import type { AppProps } from "next/app";

import { Roboto } from "next/font/google";
import Head from "next/head";
import { Provider } from "react-redux";
import Router from "next/router";
import NProgress from "nprogress";
import { setupStore } from "@/store";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],

  display: "swap",
});

const store = setupStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Trivia</title>
        <meta name="description" content="Trivia app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${roboto.className}`}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
