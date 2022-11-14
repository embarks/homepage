import React, { FC, Suspense, useContext } from 'react'
import { NextPage } from 'next'

import c from 'classnames'
import SoftLogoTimes from '../components/SoftLogoTimes'
import { ThemeContext } from '../contexts/theme'
import dynamic from 'next/dynamic'

const Timer = dynamic(() => import('../components/Timer'), {
  suspense: true,
})

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
    <span className={c(style[theme], 'text-sm md:text-lg', className)}>
      {children}
    </span>
  )
}

const Header = () => {
  return (
    <span className="select-none w-full">
      <SoftLogoTimes />
    </span>
  )
}

const InfoPanel = () => {
  const birthDate = new Date('Tue Aug 04 1992 10:58:00 GMT+0000')
  const deathDate = new Date('Tue Aug 04 2076 10:58:00 GMT+0000')
  return (
    <div className="mt-4 w-full flex justify-between font-mono">
      <Text className="leading-loose md:leading-relaxed font-extralight font-sans">
        {`U.S.A. `}
        <a
          href="https://duckduckgo.com/?q=Phoenix%2C+Arizona+85053"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold"
        >
          85053
        </a>
        <div className="font-mono">
          <Suspense fallback={`0000:00:00:00`}>
            <Timer startTime={birthDate} />
          </Suspense>
        </div>
      </Text>
      <Text className="text-right md:text-left leading-loose md:leading-relaxed">
        <Text className="font-sans font-extralight uppercase">{'life 1'}</Text>
        <div className="font-mono">
          <Suspense fallback={`0000:00:00:00`}>
            <Timer startTime={deathDate} />
          </Suspense>
        </div>
      </Text>
    </div>
  )
}

const IndexPage: NextPage<StaticHomePage> = (props) => {
  return (
    <div className="relative flex flex-col w-full h-full justify-between items-start z-10">
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
