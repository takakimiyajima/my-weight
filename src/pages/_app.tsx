import Head from "next/head"
import { AppProps } from "next/dist/shared/lib/router/router"
import { ThemeProvider } from "styled-components"
import { THEME } from "@/constants"
import "@/styles/destyle.css"
import "@/styles/globals.css"
import { UserAgentContextProvider } from "@/contexts/userAgentProvider"

type Props = {
  userAgent?: string;
} & AppProps;

function MyApp({ Component, pageProps, uaString }: Props) {
  return  (
    <>
      <Head>
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <ThemeProvider theme={THEME}>
        <UserAgentContextProvider uaString={uaString}>
          <Component {...pageProps} />
        </UserAgentContextProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
