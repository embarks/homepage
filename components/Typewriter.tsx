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
  const [value, setValue] = useState<string>(isStatic ? text : '')
  const indexRef = useRef<number>(0)

  useEffect(
    function startTextType() {
      if (isStatic) {
        return
      }
      let timer: NodeJS.Timeout,
        initialDelay: NodeJS.Timeout = null

      function updateValueIndex() {
        if (indexRef.current === 0) onStart?.()
        const currentValue = `${value}${text.charAt(indexRef.current)}`
        setValue(currentValue)
        onChar?.(text.charAt(indexRef.current))
        indexRef.current += 1
      }

      // initial delay timeout
      const start = () => {
        initialDelay = setTimeout(updateValueIndex, delay)
      }

      if (indexRef.current === 0) {
        start()
      } else {
        clearTimeout(initialDelay)
        timer = setTimeout(updateValueIndex, speed)
      }

      if (indexRef.current === text.length) {
        clearTimeout(timer)
        onEnd?.()
      }

      // return a function to clear the timeout
      return function cleanup() {
        clearTimeout(timer)
        clearTimeout(initialDelay)
      }
    },
    [value]
  )

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
