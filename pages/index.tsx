import { NextPage } from 'next'
import Typewriter from '../components/Typewriter'
import BlinkingCursor from '../components/BlinkingCursor'
import { useEffect, useRef, useState } from 'react'

type Slide = {
  type: 'clear' | 'text'
  text?: string
  delay?: number
  size?: number
  speed?: number
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

  useEffect(function start() {
    const initialTimeout = setTimeout(() => {
      setTypewriterBlockIndex(0)
    }, props.slides[0].delay || 0)

    return function cleanup() {
      clearTimeout(initialTimeout)
    }
  }, [])

  function onTypeStart() {
    setIsTyping(true)
  }

  function onTypeEnd() {
    setIsTyping(false)
    const nextSlideIndex = typewriterBlockIndex + 1
    if (nextSlideIndex < props.slides.length) {
      setTimeout(() => {
        setTypewriterBlockIndex(nextSlideIndex)
      }, props.slides[nextSlideIndex].delay)
    }
  }

  useEffect(
    function clearTypewriter() {
      let timer: NodeJS.Timeout
      if (typewriterBlockIndex !== undefined && currentSlide.type === 'clear') {
        setClearIndex(typewriterBlockIndex)
        timer = setTimeout(() => {
          setTypewriterBlockIndex(typewriterBlockIndex + 1)
        }, currentSlide.delay || 0)
      }
      return function cleanup() {
        clearTimeout(timer)
      }
    },
    [typewriterBlockIndex]
  )

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
          onChar={(char) => setTypewriterValue((prev) => prev + char)}
          onStart={onTypeStart}
          onEnd={onTypeEnd}
          delay={currentSlide.delay}
          size={currentSlide.size}
          speed={currentSlide.speed ?? 45}
        />
      )}
      <Typewriter text="" isStatic size={4} />
      <BlinkingCursor size={4} type="block" isBlinking={!isTyping} />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      slides: [
        {
          text: 'loading jokes..............\n',
          delay: 0,
          size: 4,
        },
        {
          type: 'clear',
          delay: 1500,
        },
        {
          text: 'I went to a bookstore and asked the saleswoman, "Where\'s the self-help section?" She said if she told me, it would defeat the purpose.',
          delay: 0,
          size: 4,
        },
      ],
    },
  }
}

export default IndexPage
