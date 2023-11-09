import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Itim } from "next/font/google";

import "@/styles/globals.css";
import DevViewport from "@/components/DevViewport";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const fonts = Itim({ weight: "400", subsets: ["latin", "thai"] });
const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main className={`${fonts.className}`}>
          <Component {...pageProps} />
          {process.env.NODE_ENV === "development" && <DevViewport />}
        </main>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
