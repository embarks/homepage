import React, { useContext, useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import c from 'classnames'
import { StarField } from 'starfield-react'
import { ThemeContext } from '../contexts/theme'
import { StarIcon } from '../components/StarIcon'
import useMangle from '../functions/mangle'

type StaticHomePage = {
  title: string
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

const IndexPage: NextPage<StaticHomePage> = () => {
  const { theme } = useContext(ThemeContext)
  const about = useMangle('about')
  const work = useMangle('work')
  const contact = useMangle('contact')
  const textStyle = {
    dark: 'text-white',
    light: 'text-black',
  }
  return (
    <>
      <div className="relative w-full h-full z-10 flex justify-center items-center">
        <span className={textStyle[theme]}>
          <div className="flex uppercase justify-between text-xl fill-white">
            <h1>Emily Bartman</h1>
            <span className="fill-white flex items-center">
              <StarIcon />
            </span>
          </div>
          <div className="flex justify-between text-lg">
            <h2>UX Direction & Development</h2>
          </div>
          <div
            className={c(
              'flex justify-between font-sans uppercase mt-6',
              textStyle[theme]
            )}
          >
            <button
              className={c(
                'uppercase font-sans w-full block text-left hover:underline',
                textStyle[theme]
              )}
              onMouseEnter={about.triggerMangle}
              onTouchStart={about.triggerMangle}
            >{`${about.text}`}</button>

            <button
              className={c(
                'uppercase font-sans w-full block text-center hover:underline',
                textStyle[theme]
              )}
              onMouseEnter={work.triggerMangle}
              onTouchStart={work.triggerMangle}
            >{`${work.text}`}</button>

            <button
              className={c(
                'uppercase font-sans w-full block text-right hover:underline',
                textStyle[theme]
              )}
              onMouseEnter={contact.triggerMangle}
              onTouchStart={contact.triggerMangle}
            >{`${contact.text}`}</button>
          </div>
        </span>
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
