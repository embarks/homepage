import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import c from 'classnames'
import { ThemeContext } from '../contexts/theme'
import { StarIcon } from '../components/StarIcon'
import useMangle from '../hooks/mangle'
import Link from 'next/link'
import {
  TextLayout,
  LinkSection,
  Title,
  Subtitle,
} from '../components/TextLayout'

type StaticHomePage = {
  title: string
}

export const baseStyle = 'uppercase font-sans w-full block hover:underline'

export const textStyle = {
  dark: 'text-white',
  light: 'text-black',
}

const IndexPage: NextPage<StaticHomePage> = () => {
  const { theme } = useContext(ThemeContext)
  const about = useMangle('about')
  const work = useMangle('work')
  const contact = useMangle('contact')
  const myName = useMangle('Emily Bartman')
  // const title = useMangle('Information Technology Design')

  useEffect(() => {
    myName.triggerMangle()
    // title.triggerMangle()
  }, [])
  return (
    <TextLayout theme={theme}>
      <Title heading={myName.text}>
        <span className="fill-white flex items-center">
          <StarIcon
            className="transition-transform hover:-translate-y-1 animate-ping"
            onClick={() => myName.triggerMangle()}
          />
        </span>
      </Title>

      <Subtitle>Information Technology Design</Subtitle>

      <LinkSection>
        <Link
          className={c(baseStyle, 'text-left', textStyle[theme])}
          onMouseEnter={about.triggerMangle}
          onTouchStart={about.triggerMangle}
          href="/about"
        >{`${about.text}`}</Link>

        <a
          className={c(baseStyle, 'text-center', textStyle[theme])}
          onMouseEnter={work.triggerMangle}
          onTouchStart={work.triggerMangle}
          target="_blank"
          href="https://www.linkedin.com/in/thebartman/"
        >{`${work.text}`}</a>

        <a
          href="mailto:emily@emwaves.org"
          className={c(baseStyle, 'text-right', textStyle[theme])}
          onMouseEnter={contact.triggerMangle}
          onTouchStart={contact.triggerMangle}
        >{`${contact.text}`}</a>
      </LinkSection>
    </TextLayout>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

export default IndexPage
