import { FunctionComponent, useEffect, useState, useRef } from 'react'

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
  size?: number
  isStatic?: boolean
  onStart?: () => void
  onChar?: (char: string) => void
  onEnd?: () => void
}

const Typewriter: FunctionComponent<TypewriterProps> = ({
  text,
  delay = 0,
  speed = 100,
  size = 25,
  isStatic,
  onChar,
  onStart,
  onEnd,
}) => {
  const [index, setIndex] = useState(0)

  function updateValueIndex() {
    if (index === 0) onStart?.()
    setIndex(index + 1)
    if (index === text.length) {
      onEnd?.()
      return
    }
    onChar?.(text.charAt(index))
  }

  useEffect(function start() {
    if (isStatic) return
    const timer = setTimeout(updateValueIndex, delay)
    return function cleanup() {
      clearTimeout(timer)
    }
  }, [])

  useEffect(
    function update() {
      if (isStatic || index === 0) return
      const timer = setTimeout(updateValueIndex, speed)
      return function cleanup() {
        clearTimeout(timer)
      }
    },
    [index]
  )

  const value = isStatic ? text : text.substring(0, index)

  return (
    <div
      style={{
        display: 'inline',
        fontSize: `${size}vw`,
        fontFamily: 'monospace',
        lineHeight: 1.3,
      }}
    >
      {value}
    </div>
  )
}

export default Typewriter
