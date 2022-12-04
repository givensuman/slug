import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <>
    <main className="min-h-screen bg-gradient-to-b from-stone-700 to-zinc-900">
      <Component {...pageProps} />
    </main>
  </>
};

export default trpc.withTRPC(MyApp);
