// next index.ts page

import { NextPage } from 'next'

type StaticHomePage = {
  title: string
}

const IndexPage: NextPage<StaticHomePage> = (props) => {
  return (
    <div>
      <h1>{`${props.title}`}</h1>
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      title: 'Emily Bartman',
    },
  }
}

export default IndexPage