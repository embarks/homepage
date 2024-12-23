import '../styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
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

const melody = localFont({
  src: [
    {
      path: '../public/fonts/BLMelody-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/BLMelody-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-melody',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${libreBaskerville.variable} ${nunito.variable} ${melody.variable} font-serif h-full`}
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
