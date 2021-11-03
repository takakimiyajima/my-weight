import Head from "next/head"
import { ThemeProvider } from "styled-components"
import { THEME } from "@/constants"
import "@/styles/destyle.css"
import "@/styles/globals.css"

function MyApp({ Component, pageProps }) {
  return  (
    <>
      <Head>
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <ThemeProvider theme={THEME}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
