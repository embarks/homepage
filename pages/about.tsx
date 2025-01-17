import React, { useContext, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import c from 'classnames'
import useMangle from '../hooks/mangle'
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
import { useRouter } from 'next/router'

type StaticAboutPage = {
  title: string
}

const AboutPage: NextPage<StaticAboutPage> = () => {
  const { theme } = useContext(ThemeContext)
  const [raiseUpClass, setRaiseUpClass] = useState('')
  const router = useRouter()

  const home = useMangle('Home')
  const about = useMangle('About Me')

  function triggerTransition(e: string) {
    setRaiseUpClass('translate-y-0')
    setTimeout(() => router.push('/'), 250)
  }

  useEffect(function triggerMangle() {
    home.triggerMangle()
    about.triggerMangle()
  }, [])

  useEffect(function raiseUp() {
    setRaiseUpClass('-translate-y-10 delay-700')
  }, [])

  return (
    <TextLayout theme={theme}>
      <Title
        heading={
          <span
            className={classNames(
              'relative block transition-transform',
              raiseUpClass
            )}
          >
            {about.text}
          </span>
        }
      >
        <span
          className={classNames(
            'fill-white flex items-center  transition-transform ',
            raiseUpClass
          )}
        >
          <HeartIcon
            className={classNames('dark:fill-white hover:-translate-y-1 ml-2')}
          />
        </span>
      </Title>
      <Subtitle
        className={classNames('h-full items-center [&>h2]:h-full')}
      >{`Just Trying Something`}</Subtitle>
      <div>
        <h2></h2>
      </div>

      <LinkSection className={textStyle[theme]}>
        <button
          className={c(baseStyle, 'text-left', textStyle[theme])}
          onClick={() => triggerTransition('clicked')}
        >
          {home.text}
        </button>
        <div className={c(baseStyle, 'text-center', textStyle[theme])}>xxx</div>
        <div className={c(baseStyle, 'text-right', textStyle[theme])}>xxx</div>
      </LinkSection>
    </TextLayout>
  )
}

export default AboutPage
