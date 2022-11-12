import React, { FC, useContext } from 'react'
import { NextPage } from 'next'

import c from 'classnames'
import SoftLogoTimes from '../components/SoftLogoTimes'
import { ThemeContext } from '../contexts/theme'
import dynamic from 'next/dynamic'

const Timer = dynamic(
  () => import('../components/Timer').then(({ Timer }) => Timer),
  {
    ssr: false,
  }
)

type StaticHomePage = {
  title: string
}

const externalLinks = [
  {
    title: 'linkedin',
    href: 'https://www.linkedin.com/in/thebartman/',
  },
  {
    title: 'github',
    href: 'https://github.com/embarks',
  },
]

const Text: FC<{ children; className? }> = ({ children, className }) => {
  const { theme } = useContext(ThemeContext)
  const style = {
    dark: 'text-white',
    light: 'text-black',
  }
  return (
    <span
      className={c(style[theme], 'font-sans text-sm md:text-xl', className)}
    >
      {children}
    </span>
  )
}

const InfoPanel = () => {
  return (
    <div className="mt-4">
      <Text className="leading-loose md:leading-relaxed">
        {`U.S.A. `}
        <a
          href="https://duckduckgo.com/?q=Phoenix%2C+Arizona+85053"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold"
        >
          85053
        </a>
        <Timer />
      </Text>
    </div>
  )
}

const Header = () => {
  return (
    <span className="select-none w-full">
      <SoftLogoTimes />
    </span>
  )
}

const IndexPage: NextPage<StaticHomePage> = (props) => {
  return (
    <div className="flex flex-col w-full h-full justify-between items-start">
      <Header />
      <InfoPanel />
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

export default IndexPage
