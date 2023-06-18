import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { WagmiConfig } from 'wagmi'
import { config } from "../wagmi-config";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider attribute='class'>
      <SessionProvider session={session}>
        <WagmiConfig config={config}>
          <Component {...pageProps} />
        </WagmiConfig>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default MyApp
