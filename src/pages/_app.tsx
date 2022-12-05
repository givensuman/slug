import { type AppType } from "next/app";
import Head from 'next/head'

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <>

    <Head>
      <meta name="description" content="A small link shortener app" />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🐌</text></svg>" />
    </Head>

    <main className="min-h-screen bg-gradient-to-b from-stone-700 to-zinc-900">
      <Component {...pageProps} />
    </main>

  </>
};

export default trpc.withTRPC(MyApp);
