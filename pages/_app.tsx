import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { WagmiConfig } from 'wagmi'
import { config } from '../wagmi-config'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <ThemeProvider attribute="class">
            <SessionProvider session={session}>
                <WagmiConfig config={config}>
                    <ToastContainer
                        position="top-left"
                        autoClose={9000}
                        hideProgressBar={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <Component {...pageProps} />
                </WagmiConfig>
            </SessionProvider>
        </ThemeProvider>
    )
}

export default MyApp
