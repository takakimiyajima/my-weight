import { Provider, signIn, useSession } from 'next-auth/client'
import Head from "next/head"
import { AppProps } from "next/dist/shared/lib/router/router"
import { ThemeProvider } from "styled-components"
import { THEME } from "@/constants"
import "@/styles/destyle.css"
import "@/styles/globals.css"
import { UserAgentContextProvider } from "@/contexts/userAgent/userAgentProvider"

type Props = {
  userAgent?: string;
} & AppProps

export const NeedLogin = ({ children }) => {
  const [session, loading] = useSession()
  if (loading) {
    return null
  }

  if (!session) {
    signIn()
    return null
  }

  return children
}

function App({ Component, pageProps, uaString }: Props) {
  return  (
    <>
      <Head>
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <Provider session={pageProps.session}>
        <NeedLogin>
          <ThemeProvider theme={THEME}>
            <UserAgentContextProvider uaString={uaString}>
              <Component {...pageProps} />
            </UserAgentContextProvider>
          </ThemeProvider>
        </NeedLogin>
      </Provider>
    </>
  )
}

export default App
