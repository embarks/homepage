import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import ThemeContextProvider from '../contexts/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContextProvider>
  )
}

export default MyApp
