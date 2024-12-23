import React, { useContext, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import c from 'classnames'
import useMangle from '../functions/mangle'
import { ThemeContext } from '../contexts/theme'
import { baseStyle, textStyle } from '.'
import {
  TextLayout,
  LinkSection,
  Title,
  Subtitle,
} from '../components/TextLayout'
import { StarIcon } from '../components/StarIcon'
import Link from 'next/link'
import classNames from 'classnames'
import { HeartIcon } from '../components/HeartIcon'

type StaticAboutPage = {
  title: string
}

const AboutPage: NextPage<StaticAboutPage> = () => {
  const { theme } = useContext(ThemeContext)

  const home = useMangle('Home')
  const about = useMangle('About Me')
  useEffect(() => {
    home.triggerMangle()
    about.triggerMangle()
  }, [])

  return (
    <TextLayout theme={theme}>
      <Title heading={about.text}>
        <span className="fill-white flex items-center">
          <HeartIcon
            className={classNames(
              'dark:fill-white transition-transform hover:-translate-y-1',
              'animate-ping'
            )}
          />
        </span>
      </Title>
      <Subtitle className="h-full items-center [&>h2]:h-full">{`Just Trying Something`}</Subtitle>
      <div>
        <h2></h2>
      </div>

      <LinkSection className={textStyle[theme]}>
        <Link className={c(baseStyle, 'text-left', textStyle[theme])} href="/">
          {home.text}
        </Link>
        <div className={c(baseStyle, 'text-center', textStyle[theme])}>xxx</div>
        <div className={c(baseStyle, 'text-right', textStyle[theme])}>xxx</div>
      </LinkSection>
    </TextLayout>
  )
}

export default AboutPage
