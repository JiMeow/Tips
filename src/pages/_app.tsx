import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Itim } from "next/font/google";

import "@/styles/globals.css";
import DevViewport from "@/components/DevViewport";

const fonts = Itim({ weight: "400", subsets: ["latin", "thai"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={`${fonts.className}`}>
        <Component {...pageProps} />
        {process.env.NODE_ENV === "development" && <DevViewport />}
      </main>
    </SessionProvider>
  );
};

export default MyApp;
