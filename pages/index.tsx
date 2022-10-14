import { NextPage } from 'next'
import Typewriter from '../components/Typewriter'
import BlinkingCursor from '../components/BlinkingCursor'
import { useEffect, useRef, useState } from 'react'

type Slide = {
  type: 'clear' | 'text'
  text?: string
  delay?: number
  size?: number
}

type StaticHomePage = {
  title: string
  slides: Slide[]
}

const IndexPage: NextPage<StaticHomePage> = (props) => {
  const [typewriterBlockIndex, setTypewriterBlockIndex] = useState<
    number | undefined
  >()
  const [typewriterValue, setTypewriterValue] = useState<string>('')
  const [clearIndex, setClearIndex] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(false)
  const containerRef = useRef<HTMLDivElement>()
  const currentSlide = props.slides[typewriterBlockIndex]

  useEffect(
    function scrollToContent() {
      if (window.innerHeight < containerRef.current.scrollHeight) {
        window.scrollTo(0, containerRef.current.scrollHeight)
      }
    },
    [typewriterValue]
  )

  useEffect(
    function start() {
      const initialTimeout = setTimeout(() => {
        if (typewriterBlockIndex === undefined) {
          setTypewriterBlockIndex(0)
        }
      }, props.slides[0].delay || 0)

      return function cleanup() {
        clearTimeout(initialTimeout)
      }
    },

    []
  )

  useEffect(
    function clearTypewriter() {
      let timer: NodeJS.Timeout
      if (typewriterBlockIndex !== undefined) {
        if (currentSlide.type === 'clear') {
          setClearIndex(typewriterBlockIndex)
          timer = setTimeout(() => {
            setTypewriterBlockIndex(typewriterBlockIndex + 1)
          }, currentSlide.delay || 0)
        }
      }
      return function cleanup() {
        clearTimeout(timer)
      }
    },
    [typewriterBlockIndex]
  )

  function onStart() {
    setIsTyping(true)
  }

  function onEnd() {
    setIsTyping(false)
    const nextSlideIndex = typewriterBlockIndex + 1
    if (nextSlideIndex < props.slides.length) {
      setTimeout(() => {
        setTypewriterBlockIndex(typewriterBlockIndex + 1)
      }, props.slides[typewriterBlockIndex + 1].delay)
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        whiteSpace: 'pre-wrap',
      }}
    >
      {typewriterBlockIndex > 0 &&
        new Array(typewriterBlockIndex - clearIndex)
          .fill(null)
          .map((_, index) => {
            const { type, ...slideProps } = props.slides[clearIndex + index]

            if (type === 'clear') {
              return _
            }

            return (
              <Typewriter
                isStatic
                key={index}
                text={slideProps.text}
                delay={slideProps.delay}
                size={slideProps.size}
              />
            )
          })}
      {typewriterBlockIndex !== undefined && currentSlide.type !== 'clear' && (
        <Typewriter
          key={typewriterBlockIndex}
          text={currentSlide.text}
          onChar={(char) => setTypewriterValue(typewriterValue + char)}
          onStart={onStart}
          onEnd={onEnd}
          delay={currentSlide.delay}
          size={currentSlide.size}
          speed={75}
        />
      )}
      <Typewriter text="" isStatic size={8} />
      <BlinkingCursor size={8} type="block" isBlinking={!isTyping} />
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      slides: [
        {
          text: 'loading jokes..............\n',
          delay: 0,
          size: 8,
        },
        {
          type: 'clear',
          delay: 500,
        },
        {
          text: 'What do you call a cow with no legs?\n',
          delay: 0,
          size: 8,
        },
        {
          text: 'Ground beef.\n',
          delay: 2000,
          size: 8,
        },
      ],
    },
  }
}

export default IndexPage
