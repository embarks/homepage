import React, {
  FC,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { NextPage } from 'next'
import SoftLogoTimes from '../components/SoftLogoTimes'
import { ThemeContext } from '../contexts/theme'
import dynamic from 'next/dynamic'
import { StarField } from 'starfield-react'
import c from 'classnames'

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

const fixedBgClass = 'absolute top-0 left-0 right-0 bottom-0'

const CanvasBG = () => {
  const [canvasDims, setCanvasDims] = useState({
    width: undefined,
    height: undefined,
  })
  const bgRef = useRef<HTMLDivElement>(null)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    if (bgRef.current) {
      const { width, height } = bgRef.current.getBoundingClientRect()
      setCanvasDims({ width, height })
    }
  }, [])

  useEffect(() => {
    if (bgRef.current) {
      window.addEventListener('resize', () => {
        if (bgRef.current) {
          const { width, height } = bgRef.current.getBoundingClientRect()
          setCanvasDims({
            width,
            height,
          })
        }
      })
    }
  }, [])

  const sun = (
    <div
      className={c(
        theme == 'light' ? 'visible' : 'invisible',
        'z-[0] absolute top-0 left-0 w-full h-full flex justify-center items-center'
      )}
    >
      <div className="sun aspect-square w-[70%] md:w-auto md:h-[30%]">
        <div className="ray"></div>
        <div className="ray"></div>
        <div className="ray"></div>
        <div className="ray"></div>
        <div className="ray"></div>
        <div className="ray"></div>
        <div className="ray"></div>
      </div>
    </div>
  )

  const starField = (
    <StarField
      className={c(
        fixedBgClass,
        theme == 'dark' ? 'visible' : 'invisible',
        'z-0'
      )}
      starRatio={169}
      starShape={'square'}
      starSize={1}
      width={canvasDims.width}
      height={canvasDims.height}
      speed={0.1}
      fps={60}
    />
  )

  return (
    <>
      <div ref={bgRef} className={c(fixedBgClass, '-z-[1] bg-black')}></div>
      {starField}
      {sun}
    </>
  )
}

const IndexPage: NextPage<StaticHomePage> = (props) => {
  return (
    <>
      <div className="relative flex flex-col w-full h-full justify-between items-start z-10">
        <Header />
        <InfoPanel />
      </div>
      <CanvasBG />
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

export default IndexPage
