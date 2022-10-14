// blinking cursor component
import React, { FunctionComponent } from 'react'

interface BlinkingCursorProps {
  type?: 'block' | 'underline' | 'bar'
  size?: number
  speed?: number
  isBlinking: boolean
}

const typeMap = {
  bar: '|',
  block: '█',
  underline: '_',
}

const BlinkingCursor: FunctionComponent<BlinkingCursorProps> = ({
  size = 25,
  isBlinking = false,
  type = 'block',
}) => {
  return (
    <span
      className={isBlinking ? 'blink' : ''}
      style={{
        fontSize: `${size}vw`,
        whiteSpace: 'pre',
        display: 'inline',
        lineHeight: 1.3,
        color: 'gold',
      }}
    >
      {typeMap[type]}
    </span>
  )
}

export default BlinkingCursor
