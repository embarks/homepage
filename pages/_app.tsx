import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Libre_Baskerville, Nunito } from 'next/font/google'
import Layout from '../components/Layout'
import ThemeContextProvider from '../contexts/theme'

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
  weight: ['400', '700'],
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '700'],
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${libreBaskerville.variable} ${nunito.variable} font-serif h-full`}
    >
      <ThemeContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeContextProvider>
    </main>
  )
}

export default MyApp
