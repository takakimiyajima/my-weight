import Head from "next/head";
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return  (
    <>
      <Head>
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
