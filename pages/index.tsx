import React from 'react'
import { NextPage } from 'next'

type StaticHomePage = {
  title: string
}

const IndexPage: NextPage<StaticHomePage> = (props) => {
  return <div>Hi mom! 🦊</div>
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

export default IndexPage
