import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Itim } from "next/font/google";

import "@/styles/globals.css";
import DevViewport from "@/components/DevViewport";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

const fonts = Itim({ weight: "400", subsets: ["latin", "thai"] });
export const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Tips For You</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <main className={`${fonts.className}`}>
            <Component {...pageProps} />
            {process.env.NODE_ENV === "development" && <DevViewport />}
          </main>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
