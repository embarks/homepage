// basic about page
import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import seeex from 'classnames'

import Layout from '../components/Layout'

type StaticAboutPage = {
  title: string
}

const AboutPage: NextPage<StaticAboutPage> = (props) => {
  return (
    <Link href="/" passHref>
      <a className={seeex('text-white font-mono')}>[/]</a>
    </Link>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

export default AboutPage
