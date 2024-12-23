import React, { useEffect, useRef, useState } from 'react'
import c from 'classnames'
import { StarField } from 'starfield-react'

const fixedBgClass = 'absolute top-0 left-0 right-0 bottom-0'

export const CanvasBG = () => {
  const [canvasDims, setCanvasDims] = useState({
    width: undefined,
    height: undefined,
  })
  const bgRef = useRef<HTMLDivElement>(null)

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
        'z-[0] absolute top-0 left-0 w-full h-full flex justify-center items-center dark:invisible visible'
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
      className={c(fixedBgClass, 'z-0 dark:visible invisible')}
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
