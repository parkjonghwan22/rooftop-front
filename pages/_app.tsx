import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig } from "wagmi";
import { config } from "../wagmi-config";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
/**
 * {
    defaultOptions: {
        queries: {
            retry: 5,
            cacheTime: 300000, // 5분
            onError: (error) => {
                console.log('react-query 에러 발생:', error)
            },
        },
    },
}
 */

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <WagmiConfig config={config}>
          <QueryClientProvider client={queryClient}>
            <ToastContainer
              position="top-left"
              autoClose={4000}
              hideProgressBar={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Component {...pageProps} />
          </QueryClientProvider>
        </WagmiConfig>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
